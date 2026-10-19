
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type DreamWish = {
  id: string;
  name: string;
  wish: string;
  created_at: string;
};

export function DreamGuestbook() {
  const [wishes, setWishes] = useState<DreamWish[]>([]);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function loadWishes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("dream_wishes")
      .select("id, name, wish, created_at")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      setMessage("Oops! We couldn't load the wishes. Please try again. 💜");
    } else {
      setWishes(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadWishes();

    const channel = supabase
      .channel("dream-wishes-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dream_wishes",
        },
        () => {
          void loadWishes();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim() || "A dreamer";
    const cleanWish = wish.trim();

    if (!cleanWish) {
      setMessage("Write a little dream first, dreamer! ✨");
      return;
    }

    setSending(true);
    setMessage("");

    const { error } = await supabase.from("dream_wishes").insert({
      name: cleanName,
      wish: cleanWish,
    });

    if (error) {
      setMessage("Your wish couldn't be sent. Please try again! 💗");
    } else {
      setName("");
      setWish("");
      setMessage("Your little wish is floating into the universe! 🌟");
      await loadWishes();
    }

    setSending(false);
  }

  return (
    <section className="dream-guestbook rounded-3xl p-5 sm:p-8">
      <div className="guestbook-heading text-center">
        <p className="font-hand text-xl font-bold">
          a little corner for everyone's wishes
        </p>

        <h2
          id="guestbook-title"
          className="mt-2 text-4xl font-extrabold"
        >
          <span aria-hidden="true">💌 </span>
          The Dream Guestbook
        </h2>

        <p className="mt-3 font-medium">
          Leave a wish for the universe. Lumi will keep it safe. ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl space-y-5">
        <label className="block">
          <span className="guestbook-label font-hand text-lg font-bold">
            Your name 🌷
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="What should Lumi call you?"
            maxLength={60}
            className="mt-2 w-full rounded-2xl border border-purple-200 bg-white/90 px-4 py-3 text-purple-950 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:border-purple-700 dark:bg-slate-900 dark:text-pink-100 dark:placeholder:text-purple-300"
          />
        </label>

        <label className="block">
          <span className="guestbook-label font-hand text-lg font-bold">
            Your little dream 🌙
          </span>
          <textarea
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            placeholder="Tell the universe your wish..."
            rows={4}
            maxLength={500}
            required
            className="mt-2 w-full resize-y rounded-2xl border border-purple-200 bg-white/90 px-4 py-3 text-purple-950 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:border-purple-700 dark:bg-slate-900 dark:text-pink-100 dark:placeholder:text-purple-300"
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-2xl bg-pink-400 px-5 py-3 font-extrabold text-purple-950 shadow-md transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending your wish... ✨" : "Send My Wish 💌"}
        </button>

        {message && (
          <p role="status" className="guestbook-description text-center font-semibold">
            {message}
          </p>
        )}
      </form>

      <div className="mx-auto mt-10 max-w-3xl">
        <h3 className="guestbook-heading font-hand text-center text-2xl font-bold">
          Dreams from around the world 🌙
        </h3>

        {loading ? (
          <p className="guestbook-description py-6 text-center">
            Gathering little dreams... ☁️
          </p>
        ) : wishes.length === 0 ? (
          <p className="guestbook-description py-6 text-center">
            It's quiet here! Be the first to leave a little dream. 💗
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {wishes.map((item) => (
              
<article
  key={item.id}
  className="rounded-2xl border border-pink-200 bg-pink-50/90 p-5 shadow-sm dark:border-purple-700 dark:bg-slate-900"
>
  <p className="whitespace-pre-wrap break-words text-purple-950 dark:text-white">
    “{item.wish}”
  </p>

  <p className="mt-4 font-hand font-bold text-purple-900 dark:text-pink-200">
    — {item.name}
  </p>

  <p className="mt-1 text-xs text-purple-700 dark:text-purple-200">
    
{new Date(item.created_at)
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}

  </p>
</article>

            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DreamGuestbook;

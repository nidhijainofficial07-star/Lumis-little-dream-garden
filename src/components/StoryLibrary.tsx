
import { useState } from "react";

type StoryPage = {
  art: string;
  scene: string;
  text: string;
  sound?: string;
  tapMessage: string;
};

type Story = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  theme: string;
  accent: string;
  pages: StoryPage[];
};

const stories: Story[] = [
  {
    id: "star",
    title: "Lumi and the Lost Star",
    subtitle: "A little star needs help finding home.",
    cover: "⭐",
    theme: "from-indigo-200 via-purple-200 to-pink-200",
    accent: "#8063a8",
    pages: [
      {
        art: "🌙",
        scene: "A magical night",
        text: "One night, Lumi saw a tiny star fall from the sky.",
        sound: "Whoooosh!",
        tapMessage: "Look! A little star! ✨",
      },
      {
        art: "🥺",
        scene: "A little cry",
        text: "The star went, 'Boo-hoo! I can't find my mama!'",
        sound: "Boo-hoo!",
        tapMessage: "Don't worry, little star! 💗",
      },
      {
        art: "☁️",
        scene: "Up into the clouds",
        text: "Lumi made a fluffy cloud boat. Up, up, up they went!",
        sound: "Wheeeee!",
        tapMessage: "Hop aboard our cloud boat! ☁️",
      },
      {
        art: "✨",
        scene: "Follow the sparkles",
        text: "They followed twinkly lights past the sleepy moon.",
        sound: "Twinkle, twinkle!",
        tapMessage: "Can you find the brightest sparkle?",
      },
      {
        art: "🌟",
        scene: "Found at last!",
        text: "There was Mama Star! She hugged her baby tight.",
        sound: "Mwaaah!",
        tapMessage: "A big star hug! 🤗",
      },
      {
        art: "💖",
        scene: "Sweet dreams",
        text: "The star was home. Lumi smiled. 'Goodnight, little star!'",
        sound: "Shhh... zzz...",
        tapMessage: "Goodnight, little dreamer! 💗",
      },
    ],
  },
  {
    id: "garden",
    title: "The Rainbow Garden Rescue",
    subtitle: "Can friends bring back the colours?",
    cover: "🌷",
    theme: "from-pink-200 via-purple-200 to-emerald-100",
    accent: "#bd6995",
    pages: [
      {
        art: "🌷",
        scene: "A sleepy garden",
        text: "Lumi woke up. Oh! The flowers had lost their colours!",
        sound: "Oh no!",
        tapMessage: "Where did the colours go?",
      },
      {
        art: "🐰",
        scene: "A bunny friend",
        text: "Bunny came hopping. 'Let's help the flowers!'",
        sound: "Hop, hop!",
        tapMessage: "Hello, Bunny! 🐰",
      },
      {
        art: "🐢",
        scene: "Slow and steady",
        text: "Tiny Turtle brought a little watering can.",
        sound: "Drip, drop!",
        tapMessage: "Thank you, Tiny Turtle! 💧",
      },
      {
        art: "🦋",
        scene: "A fluttery surprise",
        text: "Butterfly flapped her wings. Sprinkle, sprinkle, magic dust!",
        sound: "Flap, flap!",
        tapMessage: "Fly, little butterfly! 🦋",
      },
      {
        art: "🌈",
        scene: "Colours everywhere",
        text: "Pop! Pink, yellow, blue! The garden was colourful again!",
        sound: "Pop! Pop! Pop!",
        tapMessage: "Which colour do you love?",
      },
      {
        art: "🌼",
        scene: "Friends together",
        text: "They danced with the flowers. 'We did it together!'",
        sound: "Yaaay!",
        tapMessage: "Let's do a happy dance! 💃",
      },
    ],
  },
  {
    id: "dragon",
    title: "Lumi and the Little Dragon",
    subtitle: "A tiny dragon learns to fly.",
    cover: "🐉",
    theme: "from-orange-200 via-rose-200 to-violet-200",
    accent: "#bd765b",
    pages: [
      {
        art: "🐉",
        scene: "A tiny new friend",
        text: "Lumi met a little dragon named Pip. Pip wanted to fly.",
        sound: "Roar... softly!",
        tapMessage: "Hello, little Pip! 🐉",
      },
      {
        art: "🥺",
        scene: "A little worry",
        text: "Pip flapped his wings. 'What if I fall?'",
        sound: "Flap, flap...",
        tapMessage: "You can do it, Pip!",
      },
      {
        art: "🤝",
        scene: "Lumi has a plan",
        text: "Lumi held Pip's paw. 'Let's try a tiny hop first!'",
        sound: "Hop!",
        tapMessage: "Ready, set, hop!",
      },
      {
        art: "🪽",
        scene: "Wings in the air",
        text: "Pip jumped and flapped. He floated for one little second!",
        sound: "Whoooosh!",
        tapMessage: "Look at those wings!",
      },
      {
        art: "☁️",
        scene: "Flying together",
        text: "Up went Pip! He flew beside Lumi over the clouds.",
        sound: "Wheeeee!",
        tapMessage: "We're flying! ☁️",
      },
      {
        art: "🌟",
        scene: "A brave little dragon",
        text: "Pip landed with a giggle. 'I was brave!' Lumi gave him a hug.",
        sound: "Hooray!",
        tapMessage: "Being brave can start with one tiny try.",
      },
    ],
  },
  {
    id: "moon",
    title: "The Moon's Missing Pillow",
    subtitle: "A cosy little bedtime adventure.",
    cover: "🌙",
    theme: "from-blue-200 via-indigo-200 to-pink-200",
    accent: "#7189bf",
    pages: [
      {
        art: "🥱",
        scene: "Sleepy Moon",
        text: "The moon gave a big yawn. 'Where is my pillow?'",
        sound: "Yaaaaawn!",
        tapMessage: "Someone needs a nap!",
      },
      {
        art: "🐰",
        scene: "Ask the bunny",
        text: "Lumi asked Bunny. Bunny looked under his blanket.",
        sound: "Rustle, rustle!",
        tapMessage: "Is it there, Bunny?",
      },
      {
        art: "🧸",
        scene: "A teddy surprise",
        text: "They found a teddy bear! But no fluffy pillow.",
        sound: "Peek-a-boo!",
        tapMessage: "Hello, Teddy! 🧸",
      },
      {
        art: "☁️",
        scene: "A fluffy clue",
        text: "A little cloud drifted by. Something soft sat on top!",
        sound: "Float, float!",
        tapMessage: "What's on the cloud?",
      },
      {
        art: "🛏️",
        scene: "Pillow found!",
        text: "There it was! Moon's pillow had gone for a cloud ride.",
        sound: "Hooray!",
        tapMessage: "Come back, fluffy pillow!",
      },
      {
        art: "💤",
        scene: "Night-night",
        text: "Moon snuggled in. Lumi whispered, 'Sweet dreams, everyone.'",
        sound: "Zzzzz...",
        tapMessage: "Close your eyes, little dreamer. 🌙",
      },
    ],
  },
  {
    id: "woods",
    title: "The Secret of Twinkle Woods",
    subtitle: "A gentle mystery among the trees.",
    cover: "🍄",
    theme: "from-emerald-200 via-teal-100 to-purple-200",
    accent: "#579b91",
    pages: [
      {
        art: "🌳",
        scene: "Into the woods",
        text: "Lumi saw a tiny light blink inside Twinkle Woods.",
        sound: "Blink, blink!",
        tapMessage: "What could that light be?",
      },
      {
        art: "🐢",
        scene: "A slow explorer",
        text: "Turtle came along. 'Let's look together!'",
        sound: "Tap, tap!",
        tapMessage: "Come on, little explorer!",
      },
      {
        art: "🍄",
        scene: "Mushroom path",
        text: "They walked past soft mushrooms and sleepy flowers.",
        sound: "Tiptoe, tiptoe!",
        tapMessage: "Shhh... the flowers are sleeping.",
      },
      {
        art: "✨",
        scene: "A glowing surprise",
        text: "The little light blinked again. It was a firefly!",
        sound: "Blinkity-blink!",
        tapMessage: "Hello, little firefly!",
      },
      {
        art: "🐝",
        scene: "Lost little lights",
        text: "Many fireflies were lost. Lumi showed them the way home.",
        sound: "Buzz, buzz!",
        tapMessage: "Let's help the little lights!",
      },
      {
        art: "🌟",
        scene: "A forest full of stars",
        text: "The fireflies lit up the trees. Twinkle Woods was magical!",
        sound: "Ooooooh!",
        tapMessage: "Look at all those lights! ✨",
      },
    ],
  },
  {
    id: "boat",
    title: "The Little Cloud Boat",
    subtitle: "A floating adventure before bedtime.",
    cover: "⛵",
    theme: "from-sky-200 via-violet-200 to-rose-200",
    accent: "#7b80bd",
    pages: [
      {
        art: "☁️",
        scene: "A cloud idea",
        text: "Lumi found a tiny cloud. 'Let's make a boat!'",
        sound: "Plop!",
        tapMessage: "A boat made of clouds!",
      },
      {
        art: "🐰",
        scene: "All aboard",
        text: "Bunny hopped inside with a little dream lantern.",
        sound: "Hop aboard!",
        tapMessage: "Welcome aboard, Bunny!",
      },
      {
        art: "🌊",
        scene: "Across the sky",
        text: "The cloud boat floated over a sea of soft clouds.",
        sound: "Swoooosh!",
        tapMessage: "Can you hear the clouds?",
      },
      {
        art: "🏡",
        scene: "Little homes below",
        text: "They saw tiny houses. Every window glowed warm and bright.",
        sound: "Twinkle, twinkle!",
        tapMessage: "Everyone is getting cosy.",
      },
      {
        art: "🏮",
        scene: "Dream deliveries",
        text: "Lumi left a dream lantern by each sleepy little home.",
        sound: "Glow, glow!",
        tapMessage: "A little dream for you! 💗",
      },
      {
        art: "🌙",
        scene: "Back home",
        text: "Lumi and Bunny sailed home. The stars said, 'Goodnight!'",
        sound: "Goodnight...",
        tapMessage: "Sweet dreams, little sailor! 🌙",
      },
    ],
  },
];

export function StoryLibrary() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [reaction, setReaction] = useState<string | null>(null);
  const [tapCount, setTapCount] = useState(0);

  const selected = stories.find((story) => story.id === selectedId);
  const currentPage = selected?.pages[page];

  if (selected && !currentPage) {
    return null;
  }

  function openStory(id: string) {
    setSelectedId(id);
    setPage(0);
    setReaction(null);
    setTapCount(0);
  }

  function closeStory() {
    setSelectedId(null);
    setPage(0);
    setReaction(null);
    setTapCount(0);
  }

  function nextPage() {
    if (!selected) return;

    if (page < selected.pages.length - 1) {
      setPage((current) => current + 1);
      setReaction(null);
      setTapCount(0);
    } else {
      closeStory();
    }
  }

  function previousPage() {
    setPage((current) => Math.max(0, current - 1));
    setReaction(null);
    setTapCount(0);
  }

  function tapCharacter() {
    if (!currentPage) return;

    setReaction(currentPage.tapMessage);
    setTapCount((count) => count + 1);
  }

  return (
    <section
      id="storybook"
      className="relative isolate overflow-hidden bg-background px-4 py-20 sm:px-8 sm:py-28"
    >
      {/* Dreamy floating background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 animate-pulse rounded-full bg-purple-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 animate-pulse rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <header className="text-center">
          <div className="mb-5 inline-flex animate-bounce items-center gap-2 rounded-full border border-white/70 bg-card px-5 py-2 text-sm font-bold text-card-foreground shadow-sm dark:border-slate-600">
            ✨ A LITTLE MAGIC FOR LITTLE DREAMERS ✨
          </div>

          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Lumi's Storybook
            <span className="ml-2 inline-block animate-bounce">📚</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Snuggle up, little one. Which magical adventure shall we read
            today? 💗
          </p>
        </header>

        {/* Story library */}
        {!selected && (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <button
                key={story.id}
                type="button"
                onClick={() => openStory(story.id)}
                className="group overflow-hidden rounded-[2rem] border-4 border-border bg-card text-left shadow-[0_12px_35px_rgba(100,75,130,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(100,75,130,0.2)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
              >
                <div
                  className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${story.theme} dark:from-slate-800 dark:via-indigo-950 dark:to-purple-950`}
                >
                  <span className="absolute left-6 top-6 animate-pulse text-3xl">
                    ✨
                  </span>
                  <span className="absolute right-7 top-9 animate-pulse text-2xl">
                    ⭐
                  </span>
                  <span className="absolute bottom-7 left-8 animate-bounce text-3xl [animation-duration:3s]">
                    ☁️
                  </span>
                  <span className="absolute bottom-8 right-8 animate-pulse text-2xl">
                    ✦
                  </span>

                  <span className="absolute inset-0 bg-white/10 dark:bg-slate-950/10" />

                  <span
                    className="relative text-8xl drop-shadow-lg transition duration-500 group-hover:scale-125 group-hover:rotate-6"
                    role="img"
                    aria-label={story.title}
                  >
                    {story.cover}
                  </span>

                  <span className="absolute bottom-3 rounded-full border border-white/70 bg-card px-4 py-1.5 text-xs font-bold text-card-foreground shadow-sm">
                    STORY {index + 1} · 6 PAGES
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
                    {story.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-base leading-relaxed text-muted-foreground">
                    {story.subtitle}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      ☁️ A little adventure
                    </span>

                    <span className="rounded-full bg-purple-100 px-4 py-3 font-bold text-purple-900 transition group-hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:group-hover:bg-purple-800">
                      Read me! →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Open book */}
        {selected && currentPage && (
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeStory}
                className="rounded-full border border-border bg-card px-5 py-3 font-bold text-card-foreground shadow-sm transition hover:bg-accent"
              >
                ← All stories
              </button>

              <span className="rounded-full border border-white/70 bg-card px-4 py-2 text-sm font-bold text-card-foreground dark:border-slate-600">
                📖 Story time!
              </span>
            </div>

            <div
              key={`${selected.id}-${page}`}
              className={`overflow-hidden rounded-[2.5rem] border-[6px] border-white/70 bg-gradient-to-br ${selected.theme} shadow-[0_25px_70px_rgba(100,75,130,0.18)] dark:border-slate-600 dark:from-slate-800 dark:via-indigo-950 dark:to-purple-950`}
            >
              {/* Book header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/70 bg-white/35 px-5 py-4 dark:border-slate-600 dark:bg-slate-900/40 sm:px-8">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
  {selected.title}
</p>

                <span className="whitespace-nowrap rounded-full bg-card px-3 py-1 text-sm font-bold text-card-foreground">
                  {page + 1} / {selected.pages.length}
                </span>
              </div>

              {/* Story scene */}
              <div className="px-5 py-8 text-center sm:px-12 sm:py-12">
                <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-700 dark:text-purple-200 sm:text-sm">
                  {currentPage.scene}
                </p>

                {/* Tap the character to make it react */}
                <button
                  type="button"
                  onClick={tapCharacter}
                  aria-label={`Tap the character. ${currentPage.tapMessage}`}
                  className="group relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center overflow-hidden rounded-[2.5rem] border-4 border-white/80 bg-white/40 shadow-inner focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-purple-400 dark:border-slate-500 dark:bg-slate-900/50 sm:max-w-[390px]"
                >
                  <span className="absolute left-7 top-8 animate-pulse text-3xl">
                    ✨
                  </span>
                  <span className="absolute right-8 top-12 animate-pulse text-2xl [animation-delay:500ms]">
                    ✦
                  </span>
                  <span className="absolute bottom-8 left-9 animate-bounce text-3xl [animation-duration:3s]">
                    ☁️
                  </span>
                  <span className="absolute bottom-10 right-8 animate-pulse text-2xl">
                    ✨
                  </span>

                  <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-purple-900 shadow-sm dark:bg-slate-900 dark:text-purple-100">
                    TAP FOR MAGIC!
                  </span>

                  <span
                    className={`relative text-[8rem] drop-shadow-xl transition duration-300 sm:text-[10rem] ${
                      tapCount > 0
                        ? "scale-125 rotate-6"
                        : "animate-bounce [animation-duration:3s]"
                    }`}
                    role="img"
                    aria-label={currentPage.scene}
                  >
                    {currentPage.art}
                  </span>

                  {reaction && (
                    <span
                      key={tapCount}
                      className="absolute bottom-5 left-1/2 w-[85%] -translate-x-1/2 animate-bounce rounded-2xl border border-border bg-card/95 px-4 py-3 text-sm font-extrabold text-card-foreground shadow-lg sm:text-base"
                      aria-live="polite"
                    >
                      {reaction}
                    </span>
                  )}
                </button>

                {/* Story text */}
                <p
                  key={`${selected.id}-text-${page}`}
                  className="mx-auto mt-8 max-w-xl animate-[fadeIn_500ms_ease-out] font-hand text-2xl font-bold leading-relaxed text-slate-900 dark:text-white sm:text-4xl"
                  aria-live="polite"
                >
                  {currentPage.text}
                </p>

                {currentPage.sound && (
                  <div className="mt-4 inline-flex animate-pulse rounded-full border border-border bg-card/60 px-5 py-2 font-bold text-card-foreground">
                    {currentPage.sound}
                  </div>
                )}

                <p className="mt-4 text-sm font-medium text-slate-700 dark:text-purple-200">
  {page === selected.pages.length - 1
    ? "The end... with a little hug! 💗"
    : "Turn the page to see what happens next..."}
</p>
              </div>

              {/* Page progress */}
              <div className="border-t border-white/70 bg-white/30 px-4 py-5 dark:border-slate-600 dark:bg-slate-900/40 sm:px-8">
                <div className="mb-5 flex justify-center gap-2">
                  {selected.pages.map((storyPage, index) => (
                    <button
                      key={`${selected.id}-page-${index}`}
                      type="button"
                      onClick={() => {
                        setPage(index);
                        setReaction(null);
                        setTapCount(0);
                      }}
                      aria-label={`Go to page ${index + 1}: ${storyPage.scene}`}
                      aria-current={page === index ? "step" : undefined}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        page === index
                          ? "w-8"
                          : "w-3 bg-white hover:bg-purple-200 dark:bg-slate-600 dark:hover:bg-slate-500"
                      }`}
                      style={
                        page === index
                          ? { backgroundColor: selected.accent }
                          : undefined
                      }
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={previousPage}
                    disabled={page === 0}
                    className="min-h-14 rounded-2xl border-2 border-border bg-card/90 px-4 py-3 text-base font-extrabold text-card-foreground shadow-sm transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:text-lg"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={nextPage}
                    className="min-h-14 flex-1 rounded-2xl px-4 py-3 text-lg font-extrabold text-white shadow-[0_5px_0_#574073] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:flex-none sm:px-8"
                    style={{ backgroundColor: selected.accent }}
                  >
                    {page === selected.pages.length - 1
                      ? "Read another! 💗"
                      : "Next page! →"}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center font-hand text-xl text-muted-foreground">
              Made of clouds, cuddles, and a little bit of magic ☁️
            </p>
          </div>
        )}
      </div>

      {/* Small animation used by story text */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useState } from "react";
import { sounds } from "@/lib/sound";
import { lumiQuestions } from "@/data/lumiQuestions";

const fallbackReplies = [
  "Ooooh, that's a curious question! 💗 Let's explore it together!",
  "My little cloud brain needs a tiny bit of help with that one! ☁️ Ask a trusted grown-up and let's learn something new!",
  "That's a big question for a little dreamer! ✨ Can you tell me a little more about what you mean?",
];

type Message = {
  id: number;
  from: "you" | "lumi";
  text: string;
};

type Expression = "happy" | "curious" | "sleepy" | "love" | "sad";


type WikipediaResult = {
  title: string;
  description?: string;
  excerpt?: string;
};



async function researchWithWikipedia(
  question: string
): Promise<string | null> {
  try {
    // Convert the question into a searchable topic.
    const searchQuery = question
      .replace(
        /^(what is|what are|who is|who was|who invented|who discovered|why do we|why do|why does|why is|why are|how do we|how do|how does|how is|how are|tell me about|explain|can you explain)\s+/i,
        ""
      )
      .replace(/[?!.,]/g, "")
      .replace(/^(the|a|an)\s+/i, "")
      .trim();

    const response = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(
        searchQuery
      )}&limit=5`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const results: WikipediaResult[] = data.pages ?? [];

    if (results.length === 0) return null;

    // Use the first result for the cleaned-up topic.
    const keywords = searchQuery
  .toLowerCase()
  .split(/\s+/)
  .filter((word) => word.length > 2);


const result = results.find((page) => {
  const title = page.title.toLowerCase();
  const description = (page.description ?? "").toLowerCase();

  // Prefer results matching the important topic words.
  const titleMatches = keywords.filter((word) =>
    title.includes(word)
  ).length;

  const descriptionMatches = keywords.filter((word) =>
    description.includes(word)
  ).length;

  return (
    titleMatches >= Math.min(2, keywords.length) ||
    (keywords.length === 1 && descriptionMatches >= 1)
  );
});

if (!result) return null;
    const summaryResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        result.title.replace(/ /g, "_")
      )}`
    );

    if (!summaryResponse.ok) return null;

    const summary = await summaryResponse.json();

    if (
      summary.type === "disambiguation" ||
      !summary.extract
    ) {
      return null;
    }

    const answer = String(summary.extract)
      .replace(/\s+/g, " ")
      .trim();

    
const sentences =
  answer.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];

const shortAnswer = sentences
  .slice(0, 2)
  .join(" ")
  .trim();

const childFriendlyAnswer =
  shortAnswer.length > 350
    ? shortAnswer.slice(0, 347).trimEnd() + "..."
    : shortAnswer;


    const articleUrl =
      summary.content_urls?.desktop?.page ??
      `https://en.wikipedia.org/wiki/${encodeURIComponent(
        result.title.replace(/ /g, "_")
      )}`;

    return `${childFriendlyAnswer} ✨\n\n📚 Learn more: ${articleUrl}`;
  } catch (error) {
    console.error("Wikipedia research failed:", error);
    return null;
  }
}

function getReply(text: string): string {
  const question = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // First, check the existing question-and-answer library.
  const exactMatch = lumiQuestions.find((item) =>
    item.questions.some(
      (phrase) =>
        phrase.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim() === question
    )
  );

  if (exactMatch) return exactMatch.answer;

  const phraseMatch = lumiQuestions.find((item) =>
    item.questions.some((phrase) => {
      const normalized = phrase
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return normalized.length >= 4 && ` ${question} `.includes(` ${normalized} `);
    })
  );

  if (phraseMatch) return phraseMatch.answer;

  // Greetings
  if (/^(hi|hii+|hello|hey|heyy+|hlo|namaste|good morning|good evening)\b/.test(question)) {
    return "Hiiii, little dreamer! 💗☁️ I'm Lumi, your tiny cloud princess! What magical thing shall we talk about today?";
  }
if (/largest planet|biggest planet/i.test(question)) {
  return "Jupiter is the largest planet in our Solar System! 🪐 It's a giant planet with beautiful bands of clouds. 💜";
}
  if (/\b(who are you|your name|what are you)\b/.test(question)) {
    return "I'm Lumi! 👑💗 Your fluffy little cloud princess. I love stories, stars, curious questions, and chatting with you!";
  }

  // Feelings
  if (/\b(sad|upset|lonely|unhappy|crying|bad day|feeling down)\b/.test(question)) {
    return "Awww, little dreamer. 💗 It's okay to feel sad sometimes. Would you like to tell me what happened? You can also talk to someone you trust. ☁️";
  }

  if (/\b(angry|mad|frustrated|annoyed)\b/.test(question)) {
    return "Ooooh, big feelings! 💗 Let's take one slow breath together. In... and out... When you're ready, you can tell me what made you feel this way.";
  }

  if (/\b(scared|afraid|frightened|nightmare|fear)\b/.test(question)) {
    return "It's okay to feel scared sometimes, little dreamer. 🌙 Take a slow breath and find someone you trust who can help you feel safe. 💗";
  }

  if (/\b(happy|excited|awesome|wonderful|good day|great day)\b/.test(question)) {
    return "YAYYYY! ✨💖 My little cloud heart is sparkling! What made you so happy? Tell me everything!";
  }

  if (/\b(bored|nothing to do|boring)\b/.test(question)) {
    return "Hehehe! Time for a tiny adventure! 🌈 We could invent a silly story, imagine a magical castle, play a guessing game, or draw a funny cloud! Which sounds fun?";
  }

  // Friendly conversation
  if (/\b(thank you|thanks|thx)\b/.test(question)) {
    return "You're soooo welcome! 💗✨ Sending you one tiny cloud hug and a pocketful of sparkles!";
  }

  if (/\b(love you|i love lumi|you are cute|youre cute)\b/.test(question)) {
    return "Awwww! 🥹💗 You're spreading sparkles everywhere! I'm happy we get to have this little chat together!";
  }

  if (/\b(joke|make me laugh|tell me something funny|funny)\b/.test(question)) {
    return "Hehehe! 😂 Why did the teddy bear skip dessert? Because it was already stuffed! 🧸🍰";
  }

  if (/\b(story|bedtime story|fairy tale)\b/.test(question)) {
    return "Once upon a twinkly night, a tiny star fell into a princess's teacup! ✨ She whispered a wish, and suddenly the whole garden began to glow. What should happen next, little dreamer? 🌙";
  }

  if (/\b(dream|dreams|wish|wishes)\b/.test(question)) {
    return "Dreams are full of possibilities! ☁️✨ Some happen while we sleep, and others are hopes we carry in our hearts. What's one little dream you'd love to explore?";
  }

  // Everyday learning
  if (/\b(why do we sleep|why sleep|need sleep)\b/.test(question)) {
    return "Sleep helps your brain and body rest, grow, and get ready for a brand-new day! 🌙💤 That's why bedtime is important, little dreamer!";
  }

  if (/\b(why is the sky blue|sky blue)\b/.test(question)) {
    return "Sunlight has lots of colours mixed together! 💙 Air scatters blue light more than many other colours, so our sky usually looks blue during the day. Isn't that magical?";
  }

  if (/\b(why do stars shine|stars shine|stars twinkle)\b/.test(question)) {
    return "Stars make their own light, just like our Sun! ⭐ They look like tiny sparkles because they're so far away. Our atmosphere makes their light seem to twinkle!";
  }

  if (/\b(why does it rain|how does rain happen|where does rain come from)\b/.test(question)) {
    return "The Sun warms water, which turns into invisible water vapour. ☁️ It cools and forms clouds, and when water droplets get heavy enough, they fall as rain! 🌧️";
  }

  if (/\b(what is a rainbow|how are rainbows made|rainbow)\b/.test(question)) {
    return "Rainbows appear when sunlight passes through tiny water droplets and separates into different colours! 🌈 That's how the sky paints its colourful smile!";
  }

  if (/\b(why is the moon out|what is the moon|moon)\b/.test(question)) {
    return "The Moon is Earth's natural space buddy! 🌙 It doesn't make its own light; it reflects sunlight. Sometimes we see a full circle, and sometimes just a little crescent!";
  }

  if (/\b(what is a dinosaur|dinosaurs)\b/.test(question)) {
    return "Dinosaurs were amazing animals that lived long, long ago! 🦕 Some were enormous, and some were surprisingly small. Birds today are descended from one group of dinosaurs!";
  }

  if (/\b(what is space|outer space|universe)\b/.test(question)) {
    return "Space is the enormous place beyond Earth, filled with stars, planets, moons, and galaxies! 🚀✨ There's so much to discover out there!";
  }

  if (/\b(what is ai|artificial intelligence)\b/.test(question)) {
    return "Artificial intelligence, or AI, is technology that helps computers do things like recognise pictures, understand words, and answer questions! 🤖 A grown-up can help you explore how it works.";
  }

  // Safe response for difficult or personal topics
  if (/\b(secret|unsafe|someone hurt me|someone touched me|being bullied|bullying)\b/.test(question)) {
    return "I'm glad you told me, little dreamer. 💗 If someone is hurting, frightening, or making you uncomfortable, please tell a trusted grown-up who can help keep you safe. You deserve kindness and safety.";
  }
if (/who invented the telephone|inventor of the telephone/.test(question)) {
  return "Alexander Graham Bell is widely credited with inventing the telephone! ☎️ It helped people talk to each other over long distances. ✨";
}
if (/why do we have seasons|what causes seasons|why are there seasons/.test(question)) {
  return "Earth has seasons because it is tilted as it travels around the Sun! 🌍 Different parts of Earth receive different amounts of sunlight during the year. ☀️💗";
}
if (/who invented the light bulb|inventor of the light bulb/.test(question)) {
  return "Thomas Edison is famous for developing a practical, long-lasting light bulb! 💡 Earlier inventors also helped make electric lighting possible. ✨";
}

  // Unknown questions: ask for clarification instead of pretending to know.
  if (/\b(what|why|how|who|where|when|which|can|does|is|are|do)\b/.test(question)) {
    return "Ooooh, a curious question! ✨ I don't know the answer to that one yet, and I don't want to guess. Can you tell me a little more? We can explore it with a trusted grown-up! 💗";
  }

  return fallbackReplies[
    Math.floor(Math.random() * fallbackReplies.length)
  ]!;
}

function speakLumi(
  text: string,
  selectedVoice: SpeechSynthesisVoice | null,
  onSpeakingChange: (speaking: boolean) => void,
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  onSpeakingChange(false);

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  const voice =
    selectedVoice ??
    voices.find(
      (v) =>
        /female|samantha|aria|jenny|zira|siri/i.test(v.name) &&
        /^en/i.test(v.lang),
    ) ??
    voices.find((v) => /^en-IN/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang));

  if (voice) utterance.voice = voice;

  utterance.lang = voice?.lang ?? "en-IN";
  utterance.rate = 0.88;
  utterance.pitch = 1.7;
  utterance.volume = 1;

  utterance.onstart = () => onSpeakingChange(true);
  utterance.onend = () => onSpeakingChange(false);
  utterance.onerror = () => onSpeakingChange(false);

  window.speechSynthesis.speak(utterance);
}

export function LumiChat() {
    const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "lumi",
      text: "Psst... hiiii, little dreamer! 💗 I'm Lumi, your tiny cloud princess! Come sit with me. Tell me what's on your little mind! ☁️✨",
    },
  ]);

  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [expression, setExpression] = useState<Expression>("happy");
  const [isTouched, setIsTouched] = useState(false);

  const selectedVoice =
    availableVoices.find((voice) => voice.name === selectedVoiceName) ?? null;

  const lastLumiMessage = [...messages]
    .reverse()
    .find((message) => message.from === "lumi");

  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.from === "you");

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis
        .getVoices()
        .filter((voice) => /^(en|hi)/i.test(voice.lang));

      setAvailableVoices(voices);

      setSelectedVoiceName((current) => {
        if (current && voices.some((voice) => voice.name === current)) {
          return current;
        }

        return (
          voices.find((voice) => /^en-IN/i.test(voice.lang)) ??
          voices.find((voice) => /^hi-IN/i.test(voice.lang)) ??
          voices.find((voice) => /^en/i.test(voice.lang)) ??
          voices[0]
        )?.name ?? "";
      });
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (isSpeaking) return;

    const timeout = window.setTimeout(() => {
      setExpression((current) => (current === "sad" ? "love" : current));
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [isSpeaking]);

  
async function sendMessage(text = input) {
  const clean = text.trim();
  if (!clean) return;

  const nextId = Date.now();

  // Show the user's message immediately.
  setMessages((current) => [
    ...current,
    { id: nextId, from: "you", text: clean },
  ]);

  setInput("");
  sounds.tap();

  // Preserve existing replies first.
  const reply = getReply(clean);

  // Detect whether getReply returned one of its generic fallbacks.
  const isFallback =
  fallbackReplies.includes(reply) ||
  reply.includes("I don't know the answer to that one yet") ||
  reply.includes("Can you tell me a little more?");

  let finalReply = reply;

if (isFallback) {
  setIsThinking(true);

  try {
    const researchReply = await researchWithWikipedia(clean);

    if (researchReply) {
      finalReply = researchReply;
    }
  } catch (error) {
    console.error("Lumi research error:", error);
  } finally {
    setIsThinking(false);
  }
}

  // Add Lumi's final answer after research completes.
  setMessages((current) => [
    ...current,
    { id: nextId + 1, from: "lumi", text: finalReply },
  ]);
  

  const combinedText = `${clean} ${finalReply}`.toLowerCase();

  if (/sad|upset|cry|bad day|unhappy|sorry|hurt/.test(combinedText)) {
    setExpression("sad");
  } else if (/love|hug|heart|kiss|cute|tickle/.test(combinedText)) {
    setExpression("love");
  } else if (/[?]|why|how|what|who|where|wonder/.test(combinedText)) {
    setExpression("curious");
  } else {
    setExpression("happy");
  }

  speakLumi(finalReply, selectedVoice, setIsSpeaking);
}


  function touchLumi(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    let reaction = "Hehehe! That tickles! 💗 Hi, little dreamer!";
    let nextExpression: Expression = "love";

    if (y < 0.3) {
      reaction = "Ooooh! You touched my royal crown! 👑✨";
      nextExpression = "happy";
    } else if (y > 0.65) {
      reaction = "Boop boop! My fluffy tummy is ticklish! ☁️💕";
      nextExpression = "happy";
    } else if (x < 0.38 || x > 0.62) {
      reaction = "Eeeee! My fluffy cheeks! Hehehe! 💗";
      nextExpression = "love";
    }

    setIsTouched(true);
    setExpression(nextExpression);
    sounds.tap();

    speakLumi(reaction, selectedVoice, setIsSpeaking);

    window.setTimeout(() => setIsTouched(false), 900);
  }

  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <section
      id="talk-to-lumi"
      className="scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6"
    >
      <style>{`
        @keyframes lumi-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes lumi-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-23px) scale(1.04); }
          55% { transform: translateY(0) scale(.97); }
          75% { transform: translateY(-7px) scale(1.02); }
        }

        @keyframes lumi-blink {
          0%, 35%, 39%, 72%, 76%, 100% { transform: scaleY(1); }
          37%, 74% { transform: scaleY(0.08); }
        }

        @keyframes lumi-talk {
          from { transform: scaleY(.65) scaleX(.85); }
          to { transform: scaleY(1.25) scaleX(1.08); }
        }

        @keyframes lumi-sparkle {
          0%, 100% { opacity: .45; transform: scale(.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(15deg); }
        }

        @keyframes lumi-heart {
          0% { transform: scale(.6); opacity: 0; }
          45% { transform: scale(1.2); opacity: 1; }
          100% { transform: translateY(-32px) scale(.9); opacity: 0; }
        }

        .lumi-float { animation: lumi-float 3s ease-in-out infinite; }
        .lumi-bounce { animation: lumi-bounce .8s ease-in-out; }

        .lumi-eye {
          transform-origin: center;
          animation: lumi-blink 4.5s infinite;
        }

        .lumi-eye:nth-child(2) { animation-delay: 0.08s; }

        .lumi-character { transform-origin: center bottom; }

        .lumi-mouth-talking {
          transform-origin: center;
          animation: lumi-talk .18s ease-in-out infinite alternate;
        }

        .lumi-sparkle { animation: lumi-sparkle 2s ease-in-out infinite; }
        .lumi-heart { animation: lumi-heart 1s ease-out forwards; }

        @media (prefers-reduced-motion: reduce) {
          .lumi-float, .lumi-bounce, .lumi-eye,
          .lumi-mouth-talking, .lumi-sparkle {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>

      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[.22em] text-[#76508f] dark:text-purple-300">
            ✨ A little magic lives here ✨
          </p>

          <h2 className="font-hand text-4xl text-[#684b82] dark:text-purple-200 sm:text-5xl">
            Meet Lumi, your cloud princess!
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-[#887398] dark:text-slate-300">
            She loves little chats, magical questions, and the occasional
            tickle. Go on, say hello! 💗
          </p>
        </div>

        {/* Main chat panel */}
        <div className="overflow-hidden rounded-[2rem] border-2 border-white/80 bg-gradient-to-b from-[#fff5fc] via-[#f8f1ff] to-[#eeeaff] shadow-[0_20px_70px_rgba(157,120,191,0.18)] dark:border-slate-700 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950">
          <div className="relative overflow-hidden px-4 pb-8 pt-7 sm:px-8">
            <div className="pointer-events-none absolute left-5 top-10 text-2xl lumi-sparkle">
              ✨
            </div>
            <div className="pointer-events-none absolute right-7 top-16 text-xl lumi-sparkle">
              ⭐
            </div>
            <div className="pointer-events-none absolute bottom-16 left-8 text-xl lumi-sparkle">
              💫
            </div>
            <div className="pointer-events-none absolute bottom-10 right-8 text-2xl lumi-sparkle">
              ✨
            </div>

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
              {/* Online status */}
              <div className="mb-3 flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-semibold text-[#8d6aa8] shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-purple-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#a4d9a9]" />
                Lumi is here with you
              </div>

              {/* Lumi's speech bubble */}
              <div className="relative z-20 mb-2 w-full max-w-lg rounded-[1.7rem] border-2 border-white bg-white/95 px-5 py-4 text-center shadow-[0_8px_25px_rgba(140,100,170,0.12)] dark:border-slate-600 dark:bg-slate-800 sm:px-7">
                <span className="absolute -bottom-[11px] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-white bg-white dark:border-slate-600 dark:bg-slate-800" />

                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#bd91d7] dark:text-purple-300">
                  👑 Lumi says...
                </p>

                <p
                  aria-live="polite"
                  className="relative z-10 break-words text-base font-medium leading-7 text-[#493858] [overflow-wrap:anywhere] dark:text-slate-100 sm:text-lg sm:leading-8"
                >
                  {lastLumiMessage?.text}
                </p>

                {isSpeaking && (
                  <div
                    className="mt-2 flex justify-center gap-1"
                    aria-label="Lumi is speaking"
                  >
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#d9a6df]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#d9a6df] [animation-delay:100ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#d9a6df] [animation-delay:200ms]" />
                  </div>
                )}
              </div>

              {/* Tap Lumi to make her react */}
              <button
                type="button"
                onClick={touchLumi}
                aria-label="Touch Lumi for a cute reaction"
                className="relative mt-1 rounded-[2rem] p-2 outline-none transition-transform focus-visible:ring-4 focus-visible:ring-[#dcb9ed]"
              >
                {isTouched && (
                  <>
                    <span className="lumi-heart absolute -left-2 top-12 text-2xl">
                      💗
                    </span>
                    <span className="lumi-heart absolute -right-2 top-8 text-xl [animation-delay:100ms]">
                      💕
                    </span>
                  </>
                )}

                <div
                  className={`relative h-64 w-64 sm:h-72 sm:w-72 ${
                    isTouched ? "lumi-bounce" : "lumi-float"
                  }`}
                >
                  {/* Princess cape */}
                  <div className="absolute bottom-1 left-1/2 h-24 w-36 -translate-x-1/2 rounded-b-[48%] rounded-t-[35%] bg-gradient-to-b from-[#e5c4fa] to-[#c8a3eb] shadow-md" />

                  {/* Cloud body */}
                  <div className="absolute bottom-8 left-5 h-28 w-56 rounded-full bg-white shadow-[0_12px_25px_rgba(170,137,200,0.17)] sm:left-7 sm:w-60" />
                  <div className="absolute bottom-12 left-7 h-24 w-24 rounded-full bg-white shadow-sm sm:left-9" />
                  <div className="absolute bottom-16 left-14 h-28 w-28 rounded-full bg-white shadow-sm sm:left-16" />
                  <div className="absolute bottom-12 right-7 h-24 w-24 rounded-full bg-white shadow-sm sm:right-9" />
                  <div className="absolute bottom-9 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-white" />

                  {/* Pink princess collar */}
                  <div className="absolute bottom-9 left-1/2 z-10 h-8 w-20 -translate-x-1/2 rounded-b-full border-b-4 border-[#e8c1f1] bg-[#fff0fb]" />

                  {/* Crown */}
                  <div className="absolute left-1/2 top-1 z-20 -translate-x-1/2 -rotate-6 text-5xl drop-shadow-[0_4px_3px_rgba(190,143,91,0.2)] sm:text-6xl">
                    👑
                  </div>

                  {/* Face */}
                  <div className="absolute left-1/2 top-[43%] z-20 flex -translate-x-1/2 items-center gap-10 sm:gap-12">
                    <span
                      className={`lumi-eye block h-5 w-4 rounded-full bg-[#674b80] ${
                        expression === "sleepy" ? "scale-y-50" : ""
                      }`}
                    />
                    <span className="lumi-eye block h-5 w-4 rounded-full bg-[#674b80]" />
                  </div>

                  {/* Eye sparkles */}
                  <div className="absolute left-[36%] top-[42%] z-20 text-[8px] text-white">
                    ✨
                  </div>
                  <div className="absolute right-[36%] top-[42%] z-20 text-[8px] text-white">
                    ✨
                  </div>

                  {/* Rosy cheeks */}
                  <div
                    className={`absolute left-[25%] top-[52%] z-20 h-4 w-7 rounded-full bg-[#ffb7d4]/75 blur-[1px] ${
                      expression === "love" ? "scale-125" : ""
                    }`}
                  />
                  <div
                    className={`absolute right-[25%] top-[52%] z-20 h-4 w-7 rounded-full bg-[#ffb7d4]/75 blur-[1px] ${
                      expression === "love" ? "scale-125" : ""
                    }`}
                  />

                  {/* Talking mouth */}
                  <div
                    className={`absolute left-1/2 top-[54%] z-20 -translate-x-1/2 ${
                      isSpeaking
                        ? "lumi-mouth-talking h-4 w-3 rounded-full bg-[#805277]"
                        : expression === "curious"
                          ? "h-3 w-3 rounded-full border-2 border-[#805277] bg-transparent"
                          : expression === "sad"
                            ? "h-2.5 w-5 rounded-t-full border-t-[3px] border-[#805277]"
                            : "h-2.5 w-5 rounded-b-full border-b-[3px] border-[#805277]"
                    }`}
                  />

                  {/* Necklace */}
                  <div className="absolute bottom-[17%] left-1/2 z-20 -translate-x-1/2 text-sm">
                    💎
                  </div>

                  {/* Decorative stars */}
                  <span className="absolute left-5 top-[38%] z-20 text-xl lumi-sparkle">
                    ✨
                  </span>
                  <span className="absolute right-4 top-[35%] z-20 text-lg lumi-sparkle">
                    ⭐
                  </span>
                </div>
              </button>

              <p className="-mt-1 text-sm font-medium text-[#a084b5] dark:text-purple-200">
                {isSpeaking
                  ? "Lumi is talking to you... 🗣️"
                  : isTouched
                    ? "Hehehe! That tickles! 💕"
                    : "Tap your little princess to make her giggle! ☁️"}
              </p>

              {/* Lumi's thinking indicator */}
              {isThinking && (
                <div
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-2xl border border-pink-200 bg-white/90 px-4 py-3 text-sm font-semibold text-[#684b82] shadow-sm animate-pulse dark:border-purple-700 dark:bg-slate-800 dark:text-purple-200"
                >
                  <span>☁️</span>
                  <span>Lumi is thinking...</span>
                  <span>✨</span>
                </div>
              )}


              {/* Your last message */}
              {lastUserMessage && (
                
<div className="mt-5 max-w-sm self-end rounded-2xl rounded-br-sm border border-[#eadcf7] bg-[#e9ddff]/80 px-4 py-3 text-sm leading-6 text-[#6d5685] [overflow-wrap:anywhere] dark:border-purple-600 dark:bg-purple-950 dark:text-purple-100">

                  <span className="mb-1 block text-xs font-bold text-[#a082c4] dark:text-purple-300">
                    YOU 💌
                  </span>
                  {lastUserMessage.text}
                </div>
              )}

              {/* Quick conversation starters */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  { label: "Say hello 👋", text: "Hello Lumi!" },
                  { label: "Tell me a dream ✨", text: "Tell me about dreams" },
                  { label: "I feel sad 💗", text: "I'm feeling sad" },
                ].map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => sendMessage(suggestion.text)}
                    className="rounded-full border border-white bg-white/90 px-4 py-2 text-sm font-semibold text-[#8968a3] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff0fa] dark:border-slate-600 dark:bg-slate-800 dark:text-purple-200 dark:hover:bg-slate-700"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message input */}
          <div className="border-t border-white/80 bg-white/60 p-4 dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="mx-auto flex max-w-2xl items-center gap-2"
            >
              <input
                id="lumi-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tell Lumi something magical..."
                aria-label="Your message to Lumi"
                className="min-w-0 flex-1 rounded-2xl border-2 border-[#eadcf8] bg-white px-4 py-3 text-sm text-[#684b82] outline-none transition placeholder:text-[#b6a3c5] focus:border-[#c6a1e6] focus:ring-4 focus:ring-[#f0e4fa] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-purple-400 dark:focus:ring-purple-900/50"
              />

              <button
                type="submit"
                className="shrink-0 rounded-2xl bg-gradient-to-r from-[#c99ce7] to-[#b7a0ed] px-4 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
                disabled={!input.trim()}
              >
                Send ✨
              </button>
            </form>

            {/* Voice selection */}
            <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-[#eadcf8] bg-[#fffaff] p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-2 text-sm font-bold text-[#8968a3] dark:text-purple-200">
                🎀 Choose Lumi's Voice
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={selectedVoiceName}
                  onChange={(event) => setSelectedVoiceName(event.target.value)}
                  aria-label="Choose Lumi's voice"
                  className="min-w-0 flex-1 rounded-xl border border-[#e5d5f1] bg-white px-3 py-2 text-sm text-[#684b82] outline-none focus:border-[#c6a1e6] dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-purple-400"
                >
                  {availableVoices.length === 0 && (
                    <option value="">No Hindi or English voices found</option>
                  )}

                  {availableVoices.map((voice) => (
                    <option
                      key={`${voice.name}-${voice.lang}`}
                      value={voice.name}
                    >
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!selectedVoice}
                  onClick={() =>
                    speakLumi(
                      "Hiiii, little dreamer! Namaste! Chalo, aaj kuch magical karte hain!",
                      selectedVoice,
                      setIsSpeaking,
                    )
                  }
                  className="rounded-xl bg-[#f1e5fc] px-4 py-2 text-sm font-bold text-[#8968a3] transition hover:bg-[#e7d4f8] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800"
                >
                  💗 Listen to my voice!
                </button>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[#a08aaf] dark:text-slate-400">
                Available voices depend on your device and browser. Lumi uses
                your browser's built-in speech, so no paid voice API is needed.
              </p>
            </div>

            
            {/* Lumi's cute baby-princess keyboard */}
            <div className="mx-auto mt-6 max-w-xl overflow-hidden rounded-[2rem] border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-4 shadow-[0_8px_0_#e9c9ee,0_14px_25px_rgba(190,140,210,0.18)] dark:border-purple-700 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 dark:shadow-[0_8px_0_#4c1d65] sm:p-5">

              {/* Cute keyboard header */}
              <div className="mb-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 text-2xl">
                  <span>🎀</span>
                  <span className="animate-pulse">💗</span>
                  <span>☁️</span>
                </div>

                <h3 className="font-hand text-xl font-black text-pink-700 dark:text-pink-200 sm:text-2xl">
                  Lumi's Tiny Typing Garden
                </h3>

                <p className="mt-1 text-xs font-semibold text-purple-500 dark:text-purple-300">
                  Tap a little key to make some magic! ✨
                </p>
              </div>

              {/* Puffy pastel letter keys */}
              <div className="space-y-2.5">
                {keyboardRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center gap-1.5 sm:gap-2"
                  >
                    {row.map((key, keyIndex) => (
                      <button
                        key={key}
                        type="button"
                        aria-label={`Type ${key}`}
                        onClick={() => {
                          setInput((current) => current + key);
                          sounds.tap();
                        }}
                        className={`flex h-10 min-w-0 flex-1 items-center justify-center rounded-[13px] border-2 text-sm font-black lowercase shadow-[0_3px_0_rgba(160,110,180,0.25)] transition-all duration-150 hover:-translate-y-0.5 hover:scale-105 active:translate-y-1 active:scale-95 active:shadow-none sm:h-12 sm:rounded-2xl sm:text-base ${
                          (keyIndex + rowIndex) % 3 === 0
                            ? "border-pink-200 bg-pink-200 text-pink-800 hover:bg-pink-300 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-100 dark:hover:bg-pink-900"
                            : (keyIndex + rowIndex) % 3 === 1
                              ? "border-purple-200 bg-purple-200 text-purple-800 hover:bg-purple-300 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100 dark:hover:bg-purple-900"
                              : "border-violet-200 bg-violet-100 text-violet-800 hover:bg-violet-200 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-100 dark:hover:bg-violet-900"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Space, erase and ask */}
                <div className="grid grid-cols-[1fr_1fr_1.15fr] gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInput((current) => current + " ");
                      sounds.tap();
                    }}
                    className="rounded-2xl border-2 border-sky-200 bg-sky-100 px-2 py-3 text-xs font-extrabold text-sky-800 shadow-[0_4px_0_#bfdbfe] transition-all hover:-translate-y-0.5 hover:bg-sky-200 active:translate-y-1 active:shadow-none dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:shadow-[0_4px_0_#1e3a5f] dark:hover:bg-sky-900 sm:text-sm"
                  >
                    ☁️ Space
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInput((current) => current.slice(0, -1));
                      sounds.tap();
                    }}
                    className="rounded-2xl border-2 border-orange-200 bg-orange-100 px-2 py-3 text-xs font-extrabold text-orange-800 shadow-[0_4px_0_#fed7aa] transition-all hover:-translate-y-0.5 hover:bg-orange-200 active:translate-y-1 active:shadow-none dark:border-orange-800 dark:bg-orange-950 dark:text-orange-100 dark:shadow-[0_4px_0_#7c2d12] dark:hover:bg-orange-900 sm:text-sm"
                  >
                    🧸 Erase
                  </button>

                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="rounded-2xl border-2 border-pink-300 bg-gradient-to-r from-pink-400 to-purple-400 px-2 py-3 text-xs font-black text-white shadow-[0_4px_0_#c084c9] transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-purple-500 dark:from-pink-700 dark:to-purple-700 dark:shadow-[0_4px_0_#581c87] sm:text-sm"
                  >
                    💌 Ask Lumi!
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-xs font-semibold text-pink-600 dark:text-purple-300">
                🌸 You're doing amazing, little dreamer! 🌸
              </p>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
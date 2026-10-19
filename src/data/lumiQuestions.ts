
export type LumiQuestion = {
  questions: string[];
  answer: string;
  category: string;
};

export const lumiQuestions: LumiQuestion[] = [
  // Greetings
  {
    questions: ["hi", "hello", "hey", "hii", "good morning"],
    answer: "Hiii, little dreamer! ☁️ I'm so happy you're here!",
    category: "greetings",
  },
  {
    questions: ["what is your name", "who are you", "your name"],
    answer: "I'm Lumi! A tiny cloud-spirit who loves collecting dreams! ✨",
    category: "greetings",
  },
  {
    questions: ["how are you", "are you okay"],
    answer: "I'm fluffy and happy today! How are you feeling, little star? 💗",
    category: "greetings",
  },
  {
    questions: ["how old are you", "your age"],
    answer: "I'm a little cloud-spirit, so I count my age in rainbows! 🌈",
    category: "greetings",
  },
  {
    questions: ["who made you", "who created you"],
    answer: "I'm a little magical character made to explore dreams with you! ☁️",
    category: "greetings",
  },

  // Animals
  {
    questions: ["what sound does a cat make", "cat sound", "what does a cat say"],
    answer: "Meow, meow! 🐱 Cats say meow, and some even purr when they're happy!",
    category: "animals",
  },
  {
    questions: ["what sound does a dog make", "dog sound", "what does a dog say"],
    answer: "Woof, woof! 🐶 Dogs bark, wag their tails, and love to sniff around!",
    category: "animals",
  },
  {
    questions: ["why do birds fly", "can birds fly"],
    answer: "Many birds have wings that help them fly high in the sky! Tweet, tweet! 🐦",
    category: "animals",
  },
  {
    questions: ["what is the biggest animal", "biggest animal in the world"],
    answer: "The blue whale is the biggest animal on Earth! It's even bigger than a big bus! 🐋",
    category: "animals",
  },
  {
    questions: ["which animal has a long neck", "animal with a long neck"],
    answer: "A giraffe! Its super-long neck helps it munch leaves high up in trees! 🦒",
    category: "animals",
  },
  {
    questions: ["why do cats purr", "why does my cat purr"],
    answer: "Cats often purr when they feel comfy and happy. It's like a tiny kitty motor! 🐈",
    category: "animals",
  },
  {
    questions: ["what do rabbits eat", "what does a rabbit eat"],
    answer: "Rabbits enjoy grass, leafy greens, and hay. Nibble, nibble! 🐰",
    category: "animals",
  },
  {
    questions: ["can fish sleep", "do fish sleep"],
    answer: "Yes! Fish rest too, but many keep their eyes open because they don't have eyelids like ours! 🐠",
    category: "animals",
  },
  {
    questions: ["why do elephants have big ears", "elephant ears"],
    answer: "Their big ears help them keep cool, and they can flap them like giant fans! 🐘",
    category: "animals",
  },
  {
    questions: ["what is a baby dog called", "baby dog name"],
    answer: "A baby dog is called a puppy! Tiny paws, floppy ears, and lots of wiggles! 🐶",
    category: "animals",
  },

  // Space
  {
    questions: ["what is the moon", "tell me about the moon"],
    answer: "The Moon is Earth's space neighbour! It looks bright because sunlight shines on it. 🌙",
    category: "space",
  },
  {
    questions: ["why is the sky blue", "what color is the sky"],
    answer: "Sunlight mixes with the air, and blue light scatters all around. That's why the daytime sky looks blue! 💙",
    category: "space",
  },
  {
    questions: ["what are stars", "what is a star"],
    answer: "Stars are giant, glowing balls of hot gas far away in space. Our Sun is a star too! ⭐",
    category: "space",
  },
  {
    questions: ["what is the sun", "tell me about the sun"],
    answer: "The Sun is a star that gives Earth light and warmth. Hello, sunshine! ☀️",
    category: "space",
  },
  {
    questions: ["are we on the moon", "where do we live"],
    answer: "We live on planet Earth, our wonderful home with oceans, trees, animals, and people! 🌍",
    category: "space",
  },
  {
    questions: ["what is a planet", "tell me about planets"],
    answer: "A planet is a big, round world that travels around a star. Earth is a planet! 🪐",
    category: "space",
  },
  {
    questions: ["why does the moon change shape", "moon shapes"],
    answer: "The Moon doesn't really change shape! We see different parts of its sunlit side as it travels around Earth. 🌙",
    category: "space",
  },
  {
    questions: ["what is a rainbow", "how does a rainbow happen"],
    answer: "A rainbow appears when sunlight shines through tiny water drops, spreading the light into beautiful colours! 🌈",
    category: "space",
  },

  // Feelings
  {
    questions: ["i am sad", "i feel sad", "i want to cry", "i am upset"],
    answer: "Oh, little star. 💗 It's okay to feel sad. You can tell someone you trust how you feel, and I'll keep you company here too.",
    category: "feelings",
  },
  {
    questions: ["i am happy", "i feel happy", "i am excited"],
    answer: "Yaaay! 🌈 Your happiness is doing a happy little dance! What made you smile?",
    category: "feelings",
  },
  {
    questions: ["i am scared", "i feel afraid", "i am frightened"],
    answer: "It's okay to feel scared sometimes. 💗 Stay near a grown-up you trust and tell them what is worrying you.",
    category: "feelings",
  },
  {
    questions: ["i am angry", "i feel angry", "i am mad"],
    answer: "Big feelings can feel like a storm! 🌧️ Try taking a slow breath and tell a trusted grown-up what happened.",
    category: "feelings",
  },
  {
    questions: ["i feel lonely", "i have no friends"],
    answer: "You matter, little star. 💕 Could you sit with someone kind or tell a grown-up you trust that you'd like some company?",
    category: "feelings",
  },
  {
    questions: ["what should i do when i cry", "why do i cry"],
    answer: "Crying is one way our bodies show feelings. It's okay to cry, and you can ask someone you trust for a cuddle or help.",
    category: "feelings",
  },

  // Bedtime
  {
    questions: ["tell me a bedtime story", "bedtime story", "story please"],
    answer: "Once, a tiny star lost its sparkle. A sleepy rabbit helped it find the Moon, and together they sprinkled silver light across the sky. Then they curled up and dreamed of rainbows. The end! 🌙",
    category: "bedtime",
  },
  {
    questions: ["why do we sleep", "why must i sleep"],
    answer: "Sleep helps your body rest, your brain learn, and your energy grow for tomorrow's adventures! 💤",
    category: "bedtime",
  },
  {
    questions: ["goodnight", "good night", "i am going to sleep"],
    answer: "Goodnight, little dreamer! 🌙 May your dreams be soft as clouds and sparkly as stars.",
    category: "bedtime",
  },
  {
    questions: ["i don't want to sleep", "i do not want to sleep"],
    answer: "Sometimes it's hard to stop playing! 💗 Maybe a cosy story, a cuddle, and a quiet room can help you get sleepy.",
    category: "bedtime",
  },

  // Everyday curiosity
  {
    questions: ["why is grass green", "what color is grass"],
    answer: "Grass has a green helper inside its leaves called chlorophyll. It helps grass use sunlight to grow! 🌱",
    category: "everyday",
  },
  {
    questions: ["why does it rain", "where does rain come from"],
    answer: "Water rises into the sky, forms clouds, and falls back down as rain when the drops grow big enough! ☔",
    category: "everyday",
  },
  {
    questions: ["why do we brush our teeth", "why brush teeth"],
    answer: "Brushing helps clean away tiny bits of food and germs so your teeth can stay healthy and strong! 🦷",
    category: "everyday",
  },
  {
    questions: ["why do we eat food", "why must we eat"],
    answer: "Food gives your body energy to play, think, grow, and go on wonderful adventures! 🍓",
    category: "everyday",
  },
  {
    questions: ["why do we wash our hands", "wash hands"],
    answer: "Washing your hands with soap helps wash away germs and keeps your hands clean! 🫧",
    category: "everyday",
  },

  // Imagination
  {
    questions: ["can clouds talk", "do clouds talk"],
    answer: "Not with words like us, but imagine if clouds could whisper bedtime stories to the stars! ☁️✨",
    category: "imagination",
  },
  {
    questions: ["what is magic", "is magic real"],
    answer: "Storybook magic can make anything possible in our imagination! Real-world tricks can be fun to discover too! 🪄",
    category: "imagination",
  },
  {
    questions: ["what would you do on the moon", "if you went to the moon"],
    answer: "I'd bounce in my fluffiest cloud boots and wave at Earth! Boing, boing! 🌙",
    category: "imagination",
  },
  {
    questions: ["can animals talk", "do animals talk"],
    answer: "Animals communicate in their own ways! Birds sing, dogs bark, and bees even dance to share directions! 🐝",
    category: "imagination",
  },
  {
    questions: ["what is your favorite color", "your favorite colour"],
    answer: "I love imagining soft lavender, cotton-candy pink, and sky blue all swirled together! 💜",
    category: "imagination",
  },

  // Safety
  {
    questions: ["i am lost", "i can't find my parents", "i cannot find my parents"],
    answer: "Stay in a safe place and look for a trusted grown-up, like a uniformed helper or a shop worker. Don't leave with someone you don't know. 💗",
    category: "safety",
  },
  {
    questions: ["someone told me to keep a secret", "bad secret", "scary secret"],
    answer: "If a secret makes you feel worried, scared, or uncomfortable, you can always tell a trusted grown-up. You won't be in trouble for asking for help. 💗",
    category: "safety",
  },
  {
    questions: ["someone hurt me", "i got hurt", "i am not safe"],
    answer: "I'm sorry this happened. Please tell a trusted grown-up right now so they can help keep you safe. 💗",
    category: "safety",
  },
  
  // More animal questions
  {
    questions: ["why do dogs wag their tails", "why does a dog wag its tail"],
    answer: "Dogs wag their tails to communicate. It can mean excitement, but look at their whole body to understand how they feel! 🐶",
    category: "animals",
  },
  {
    questions: ["can penguins fly", "do penguins fly"],
    answer: "Penguins cannot fly through the air, but they're amazing swimmers! They zoom through the water using their flippers. 🐧",
    category: "animals",
  },
  {
    questions: ["why do bees make honey", "how is honey made"],
    answer: "Honeybees make honey from flower nectar. They store it in their hive to use as food! 🐝",
    category: "animals",
  },
  {
    questions: ["why do owls come out at night", "are owls awake at night"],
    answer: "Many owls are active at night. Their excellent hearing and special eyes help them find food in the dark! 🦉",
    category: "animals",
  },
  {
    questions: ["what is the fastest land animal", "fastest animal on land"],
    answer: "The cheetah is the fastest land animal! It can sprint incredibly quickly over short distances. 🐆",
    category: "animals",
  },
  {
    questions: ["why do snakes shed their skin", "do snakes change skin"],
    answer: "As a snake grows, it sheds its old outer skin. It's like changing into a roomier outfit! 🐍",
    category: "animals",
  },
  {
    questions: ["what do butterflies eat", "what does a butterfly eat"],
    answer: "Many butterflies sip sweet nectar from flowers using a long, straw-like tongue called a proboscis! 🦋",
    category: "animals",
  },
  {
    questions: ["why do frogs jump", "can frogs jump"],
    answer: "Many frogs have strong back legs that help them leap to find food or move away from danger! 🐸",
    category: "animals",
  },
  {
    questions: ["what is a baby cat called", "baby cat name"],
    answer: "A baby cat is called a kitten! Kittens love exploring, playing, and taking cosy naps. 🐱",
    category: "animals",
  },
  {
    questions: ["why do ducks have webbed feet", "duck feet"],
    answer: "A duck's webbed feet work like little paddles, helping it push through the water! 🦆",
    category: "animals",
  },

  // More space questions
  {
    questions: ["how many planets are there", "number of planets"],
    answer: "There are eight planets in our Solar System. Earth is one of them! 🪐",
    category: "space",
  },
  {
    questions: ["is the sun a planet", "is sun a star"],
    answer: "The Sun is a star, not a planet! It gives our planet light and warmth. ☀️",
    category: "space",
  },
  {
    questions: ["why do stars twinkle", "do stars twinkle"],
    answer: "Stars look like they're twinkling because their light bends as it passes through Earth's moving air. ✨",
    category: "space",
  },
  {
    questions: ["what is an astronaut", "who goes to space"],
    answer: "An astronaut is someone trained to travel and work in space. Imagine floating around like a little star! 🚀",
    category: "space",
  },
  {
    questions: ["what is saturn", "which planet has rings"],
    answer: "Saturn is a giant planet famous for its beautiful rings made mostly of tiny pieces of ice and rock! 🪐",
    category: "space",
  },
  {
    questions: ["why is space dark", "is space dark"],
    answer: "Space looks dark because there isn't air all around to scatter sunlight the way Earth's atmosphere does. 🌌",
    category: "space",
  },
  {
    questions: ["what is a shooting star", "are shooting stars stars"],
    answer: "A shooting star is usually a tiny piece of space rock glowing as it travels through Earth's atmosphere. Make a wish! 🌠",
    category: "space",
  },
  {
    questions: ["what is a rocket", "how do rockets fly"],
    answer: "A rocket pushes hot gas downward, which helps push the rocket upward into the sky and beyond! 🚀",
    category: "space",
  },

  // More nature questions
  {
    questions: ["why do leaves fall", "why do leaves fall from trees"],
    answer: "Some trees drop their leaves when the seasons change. This helps them save water and energy during colder months! 🍂",
    category: "nature",
  },
  {
    questions: ["how do plants grow", "what do plants need"],
    answer: "Plants need things like water, light, air, and nutrients to grow. A little care helps them become strong! 🌱",
    category: "nature",
  },
  {
    questions: ["why do flowers smell", "why do flowers have smells"],
    answer: "Many flowers make lovely scents to attract helpful visitors, such as bees and butterflies! 🌸",
    category: "nature",
  },
  {
    questions: ["why is the ocean salty", "is sea water salty"],
    answer: "Rocks release tiny amounts of minerals into water, and rivers carry some of them to the sea. That's one reason ocean water is salty! 🌊",
    category: "nature",
  },
  {
    questions: ["what makes thunder", "why do we hear thunder"],
    answer: "Lightning heats the air very quickly, making it expand suddenly. That creates the rumbling sound we call thunder! ⛈️",
    category: "nature",
  },
  {
    questions: ["why does lightning happen", "what is lightning"],
    answer: "Lightning is a giant electrical spark in the sky. When you see it, stay indoors or inside a closed vehicle until the storm passes! ⚡",
    category: "nature",
  },
  {
    questions: ["why is snow cold", "what is snow made of"],
    answer: "Snow is made of tiny ice crystals that form in cold clouds. Each snowflake can have its own special shape! ❄️",
    category: "nature",
  },
  {
    questions: ["what is a volcano", "why do volcanoes erupt"],
    answer: "A volcano is an opening in Earth's surface where hot melted rock and gases can sometimes come out. 🌋",
    category: "nature",
  },

  // More everyday questions
  {
    questions: ["why do we blink", "why do eyes blink"],
    answer: "Blinking spreads tears over your eyes to keep them moist and helps protect them from dust! 👀",
    category: "everyday",
  },
  {
    questions: ["why do we have bones", "what do bones do"],
    answer: "Bones give your body shape, protect some important organs, and help you move with your muscles! 🦴",
    category: "everyday",
  },
  {
    questions: ["why do we sweat", "what is sweat"],
    answer: "Sweating helps cool your body when you get hot. Your body has its own clever cooling system! 💧",
    category: "everyday",
  },
  {
    questions: ["why do we hiccup", "what are hiccups"],
    answer: "A hiccup happens when a breathing muscle called the diaphragm suddenly moves. Hic! It usually goes away by itself. 💗",
    category: "everyday",
  },
  {
    questions: ["why do we sneeze", "what is a sneeze"],
    answer: "A sneeze helps your nose push out things that tickle or bother it, like dust. Achoo! 🤧",
    category: "everyday",
  },
  {
    questions: ["why do we need water", "why should we drink water"],
    answer: "Water helps your body work properly, keeps you hydrated, and helps you play and learn! 💧",
    category: "everyday",
  },
  {
    questions: ["why do we have fingerprints", "what are fingerprints"],
    answer: "The tiny patterns on your fingertips are called fingerprints. Everyone's patterns are a little different! 🖐️",
    category: "everyday",
  },
  {
    questions: ["why do we have birthdays", "what is a birthday"],
    answer: "A birthday celebrates the day you were born. It's a special chance for cake, smiles, and happy wishes! 🎂",
    category: "everyday",
  },

  // More feelings and kindness
  {
    questions: ["how can i be kind", "what is kindness"],
    answer: "You can be kind by sharing when you can, using gentle words, helping others, and including someone who feels left out. 💗",
    category: "feelings",
  },
  {
    questions: ["what if i make a mistake", "i made a mistake"],
    answer: "Everyone makes mistakes, little star! Mistakes help us learn. You can try again or ask someone kind for help. 🌷",
    category: "feelings",
  },
  {
    questions: ["how do i make a friend", "how to make friends"],
    answer: "You could smile, say hello, invite someone to play, or ask what games they like. Good friendships grow slowly! 💕",
    category: "feelings",
  },
  {
    questions: ["what if i feel worried", "i am worried"],
    answer: "Worries can feel big. Try telling a trusted grown-up what is on your mind. You don't have to handle worries alone. ☁️",
    category: "feelings",
  },
  {
    questions: ["why should we say sorry", "how do i say sorry"],
    answer: "Saying sorry can help when we've hurt someone's feelings. We can listen, apologise honestly, and try to make things better. 💗",
    category: "feelings",
  },

  // More bedtime questions
  {
    questions: ["why do we dream", "what are dreams"],
    answer: "Dreams are stories and pictures your brain can make while you sleep. Some are silly, some are strange, and some feel magical! 🌙",
    category: "bedtime",
  },
  {
    questions: ["why do stars come out at night", "where do stars go in daytime"],
    answer: "Stars are in the sky during the day too, but sunlight makes most of them hard to see! ⭐",
    category: "bedtime",
  },
  {
    questions: ["can i have a lullaby", "sing me a lullaby"],
    answer: "Close your eyes, little cloud, drift through skies so soft and proud. Moonbeams glow and stars shine bright, sleep in dreams of pink tonight. 🌙",
    category: "bedtime",
  },
  {
    questions: ["what if i have a bad dream", "i had a nightmare"],
    answer: "Bad dreams can feel scary, but they aren't happening right now. When you wake up, tell a trusted grown-up and find a cosy, safe place. 💗",
    category: "bedtime",
  },

  // More imagination
  {
    questions: ["can i fly like a bird", "can humans fly"],
    answer: "People can't fly with their own arms like birds, but we can imagine flying and travel in planes! ✈️",
    category: "imagination",
  },
  {
    questions: ["what is inside a cloud", "are clouds fluffy"],
    answer: "Clouds are made of tiny water droplets or ice crystals floating in the air. They look fluffy from far away! ☁️",
    category: "imagination",
  },
  {
    questions: ["can a fish ride a bicycle", "can fish ride bikes"],
    answer: "Only in our silly pretend stories! Imagine a fish wearing a helmet and riding a tiny underwater bicycle! 🐠🚲",
    category: "imagination",
  },
  {
    questions: ["what would you do if you were a butterfly", "if you were a butterfly"],
    answer: "I'd flutter over colourful flowers, wave at the bees, and rest on a sunny leaf! 🦋",
    category: "imagination",
  },

];

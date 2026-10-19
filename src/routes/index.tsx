import { createFileRoute } from '@tanstack/react-router'

import { Navbar } from "@/components/Navbar";
import { LumiGreeting } from "@/components/LumiGreeting";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Story } from "@/sections/Story";
import { Creations } from "@/sections/Creations";
import { StoryLibrary } from "@/components/StoryLibrary";
import { LumiMascot } from "@/components/LumiMascot";
import { DreamDelivery } from "@/components/DreamDelivery";
import { DreamExplorer } from "@/components/DreamExplorer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumi's Little Dream Garden" },
      {
        name: "description",
        content:
          "Meet Lumi, a tiny cloud-spirit who collects forgotten dreams and grows them into stars.",
      },
      { property: "og:title", content: "Lumi's Little Dream Garden" },
      {
        property: "og:description",
        content: "Every little dream deserves to shine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
<LumiGreeting />
<About />
        <Story />
        <LumiMascot />
        <StoryLibrary />
        <DreamDelivery />
        <Creations />
      </main>

      <DreamExplorer />
    </>
  );
}


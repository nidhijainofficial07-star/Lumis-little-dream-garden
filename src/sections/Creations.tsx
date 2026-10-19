
import { DreamJar } from "@/components/creations/DreamJar";
import { WishGarden } from "@/components/creations/WishGarden";
import { StarCollector } from "@/components/creations/StarCollector";
import { DreamGuestbook } from "@/components/DreamGuestbook";
import { LumiChat } from "@/components/LumiChat";

export function Creations() {
  return (
    <>
      <section id="garden" className="scroll-mt-24 bg-sky px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-semibold">
            <span aria-hidden="true">✿ </span>The Dream Garden
          </h2>

          <p className="mt-2 font-hand text-xl text-muted-foreground">
            three little things lumi made — go on, poke them!
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <DreamJar />
            <WishGarden />
            <StarCollector />
          </div>
        </div>
      </section>

      <DreamGuestbook />
      <LumiChat />
      
    </>
  );
}

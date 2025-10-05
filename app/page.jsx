import { Particles } from "@/components/particles";
export default function ParticlesBasic() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-slate-900 dark:bg-zinc-950 md:shadow-xl">
    
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
    </div>
  );
}

import Scene from '@/components/Scene';
import Overlay from '@/components/Overlay';
import PlanetList from '@/components/PlanetList';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <BackgroundMusic />
      <Overlay />
      <PlanetList />
      <div className="absolute top-4 left-4 z-50 p-0 md:top-0 md:left-0 md:p-6 text-white pointer-events-none pt-[env(safe-area-inset-top)] md:pt-6">
        <h1 className="text-xl md:text-4xl font-bold tracking-tighter drop-shadow-md">Solar Explorer</h1>
        <p className="opacity-70 text-[10px] md:text-base drop-shadow-sm">Interactive 3D System</p>
      </div>

      <Scene />
    </main>
  );
}

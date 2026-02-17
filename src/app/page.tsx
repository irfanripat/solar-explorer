import Scene from '@/components/Scene';
import Overlay from '@/components/Overlay';
import PlanetList from '@/components/PlanetList';

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <Overlay />
      <PlanetList />
      <div className="absolute top-0 left-0 z-10 p-6 text-white pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter">Solar Explorer</h1>
        <p className="opacity-70">Interactive 3D System</p>
      </div>

      <Scene />
    </main>
  );
}

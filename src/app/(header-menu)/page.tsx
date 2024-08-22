import Blade1 from "./_blades/Blade1";
import Blade2 from "./_blades/Blade2";
import Blade3 from "./_blades/Blade3";
import Blade4 from "./_blades/Blade4";

export default function Home() {
  return (
    <main className="relative -mt-20 min-h-svh overflow-hidden">
      <Blade1 />
      <Blade2 />
      <Blade3 />
      <Blade4 />
    </main>
  );
}

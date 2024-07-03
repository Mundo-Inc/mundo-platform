import FirstBlade from "./_blades/FirstBlade";
import SecondBlade from "./_blades/SecondBlade";
import ThirdBlade from "./_blades/ThirdBlade";

export default function Home() {
  return (
    <main className="relative -mt-20 min-h-dvh overflow-x-hidden">
      <FirstBlade />
      <SecondBlade />
      <ThirdBlade />
    </main>
  );
}

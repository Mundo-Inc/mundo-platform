import MainContent from "@/components/mainContent";
import Header from "../(header-menu)/_components/Header";
import SignInForm from "@/components/signInForm";
import Image from "next/image";

export default function SignInView() {
  return (
    <MainContent className="relative flex min-h-dvh flex-col items-center justify-center">
      <Header />
      <div className="-mt-20 flex w-full flex-grow items-center justify-center">
        <SignInForm />
      </div>

      <div
        className="absolute top-1/2 -z-10 -translate-y-1/2"
        style={{
          width: "100svh",
          height: "100svh",
          backgroundColor: "#7303E2",
          left: "-50svh",
          borderRadius: "50%",
          filter: "blur(400px)",
          opacity: 0.35,
        }}
      />
      <Image
        src="/images/lp/LeadingObj.png"
        alt=""
        width={435}
        height={1521}
        className="pointer-events-none absolute -top-1/2 left-0 -z-10"
      />
      <Image
        src="/images/lp/Obj2.png"
        alt=""
        width={401}
        height={329}
        className="pointer-events-none absolute bottom-0 left-1/4 -z-10 -translate-x-1/2"
      />
    </MainContent>
  );
}

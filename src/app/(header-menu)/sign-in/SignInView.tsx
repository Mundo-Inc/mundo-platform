import Bg from "@/components/bg";
import MainContent from "@/components/mainContent";
import SignInForm from "@/components/signInForm";

export default function SignInView() {
  return (
    <MainContent
      withHeader
      className="relative flex min-h-svh items-center justify-center"
    >
      <SignInForm />

      <Bg />
    </MainContent>
  );
}

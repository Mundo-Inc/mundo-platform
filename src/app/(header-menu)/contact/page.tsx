import Bg from "@/components/bg";
import ContactForm from "@/components/contactForm";
import MainContent from "@/components/mainContent";

export default function Page() {
  return (
    <MainContent
      withHeader
      className="flex min-h-svh items-center justify-center"
    >
      <section className="container grid grid-cols-1 gap-10 pb-20 md:grid-cols-2">
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold">Get in Touch with Us!</h1>
          <p className="mt-2 opacity-70">
            We love hearing from our Mundo explorers! Whether you&apos;ve
            discovered a hidden gem, need help checking in, or just want to say
            hi, we&apos;re all ears.
          </p>

          <ul className="ml-4 mt-10 flex flex-col gap-y-2">
            <li className="list-item list-disc items-center gap-x-2">
              <h3 className="font-bold">Found a Bug?</h3>
              <p className="opacity-70">
                Oops! Help us squash it by letting us know.
              </p>
            </li>
            <li className="list-item list-disc items-center gap-x-2">
              <h3 className="font-bold">Got an Idea?</h3>
              <p className="opacity-70">
                We&apos;re always looking for fresh ways to make Mundo better.
              </p>
            </li>
            <li className="list-item list-disc items-center gap-x-2">
              <h3 className="font-bold">Need Assistance?</h3>
              <p className="opacity-70">
                Our support team is here to help you navigate the world, one
                check-in at a time.
              </p>
            </li>
            <li className="list-item list-disc items-center gap-x-2">
              <h3 className="font-bold">Just Want to Chat?</h3>
              <p className="opacity-70">
                We&apos;re always up for a conversation, whether it&apos;s about
                your latest adventure or your favorite spot in town.
              </p>
            </li>
          </ul>
        </div>

        <ContactForm className="mx-auto lg:max-w-md" />
      </section>

      <Bg />
    </MainContent>
  );
}

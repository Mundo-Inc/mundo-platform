import Image from "next/image";

import env from "@env";
import LandingPageVector1 from "../../../vectors/LandingPageVector1";
import LandingPageVector2 from "../../../vectors/LandingPageVector2";

export default function FirstBlade() {
  return (
    <>
      <section className="wrapper grid min-h-dvh grid-cols-12 items-center pt-20">
        <div className="col-span-6 flex flex-col items-start gap-y-10">
          <Image
            src="/images/lp/LandingPageLogo.png"
            alt="Mundo Logo"
            width={237}
            height={237}
          />
          <p className="uppercase opacity-70">
            Intoducing Social Media for Foodies
          </p>
          <h1 className="text-5xl">
            See Who&apos;s Eating{" "}
            <span className="font-semibold italic">Without</span> You!
          </h1>
          <p className="opacity-70">
            Download the latest version of Mundo application to get access to
            thousands of dining places reviews and check where your
            friend&apos;s most favorite places.
          </p>
          <a
            href={env.NEXT_PUBLIC_APPSTORE_LINK}
            target="_blank"
            rel="noreferrer"
            title="Download Mundo on App Store"
          >
            <Image
              src="/images/AppStore.svg"
              alt="App Store"
              width={120}
              height={40}
            />
          </a>
        </div>
        <div className="relative col-span-6 flex h-full items-center justify-center">
          <div
            className="bg z-10 p-2.5"
            style={{
              backgroundColor: "#131313",
              borderRadius: 35,
              boxShadow: "56px 42px 42px #01002369",
            }}
          >
            <Image
              src="/images/lp/Mobile-Screen-Feed.png"
              alt="Mundo app feed"
              width={274}
              height={624}
              draggable={false}
            />
          </div>

          <div
            className="bg z-0 -ml-16 mt-10 rotate-12 p-2"
            style={{
              backgroundColor: "#131313",
              borderRadius: 35,
              boxShadow:
                "56px 42px 42px #00000069, inset -20px -2px 20px #ffffff19, inset 20px 2px 20px #ffffff10",
            }}
          >
            <Image
              src="/images/lp/Mobile-Screen-Feed.png"
              alt="Mundo app maps view"
              width={274}
              height={624}
              draggable={false}
            />
          </div>

          <div
            className="absolute left-0 right-0 top-1/2 -z-10 aspect-square w-full -translate-y-1/2"
            style={{
              backgroundColor: "#AD00FF49",
              borderRadius: "50%",
              filter: "blur(400px)",
            }}
          />
        </div>
      </section>

      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <LandingPageVector2 className="absolute right-0 top-0" />
        <LandingPageVector1 className="absolute right-0 top-0" />
      </div>
    </>
  );
}

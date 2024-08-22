import Image from "next/image";

import env from "@env";

export default function Blade3() {
  return (
    <div className="relative min-h-svh">
      <section className="container flex min-h-svh items-center">
        <div className="grid w-full grid-cols-12 items-start gap-y-10">
          <div className="col-span-12 flex flex-col items-start gap-y-5 pl-0 lg:col-span-7 lg:pl-[10%]">
            <h2 className="text-xl md:text-3xl lg:text-5xl">
              Find{" "}
              <b>
                THE <em>BEST</em>
              </b>{" "}
              <em>Places to visit</em>
            </h2>
            <p className="text-base opacity-40 lg:text-xl xl:text-2xl">
              Our verified reviewers will help you to find the best dining place
              in your area.
            </p>
            <a
              href={env.NEXT_PUBLIC_APPSTORE_LINK}
              className="block self-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-black lg:self-start"
            >
              Download App
            </a>
          </div>
          <div className="relative col-span-12 flex items-center justify-center lg:col-span-5">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="box-content rounded-2xl border-4"
              style={{
                width: 295.33,
                height: 640,
              }}
              title="Demo video"
              aria-label="Demo video showing app features"
            >
              <source
                src="https://mundo-app.s3.us-west-1.amazonaws.com/assets/SR.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

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

      <div
        className="-z-10"
        aria-hidden="true"
        style={{
          width: 435,
          height: 1521,
          pointerEvents: "none",
          position: "absolute",
          top: "-50%",
          left: "0",
          backgroundImage: `url(/images/lp/LeadingObj.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="-z-10"
        style={{
          width: 401,
          height: 329,
          pointerEvents: "none",
          position: "absolute",
          bottom: "0",
          left: "25%",
          translate: "-50%",
          backgroundImage: `url(/images/lp/Obj2.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

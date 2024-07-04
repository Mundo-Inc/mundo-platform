import Image from "next/image";

import env from "@env";

export default function Blade3() {
  return (
    <div className="relative min-h-dvh">
      <section className="wrapper flex min-h-dvh items-center">
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
            <div
              className="flex items-center justify-center rounded-2xl bg-gray-900"
              style={{
                width: 350,
                height: 600,
              }}
            >
              Video
            </div>
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
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Blade4() {
  return (
    <section
      id="ForBusiness"
      className="container flex min-h-svh flex-col items-start justify-center gap-y-4"
    >
      <h2 className="max-w-3xl text-xl md:text-3xl lg:text-5xl">
        Are you a Business? Partner with Us!
      </h2>
      <p className="max-w-2xl uppercase opacity-70">
        Are you a bar, restaurant, pub, or any other food establishment?
      </p>
      <p className="max-w-lg">
        Partner with Us & Boost Your Business with Exclusive Deals and attract
        more customers by offering exclusive deals. Drive traffic and increase
        your revenue effortlessly.
      </p>
      <Link
        href="/contact"
        className="self-center rounded-2xl px-4 py-3 text-sm font-black text-black lg:self-start"
        style={{
          backgroundColor: "#FF89E5",
        }}
      >
        Get Started!
      </Link>
      <div className="pointer-events-none flex w-full items-center justify-between pt-16">
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative size-20 md:size-28 lg:size-52 2xl:size-72">
            <Image
              src="/images/lp/DiscountImage.png"
              alt="Discount"
              width={300}
              height={300}
              className="absolute inset-0 scale-150 opacity-30 blur-3xl"
            />

            <Image
              src="/images/lp/DiscountImage.png"
              alt="Discount"
              width={300}
              height={300}
              className="absolute inset-0"
            />
          </div>
          <p className="text-sm opacity-80 lg:text-base">
            Offer Deals, and Discounts
          </p>
        </div>

        <div className="size-10 self-start sm:size-20 md:size-24 lg:size-28 xl:size-32 2xl:size-40">
          <Image src="/images/ArrowRight.png" alt="" width={161} height={108} />
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <div className="relative size-20 md:size-28 lg:size-52 2xl:size-72">
            <Image
              src="/images/lp/DartsImage.png"
              alt="Darts"
              width={300}
              height={300}
              className="absolute inset-0 scale-150 opacity-30 blur-3xl"
            />

            <Image
              src="/images/lp/DartsImage.png"
              alt="Darts"
              width={300}
              height={300}
              className="absolute inset-0"
            />
          </div>
          <p className="text-sm opacity-80 lg:text-base">Grow Your Business</p>
        </div>

        <div
          className="size-10 sm:size-20 md:size-24 lg:size-28 xl:size-32 2xl:size-40"
          style={{
            transform: "rotateX(180deg) scale(0.75)",
          }}
        >
          <Image src="/images/ArrowRight.png" alt="" width={161} height={108} />
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <div className="relative size-20 md:size-28 lg:size-52 2xl:size-72">
            <Image
              src="/images/lp/HeartImage.png"
              alt="Heart"
              width={300}
              height={300}
              className="absolute inset-0 scale-150 opacity-30 blur-3xl"
            />

            <Image
              src="/images/lp/HeartImage.png"
              alt="Heart"
              width={300}
              height={300}
              className="absolute inset-0"
            />
          </div>
          <p className="text-sm opacity-80 lg:text-base">
            Earn Royalty, and Traffic!
          </p>
        </div>
      </div>
    </section>
  );
}

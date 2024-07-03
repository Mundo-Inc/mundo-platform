import Image from "next/image";

import AddStarIcon from "@icons/AddStarIcon";
import AddUserIcon from "@icons/AddUserIcon";
import DiscountIcon from "@icons/DiscountIcon";
import GiftIcon from "@icons/GiftIcon";

export default function SecondBlade() {
  return (
    <section className="wrapper grid min-h-dvh grid-cols-12 items-center">
      <ul className="col-span-4 flex flex-col items-start gap-y-10">
        <ListItem
          icon={<AddUserIcon className="size-6" />}
          title="Connect With Your Friends"
          description="Explore where is the most favorite places in your friend circle."
        />
        <ListItem
          icon={<GiftIcon className="size-6" />}
          title="Earn Rewards Through Check-ins"
          description="Earn rewards as you eat and share the moments with others."
        />
        <ListItem
          icon={<AddStarIcon className="size-6" />}
          title="Add Reviews"
          description="Add reviews and let others know what you think about the place."
        />
        <ListItem
          icon={<DiscountIcon className="size-6" />}
          title="Redeem Deals"
          description="Spend your points that you gathered to unlock deals and coupons. Save your money with Mundo!"
        />
      </ul>
      <div
        className="relative col-span-8 flex h-full items-center justify-center gap-4"
        style={{
          transform: "rotate3d(1.2, 0.6, -1, 70deg)",
        }}
      >
        <SCImage src="/images/lp/SC1.jpg" alt="" />
        <div className="flex flex-col gap-4">
          <SCImage src="/images/lp/SC2.jpg" alt="" />
          <SCImage src="/images/lp/SC3.jpg" alt="" />
        </div>
        <SCImage src="/images/lp/SC4.jpg" alt="" />
      </div>
    </section>
  );
}

function SCImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="rounded-3xl border-2 p-3"
      style={{
        borderColor: "#B6C4DF88",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={434}
        className="rounded-2xl border border-white"
        style={{
          transform: "translate3d(5px, -4px, 10px)",
        }}
      />
    </div>
  );
}

function ListItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-x-4">
      <div className="border-accent text-accent flex size-12 flex-shrink-0 items-center justify-center rounded-full border-2">
        {icon}
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-bold opacity-70">{title}</h2>
        <p className="opacity-30">{description}</p>
      </div>
    </li>
  );
}

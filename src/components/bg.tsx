export default function Bg() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div
        aria-hidden="true"
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

      <div className="absolute inset-0 h-full w-full bg-accent/50" />
    </div>
  );
}

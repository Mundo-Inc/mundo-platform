import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mundo",
    short_name: "Mundo",
    description: "See Who's Eating Without You!",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#9467F0",
    icons: [
      {
        src: "/images/icons/Icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/images/icons/Icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

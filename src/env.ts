import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },

  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_APPLE_APP_ID: z.string(),
    NEXT_PUBLIC_APPSTORE_LINK: z.string().url(),

    // Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APPLE_APP_ID: process.env.NEXT_PUBLIC_APPLE_APP_ID,
    NEXT_PUBLIC_APPSTORE_LINK: process.env.NEXT_PUBLIC_APPSTORE_LINK,

    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },

  emptyStringAsUndefined: true,
});

export default env;

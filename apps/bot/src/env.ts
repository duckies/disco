import { z } from "zod";

const envSchema = z.object({
  DISCORD: z.object({
    BOT_TOKEN: z.string(),
  }),
});

export const env = envSchema.parse({
  DISCORD: {
    BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  },
});

import { z } from "zod";

const envSchema = z.object({
  DISCORD: z.object({
    BOT_TOKEN: z.string(),
  }),
  GUILD: z.object({
    CHANNELS: z.object({
      NOTIFICATIONS: z.string().optional(),
      ON_MESSAGE_REMOVE: z.string().optional(),
    }),
    ID: z.string(),
    MESSAGE_CACHE: z.string().array().optional(),
  }),
});

export const env = envSchema.parse({
  DISCORD: {
    BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  },
  GUILD: {
    CHANNELS: {
      NOTIFICATIONS: process.env.GUILD_CHANNELS_NOTIFICATIONS,
      ON_MESSAGE_REMOVE: process.env.GUILD_CHANNELS_ON_MESSAGE_REMOVE,
    },
    ID: process.env.GUILD_ID,
    MESSAGE_CACHE: process.env.GUILD_CHANNELS_MESSAGE_CACHE?.split(","),
  },
});

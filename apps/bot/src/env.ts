import { z } from "zod";

const envSchema = z.object({
  DISCORD: z.object({
    BOT_TOKEN: z.string(),
  }),
  GUILD: z.object({
    ID: z.string(),
    MESSAGE_CACHE: z.string().array().optional(),
    CHANNELS: z.object({
      ON_MESSAGE_REMOVE: z.string().optional()
    })
  })
});

export const env = envSchema.parse({
  DISCORD: {
    BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  },
  GUILD: {
    ID: process.env.GUILD_ID,
    MESSAGE_CACHE: process.env.GUILD_CHANNELS_MESSAGE_CACHE?.split(','),
    CHANNELS: {
      ON_MESSAGE_REMOVE: process.env.GUILD_CHANNELS_ON_MESSAGE_REMOVE
    }
  }
});

import { z } from "zod";

const envSchema = z.object({
  DISCORD: z.object({
    BOT_TOKEN: z.string(),
  }),
  GUILD: z.object({
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
    CHANNELS: {
      ON_MESSAGE_REMOVE: process.env.GUILD_CHANNELS_ON_MESSAGE_REMOVE
    }
  }
});

import { defineEnv } from "utils/define-env";
import { z } from "zod";

export const env = defineEnv({
  DISCORD_BOT_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_GUILD_ID: z.string(),
});

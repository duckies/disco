import { defineEnv } from "utils/define-env";
import { z } from "zod";

export const env = defineEnv({
  DISCORD_BOT_TOKEN: z.string(),
});

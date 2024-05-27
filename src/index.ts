import { Client } from "client";
import { env } from "env";

export const Discord = new Client({
  intents: ["Guilds", "GuildMessages"],
});

await Discord.login(env.DISCORD_BOT_TOKEN);
import { Client } from "@repo/disco";
import { commands } from "./commands";

export const client = new Client({
  intents: ["Guilds"],
  commander: {
    commands: commands,
  },
});

async function bootstrap() {
  client.on("ready", (c) => console.log(`🎉 Logged in as ${c.user.tag}`));

  await client.login(process.env.DISCORD_BOT_TOKEN);
}

void bootstrap();

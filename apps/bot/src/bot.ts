import { client } from "./client";
import { env } from "./env";

async function bootstrap() {
  client.on("ready", (c) => console.log(`🎉 Logged in as ${c.user.tag}`));

  // Print commands.
  // console.log(JSON.stringify(client.commands, null, 2))

  await client.login(env.DISCORD.BOT_TOKEN);
}

void bootstrap();

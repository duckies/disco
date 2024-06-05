import { Client } from "../src/client";

const client = new Client({
  intents: ["Guilds"],
});

client.on("ready", (c) => console.log(`🎉 Logged in as ${c.user.tag}`));

void client.login(process.env.DISCORD_BOT_TOKEN);

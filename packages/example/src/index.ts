import { Client } from "@duckies/discord";

const client = new Client({
  intents: ["Guilds"]
})

client.once("ready", (c) => console.log(`🎉 Bot logged in as ${c.user.tag}.`))

client.login(process.env.DISCORD_BOT_TOKEN)
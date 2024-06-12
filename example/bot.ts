import { Client } from "../src/client";
import Info from "./commands/info";
import Ping from "./commands/ping";

const client = new Client({
  intents: ["Guilds"],
  commander: {
    commands: [Ping, Info],
  },
});

// Uncomment to sync bot commands.
// await import("../src/scripts/sync").then(async ({ syncCommands }) => {
//   await syncCommands(Array.from(client.commander.commands.values()));
// });

// console.log(
//   JSON.stringify(Array.from(client.commander.commands.entries()), null, 2)
// );

client.on("ready", (c) => console.log(`🎉 Logged in as ${c.user.tag}`));

void client.login(process.env.DISCORD_BOT_TOKEN);

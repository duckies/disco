import { DiscordClient } from "client";
import { ApplicationCommandOptionType } from "types";

export const Discord = new DiscordClient({
  intents: ["Guilds", "GuildMessages"],
});

export const testCommand = Discord.defineCommand({
  name: "example",
  description: "Example command",
  options: [
    {
      name: "first",
      description: "whatever",
      type: ApplicationCommandOptionType.Boolean,
      required: true,
    },
  ],
  handler: (ctx) => {
    ctx.params;
  },
});

console.log(testCommand);

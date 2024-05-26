import { DiscordClient } from "client";
import { ApplicationCommandOptionType } from "types";

export const Discord = new DiscordClient({
  intents: ["Guilds", "GuildMessages"],
});

Discord.defineRootCommand({
  name: "example",
  description: "Example command",
  options: [
    {
      name: "subcommand",
      description: "Subcommand",
      type: ApplicationCommandOptionType.Channel,
    },
  ],
  handler: (ctx) => {
    ctx.params;
  },
});

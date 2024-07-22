import { defineCommand, defineOption, defineSubcommand } from "@repo/disco";

export const WarcraftLogsGetLogsCommand = defineSubcommand({
  name: "logs",
  description: "Get the latest logs for the guild.",
  options: {
    first: defineOption("user", { name: "first", description: "first option" }),
    second: defineOption("user", { name: "second", description: "second option" })
  },
  handler: async (ctx) => {
    await ctx.interaction.reply("Hello, World!");
  },
});

export const WarcraftLogsCommand = defineCommand({
  name: "wcl",
  options: [WarcraftLogsGetLogsCommand],
  description: "WarcraftLogs sniffer.",
});
import { defineCommand, defineOption, defineSubcommand } from "@repo/disco";

export const WarcraftLogsGetLogsCommand = defineSubcommand({
  description: "Get the latest logs for the guild.",
  handler: async (ctx) => {
    await ctx.interaction.reply("Hello, World!");
  },
  name: "logs",
  options: {
    first: defineOption("user", { description: "first option", name: "first" }),
    second: defineOption("user", { description: "second option", name: "second" }),
  },
});

export const WarcraftLogsCommand = defineCommand({
  description: "WarcraftLogs sniffer.",
  name: "wcl",
  options: [WarcraftLogsGetLogsCommand],
});

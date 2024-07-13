import { defineCommand, defineSubcommand } from "@repo/disco";

export const WarcraftLogsCommand = defineCommand({
  name: "wcl",
  description: "WarcraftLogs sniffer.",
});

export const WarcraftLogsGetLogsCommand = defineSubcommand({
  name: "logs",
  description: "Get the latest logs for the guild.",
  options: {},
  handler: async (ctx) => {
    await ctx.interaction.reply("Hello, World!");
  },
});

WarcraftLogsCommand.options.add(WarcraftLogsGetLogsCommand);

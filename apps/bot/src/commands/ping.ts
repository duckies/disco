import { defineCommand } from "@repo/disco";

export const PingCommand = defineCommand({
  description: "A simple, example command",
  handler: async (ctx) => {
    const ms = Date.now() - ctx.interaction.createdAt.getTime();
    await ctx.interaction.reply(`Pong! (${ms}ms)`);
  },
  name: "ping",
});

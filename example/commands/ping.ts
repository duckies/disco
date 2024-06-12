import { defineCommand } from "../../src";

export default defineCommand({
  name: "ping",
  description: "A simple, example command",
  handler: async (ctx) => {
    const ms = Date.now() - ctx.interaction.createdAt.getTime();
    await ctx.interaction.reply(`Pong! (${ms}ms)`);
  },
});

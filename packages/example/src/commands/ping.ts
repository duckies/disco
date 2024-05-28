import { defineCommand } from "@duckies/discord"

export default defineCommand({
  name: "ping",
  description: "An example command!",
  handler: async (ctx) => {
    await ctx.interaction.reply({
      content: `Pong! ${ctx.interaction.client.ws.ping}ms`,
      ephemeral: true
    })
  }
})

import { defineCommand, defineOption } from "utils";

export default defineCommand({
  name: "test",
  description: "Test command",
  options: {
    example: defineOption("boolean", { name: "example", description: "Example", required: true }),
  },
  handler: async (ctx) => {
    ctx.params.example;
    await ctx.interaction.reply("Test command");
  },
})

const thing = "hello";

export {
  thing,
}
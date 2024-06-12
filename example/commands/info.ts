import { defineCommand, defineOption } from "../../src";

export default defineCommand({
  name: "info",
  description: "Information about the guild and its members",
})
  .addSubCommand({
    name: "guild",
    description: "Displays information about the guild",
    handler: async (ctx) => {
      if (!ctx.interaction.guild) {
        await ctx.interaction.reply({
          content: "This command can only be used in a guild",
          ephemeral: true,
        });

        return;
      }

      await ctx.interaction.reply({
        embeds: [
          {
            title: ctx.interaction.guild.name,
            description: ctx.interaction.guild.description ?? undefined,
            fields: [
              {
                name: "Members",
                value: `${ctx.interaction.guild.memberCount} members`,
              },
            ],
          },
        ],
      });
    },
  })
  .addSubCommand({
    name: "user",
    description: "Displays information about a user",
    options: {
      user: defineOption("user", {
        name: "user",
        description: "The user to display information about",
        required: true,
      }),
    },
    handler: async (ctx) => {
      const user = ctx.params.user;

      console.log(JSON.stringify({ params: ctx.params }, null, 2));

      await ctx.interaction.reply({
        embeds: [
          {
            title: user.tag,
            fields: [
              {
                name: "ID",
                value: user.id,
              },
              {
                name: "Created At",
                value: user.createdAt.toUTCString(),
              },
            ],
          },
        ],
      });
    },
  })
  .addSubCommandGroup(
    {
      name: "list",
      description: "Lists entities in the guild",
    },
    (group) =>
      group.addSubCommand({
        name: "roles",
        description: "Lists guild roles",
        options: {
          limit: defineOption("integer", {
            name: "limit",
            description: "The number of roles to list",
            min_value: 1,
            max_value: 25,
          }),
        },
        handler: async (ctx) => {
          if (!ctx.interaction.guild) {
            await ctx.interaction.reply({
              content: "This command can only be used in a guild",
              ephemeral: true,
            });

            return;
          }

          const limit = ctx.params.limit ?? 10;

          const roles = ctx.interaction.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .first(limit);

          await ctx.interaction.reply({
            content: `The top ${limit} roles in the guild are ${roles
              .map((r) => r.toString())
              .join(", ")}`,
            ephemeral: true,
          });
        },
      })
  );

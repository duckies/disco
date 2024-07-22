import { defineCommand, defineSubcommand } from "@repo/disco";

export const AttendancePostCommand = defineSubcommand({
  name: "post",
  description: "Post attendance information.",
  handler: async (ctx) => {
    await ctx.interaction.reply({
      embeds: [{
        title: "Attendance",
        fields: [
          {
            name: "Instructions",
            value: "Use this channel to post when you know you will be unavailable for raid. You may alternatively message an officer if you wish to keep your reasons private, but make sure they confirm they have received your message. Raiders are expected to give us notice if they will be absent with reasonable notice, emergencies are the exception."
          },
        ]
      }]
    })
  }
});

export const AttendanceCommand = defineCommand({
  name: "attendance",
  options: [AttendancePostCommand],
  description: "Attendance management",
});

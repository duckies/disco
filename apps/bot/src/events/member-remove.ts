import type { APIEmbed } from "discord.js";

import { defineEventListener } from "@repo/disco";

import { COLORS } from "../constants";
import { env } from "../env";

export const onMemberRemove = defineEventListener({
  event: "guildMemberRemove",
  listener: async (member) => {
    if (!env.GUILD.CHANNELS.NOTIFICATIONS) return;

    const channel = member.guild.channels.cache.get(env.GUILD.CHANNELS.NOTIFICATIONS);

    if (!channel) {
      console.warn("No notification channel found for member removal.");
      return;
    }
    else if (!channel.isTextBased()) {
      console.warn("Notification channel is not text-based.");
      return;
    }

    const embed = {
      color: COLORS.VIVA_MAGENTA,
      fields: [
        { inline: true, name: "User", value: member.user.toString() },
        { inline: true, name: "Username", value: member.user.username },
        { inline: true, name: "Roles", value: member.roles.cache.map(r => r.toString()).join(", ") },
      ],
      timestamp: new Date().toISOString(),
      title: "Member Left",
    } satisfies APIEmbed;

    await channel.send({ embeds: [embed] });
  },
});

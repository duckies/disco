import { defineEventListener } from "@repo/disco";
import type { APIEmbed, APIEmbedField } from "discord.js";
import { COLORS } from "../constants";
import { env } from "../env";

export const onMessageDelete = defineEventListener({
  event: "messageDelete",
  listener: async (message) => {
    if (!message.inGuild() || message.partial) return;
    if (!env.GUILD.CHANNELS.ON_MESSAGE_REMOVE) return;

    const channel = message.guild.channels.cache.get(env.GUILD.CHANNELS.ON_MESSAGE_REMOVE);

    if (!channel?.isTextBased()) return;

    // Attachments are immediately unavailable, so a message with only attachments has no loggable content.
    if (!message.content && !message.embeds.length) return;

    const embed = {
      title: "Message Deleted",
      color: COLORS.PEACH_FUZZ,
      timestamp: new Date().toISOString(),
      fields: [
        { name: "Author", value: message.author?.toString() ?? "Unknown", inline: true },
        { name: "Channel", value: message.channel.toString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:f>`, inline: true }
      ] as APIEmbedField[],
    } satisfies APIEmbed

    if (message.content) {
      embed.fields.push({
        name: "Message Content",
        value: message.content
      })
    }

    if (message.embeds.length) {
      embed.fields?.push({
        name: "Embeds Attached",
        value: `Deleted message embeds are attached below.${message.embeds.length > 4 ? "\nTruncated to the first four." : ""}`
      })
    }

    await channel.send({
      embeds: [embed, ...message.embeds.slice(0, 4)],
      // Debug: Send the payload as an attachment.
      // files: [{
      //   name: "message.json",
      //   attachment: Readable.from([JSON.stringify({...message, partial: message.partial}, null, 2)])
      // }]
    })
  }
})
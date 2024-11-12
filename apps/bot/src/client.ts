import { Client } from "@repo/disco";
import { Partials } from "discord.js";
import { PingCommand } from "./commands/ping";
import { WarcraftLogsCommand } from "./commands/warcraftlogs/wcl";
import { onMessageDelete } from "./events/message-remove";
import { onMemberRemove } from "./events/member-remove";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
  partials: [Partials.Message],
  commander: {
    commands: [PingCommand, WarcraftLogsCommand],
  },
  listeners: [onMessageDelete, onMemberRemove]
});
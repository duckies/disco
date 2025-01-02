import { Client } from "@repo/disco";
import { Partials } from "discord.js";

import { PingCommand } from "./commands/ping";
import { onMemberRemove } from "./events/member-remove";
// import { WarcraftLogsCommand } from "./commands/warcraftlogs/wcl";
import { onMessageDelete } from "./events/message-remove";

export const client = new Client({
  commander: {
    commands: [PingCommand],
  },
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildVoiceStates",
    "GuildMembers",
  ],
  listeners: [onMessageDelete, onMemberRemove],
  partials: [Partials.Message, Partials.GuildMember],
});

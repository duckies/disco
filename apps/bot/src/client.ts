import { Client, Partials } from "@repo/disco";
import { PingCommand } from "./commands/ping";
import { WarcraftLogsCommand } from "./commands/warcraftlogs/wcl";
import { onMessageDelete } from "./events/message-remove";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
  partials: [Partials.Message],
  commander: {
    commands: [PingCommand, WarcraftLogsCommand],
  },
  listeners: [onMessageDelete]
});
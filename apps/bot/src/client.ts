import { Client } from "@repo/disco";
import { PingCommand } from "./commands/ping";
import { WarcraftLogsCommand } from "./commands/warcraftlogs/wcl";

export const client = new Client({
  intents: ["Guilds"],
  commander: {
    commands: [PingCommand, WarcraftLogsCommand],
  },
});
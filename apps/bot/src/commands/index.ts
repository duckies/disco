import type { ChatInputCommand } from "@repo/disco";
import { PingCommand } from "./ping.ts";
import { WarcraftLogsCommand } from "./warcraftlogs/wcl.ts";

export const commands: ChatInputCommand[] = [PingCommand, WarcraftLogsCommand];

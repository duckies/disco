import { syncCommands } from "@repo/disco";
import { client } from "../client";

await syncCommands([...client.commander.commands.values()]);
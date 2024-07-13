import { commands } from "../commands";

await import("@repo/disco").then(async ({ syncCommands }) => {
  await syncCommands(commands);
});

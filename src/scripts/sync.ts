import { join } from "node:path"
import { Glob } from "bun";
import { ApplicationChatInputCommand } from "builders/application-chat-input-command";
import { REST, Routes } from "discord.js";
import { env } from "env";

async function getCommands() {
  const glob = new Glob("**/*.{ts,js}");
  const commands = new Map<string, ApplicationChatInputCommand<any>>();

  for await (const filePath of glob.scan({
    cwd: join(process.cwd(), "./src/commands"),
    absolute: true,
  })) {
    const file = await import(filePath) as { default?: unknown } 
    const command = file?.default instanceof ApplicationChatInputCommand ? file?.default : null;

    if (command) {
      if (commands.has(command.name)) {
        throw new Error(`Command with name ${command.name} already exists`);
      }

      commands.set(command.name, command);
    }
  }

  return commands;
}

void (async () => {
  const commands = await getCommands();
  const json = Array.from(commands.values()).map((command) => command.toJSON());

  const rest = new REST().setToken(env.DISCORD_BOT_TOKEN);
  
  try {
    const resp = await rest.put(Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_GUILD_ID), { body: json });

    console.log(resp)
  }catch (error) {
    console.error(error);
  }
})();

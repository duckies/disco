import { REST, Routes } from "discord.js";
import type { ChatInputCommand } from "../builders/chat-input-command";

export async function syncCommands(commands: ChatInputCommand[]) {
  if (
    !process.env.DISCORD_BOT_TOKEN ||
    !process.env.DISCORD_CLIENT_ID ||
    !process.env.DISCORD_GUILD_ID
  ) {
    throw new Error(
      "DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID is not defined in the environment variables"
    );
  }

  const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

  try {
    const response = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands.map((command) => command.toJSON()) }
    );
    console.log(
      `✔️ Successfully registered application commands: ${JSON.stringify(
        response
      )}`
    );
  } catch (error) {
    console.error(error);
  }
}

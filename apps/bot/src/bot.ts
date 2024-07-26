import { client } from "./client";
import { env } from "./env";

async function bootstrap() {
  client.on("ready", (c) => console.log(`🎉 Logged in as ${c.user.tag}`));

  // Print commands.
  // console.log(JSON.stringify(client.commands, null, 2))

  /**
   * Precache messages we want to be available for logging deleted messages.
   */
  if (env.GUILD.MESSAGE_CACHE) {
    client.once("ready", (client) => {
      
      const guild = client.guilds.cache.get(env.GUILD.ID);
      const channels = env.GUILD.MESSAGE_CACHE?.map(id => guild?.channels.cache.get(id));
      
      if (!channels?.length) return;
      
      for (const channel of channels) {
        if (!channel?.isTextBased()) return;

        void channel.messages.fetch({cache: true })
      }
    })
  }

  await client.login(env.DISCORD.BOT_TOKEN);
}

void bootstrap();

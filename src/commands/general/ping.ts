import { ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { Command } from "../../types/index.js";

export default {
  data: {
    name: "ping",
    description: "Replies with Pong!",
    contexts: [InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel],
    integration_types: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  },
  async execute(interaction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  },
} as const satisfies Command;

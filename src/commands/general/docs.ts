import {
  ApplicationCommandOptionType,
  ApplicationIntegrationType,
  InteractionContextType,
  blockQuote,
  bold,
  heading,
  inlineCode,
  underline,
} from "discord.js";
import type { Command } from "../../types/index.js";
import { getDocs, searchDocs } from "../../util/index.js";

export default {
  data: {
    name: "docs",
    description: "Searches the Rust documentation with the provided keyword.",
    options: [
      {
        name: "keyword",
        description: "The keyword to search for.",
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      },
      {
        name: "hide",
        description: "Whether to hide the command response (Default: False).",
        type: ApplicationCommandOptionType.Boolean,
      },
    ],
    contexts: [InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel],
    integration_types: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  },

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    const closestMatches = searchDocs(focusedValue);

    await interaction.respond(closestMatches.map(match => ({ name: match, value: match })).slice(0, 25));
  },

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const keyword = interaction.options.getString("keyword", true);
    const hide = interaction.options.getBoolean("hide") ?? false;

    const docs = getDocs(keyword);

    if (!docs) {
      await interaction.reply({ content: `No documentation found for \`${keyword}\`.`, ephemeral: hide });

      return;
    }

    const output = [
      heading(inlineCode(docs.name)),
      `${bold("Visibility")}: ${underline(docs.visibility)}`,
      "",
      blockQuote(docs.docs),
    ];

    await interaction.reply({
      content: output.join("\n"),
      ephemeral: hide,
    });
  },
} as const satisfies Command;

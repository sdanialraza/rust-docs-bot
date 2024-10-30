import { Events, type AutocompleteInteraction, type CommandInteraction } from "discord.js";
import type { Event } from "../../types/index.js";

export async function handleAutocompleteInteraction(interaction: AutocompleteInteraction): Promise<void> {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`The command ${interaction.commandName} is not loaded but was used.`);

    return;
  }

  try {
    await command.autocomplete(interaction);
  } catch (error) {
    console.error(error);
  }
}

export async function handleCommandInteraction(interaction: CommandInteraction): Promise<void> {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.warn(`The command ${interaction.commandName} is not loaded but was used.`);

    await interaction.reply({
      content: "Invalid command, this wasn't supposed to happen.",
      ephemeral: true,
    });

    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    await interaction.reply({
      content: "An unknown error occurred, please try again later.",
      ephemeral: true,
    });
  }
}

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isAutocomplete()) {
      await handleAutocompleteInteraction(interaction);
    } else if (interaction.isCommand()) {
      await handleCommandInteraction(interaction);
    }
  },
} as const satisfies Event<Events.InteractionCreate>;

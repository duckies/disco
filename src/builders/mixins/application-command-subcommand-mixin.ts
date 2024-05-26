import {
  ApplicationCommandSubCommandOption,
  type ApplicationCommandSubCommandOptionOptions,
} from "builders/options/application-command-subcommand-option";
import type {
  ApplicationCommandOption,
  ApplicationCommandSimpleOptionAPI,
} from "types";

export class ApplicationCommandOptionSubCommandMixin {
  public readonly options!: Map<string, ApplicationCommandOption>;

  public addSubCommand<
    const T extends ApplicationCommandSimpleOptionAPI[] = []
  >(
    options: ApplicationCommandSubCommandOptionOptions<T>,
    callback?: (
      subCommand: ApplicationCommandSubCommandOption<T>
    ) => ApplicationCommandSubCommandOption<T>
  ) {
    const option = new ApplicationCommandSubCommandOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }
}

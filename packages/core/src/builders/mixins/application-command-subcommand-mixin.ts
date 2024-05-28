import type {
  ApplicationCommandOption,
  Params
} from "types";
import {
  ApplicationCommandSubCommandOption,
  type ApplicationCommandSubCommandOptionOptions,
} from "../options/application-command-subcommand-option";

export class ApplicationCommandOptionSubCommandMixin {
  public readonly options!: Map<string, ApplicationCommandOption>;

  public addSubCommand<
    const P extends Params
  >(
    options: ApplicationCommandSubCommandOptionOptions<P>,
    callback?: (
      subCommand: ApplicationCommandSubCommandOption<P>
    ) => ApplicationCommandSubCommandOption<P>
  ) {
    const option = new ApplicationCommandSubCommandOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }
}

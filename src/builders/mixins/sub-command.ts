import type { ApplicationCommandOption } from "builders/command-option";
import { SubCommandOption } from "builders/options/sub-command";
import type {
  ApplicationCommandSimpleOptionAPI,
  SubCommandOptionAPI,
} from "types";

export abstract class SubCommandMixin {
  public readonly options!: Map<string, ApplicationCommandOption>;

  public addSubCommand<
    const Q extends ApplicationCommandSimpleOptionAPI[] = []
  >(
    options: Omit<SubCommandOptionAPI<Q>, "type">,
    callback?: (subCommand: SubCommandOption<Q>) => SubCommandOption<Q>
  ) {
    const option = new SubCommandOption(options);

    this.options.set(option.name, option);

    callback?.(option);

    return this;
  }
}

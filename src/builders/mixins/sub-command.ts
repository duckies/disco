import type { ApplicationCommandOption } from "builders/command-option";
import { SubCommandOption } from "builders/options/sub-command";
import type {
  ApplicationCommandSimpleOptionAPI,
  Handler,
  SubCommandOptionAPI,
} from "types";

export abstract class SubCommandMixin<T extends SubCommandMixin<T>> {
  public readonly options!: Map<string, ApplicationCommandOption>;

  public addSubCommand<
    const Q extends ApplicationCommandSimpleOptionAPI[] = []
  >(options: Omit<SubCommandOptionAPI<Q>, "type">, handler: Handler<Q>): T {
    const option = new SubCommandOption(options, handler);

    this.options.set(option.name, option);

    return this as unknown as T;
  }
}

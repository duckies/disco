import type { ApplicationCommandOptionType } from "discord.js";
import { CommandOptionConflictError, CommandOptionNotFoundError, type Option } from "../..";

export abstract class OptionsMixin<T extends Option> {
  public abstract readonly options: Map<string, T>;

  // TODO: Throw an error on an invalid combination of options.
  public getOption(name: string, type?: ApplicationCommandOptionType): T {
    const option = this.options.get(name);

    if (!option) {
      throw new CommandOptionNotFoundError(name);
    }

    if (type && option.type !== type) {
      throw new CommandOptionConflictError(name);
    }

    return option;
  }

  public addOption(option: T) {
    if (this.options.has(option.name)) {
      throw new CommandOptionConflictError(option.name);
    }

    this.options.set(option.name, option);
  }

  public abstract toString(): string;
}
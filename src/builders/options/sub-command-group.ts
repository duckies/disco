import { ApplicationCommandOption } from "builders/command-option";
import {
  ApplicationCommandOptionType,
  type SubCommandGroupOptionAPI,
  type SubCommandOptionAPI,
} from "types";
import { SubCommandOption } from "./sub-command";

export class SubCommandGroupOption extends ApplicationCommandOption {
  public readonly options = new Map<string, SubCommandOption<any>>();

  constructor(options: Omit<SubCommandGroupOptionAPI, "type" | "options">) {
    super({
      type: ApplicationCommandOptionType.SubCommandGroup,
      name: options.name,
      description: options.description,
    });
  }

  public addSubCommand(
    options: Omit<SubCommandOptionAPI, "type">,
    handler: (...args: unknown[]) => unknown
  ): this {
    const option = new SubCommandOption(options, handler);

    this.options.set(option.name, option);

    return this;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

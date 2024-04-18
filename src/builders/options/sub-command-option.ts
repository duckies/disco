import { ApplicationCommandOption } from "builders/command-option";
import { ApplicationCommandOptionType, type SubCommandOptionAPI } from "types";

export class SubCommandOption extends ApplicationCommandOption {
  public options = new Map<string, ApplicationCommandOption>();
  public handler?: (...args: unknown[]) => unknown;

  constructor(
    options: Omit<SubCommandOptionAPI, "type">,
    handler: (...args: unknown[]) => unknown
  ) {
    super({
      type: ApplicationCommandOptionType.SubCommand,
      name: options.name,
      description: options.description,
    });

    for (const option of options.options ?? []) {
      const instance = new ApplicationCommandOption(option);
      this.options.set(option.name, instance);
    }

    this.handler = handler;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

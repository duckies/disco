import { ApplicationCommandOption } from "builders/command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandSimpleOptionAPI,
  type SubCommandOptionAPI,
} from "types";
import type { Handler } from "types/handler";

export class SubCommandOption<
  const T extends ApplicationCommandSimpleOptionAPI[]
> extends ApplicationCommandOption {
  public options = new Map<string, ApplicationCommandOption>();
  public handler?: Handler<T>;

  constructor(
    options: Omit<SubCommandOptionAPI<T>, "type">,
    handler: Handler<T>
  ) {
    super({
      type: ApplicationCommandOptionType.SubCommand,
      name: options.name,
      description: options.description,
      options: options.options,
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

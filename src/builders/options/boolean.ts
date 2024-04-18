import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type BooleanOptionAPI } from "types";

export class BooleanCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<BooleanOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.Boolean, ...options });
  }
}

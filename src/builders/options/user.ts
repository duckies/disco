import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type UserOptionAPI } from "types";

export class UserCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<UserOptionAPI, "type">) {
    super({ type: ApplicationCommandOptionType.User, ...options });
  }
}

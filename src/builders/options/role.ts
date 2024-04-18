import { ApplicationCommandSimpleOption } from "builders/command-option";
import { ApplicationCommandOptionType, type RoleOptionAPI } from "types";

export class RoleCommandOption extends ApplicationCommandSimpleOption {
  constructor(options: Omit<RoleOptionAPI, "type">) {
    super({
      type: ApplicationCommandOptionType.Role,
      ...options,
    });
  }
}

import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "builders/application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandSimpleOptionAPI,
  type Handler,
} from "types";

export interface ApplicationCommandSubCommandOptionAPI
  extends ApplicationCommandOptionAPIBase {
  type: ApplicationCommandOptionType.SubCommand;
  options?: ApplicationCommandSimpleOptionAPI[];
}

export interface ApplicationCommandSubCommandOptionOptions<
  T extends ApplicationCommandSimpleOptionAPI[]
> extends Omit<ApplicationCommandSubCommandOptionAPI, "type" | "options"> {
  options?: T;
  handler?: Handler<T>;
}

export class ApplicationCommandSubCommandOption<
  const T extends ApplicationCommandSimpleOptionAPI[]
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.SubCommand;
  public readonly handler?: Handler<T>;

  constructor(options: ApplicationCommandSubCommandOptionOptions<T>) {
    super({ type: ApplicationCommandOptionType.SubCommand, ...options });
  }
}

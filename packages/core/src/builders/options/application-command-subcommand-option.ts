import {
  ApplicationCommandOptionType,
  type ApplicationCommandSimpleOption,
  type ApplicationCommandSimpleOptionAPI,
  type Handler,
  type Params,
} from "types";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";

export interface ApplicationCommandSubCommandOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.SubCommand> {
  type: ApplicationCommandOptionType.SubCommand;
  options?: ApplicationCommandSimpleOptionAPI[];
}

export interface ApplicationCommandSubCommandOptionOptions<
  P extends Params
> extends Omit<ApplicationCommandSubCommandOptionAPI, "type" | "options"> {
  options?: P;
  handler?: Handler<P>;
}

export class ApplicationCommandSubCommandOption<
  const T extends Record<string, ApplicationCommandSimpleOption>
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.SubCommand> {
  public readonly type = ApplicationCommandOptionType.SubCommand;
  public readonly handler?: Handler<T>;
  public readonly options = new Map<string, ApplicationCommandSimpleOption>();

  constructor({ name, description, handler, options }: ApplicationCommandSubCommandOptionOptions<T>) {
    super({ type: ApplicationCommandOptionType.SubCommand, name, description });
    
    this.handler = handler;

      for (const [name, option] of Object.entries(options ?? {})) {
        if (this.options.has(name)) {
          throw new Error(`Option with name ${name} already exists`);
        }
  
        this.options.set(name, option);
      }
  }

  public toJSON(): ApplicationCommandSubCommandOptionAPI {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((o) => o.toJSON())
    }
  }
}

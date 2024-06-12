import {
  ApplicationCommandOptionType,
  type Handler,
  type NonPartial,
  type Params,
  type SimpleOption,
  type SimpleOptionAPI,
} from "../../types";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";

export interface SubcommandOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Subcommand> {
  type: ApplicationCommandOptionType.Subcommand;
  options?: SimpleOptionAPI[];
}

export interface SubcommandOptionOptions<P extends Params>
  extends Omit<SubcommandOptionAPI, "type" | "options"> {
  options?: P;
  handler?: Handler<P>;
}

export class SubcommandOption<
  const P extends Params = any
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Subcommand;
  public readonly handler?: Handler<P>;
  public readonly options = new Map<string, SimpleOption>();

  constructor({
    name,
    description,
    handler,
    options,
  }: SubcommandOptionOptions<P>) {
    super({ name, description });

    this.handler = handler;

    for (const [name, option] of Object.entries(options ?? {})) {
      if (this.options.has(name)) {
        throw new Error(`Option with name ${name} already exists`);
      }

      this.options.set(name, option);
    }
  }

  public override toJSON(): NonPartial<SubcommandOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((o) => o.toJSON()),
    };
  }
}

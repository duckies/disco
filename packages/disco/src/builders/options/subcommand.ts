import {
  ApplicationCommandOptionType,
  type Handler,
  type NonPartial,
  type Params,
  type SimpleOption,
  type SimpleOptionAPI,
} from "../../types";
import { applyMixins } from "../../utils";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import { OptionsMixin } from "../mixins/options-mixin";

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

export interface SubcommandOption extends OptionsMixin<SimpleOption> {}

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

    Object.values(options ?? {}).forEach(o => this.addOption(o))
  }

  public override toJSON(): NonPartial<SubcommandOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((o) => o.toJSON()),
    };
  }

  public override toString() {
    return `SubcommandOption<${this.name}>`;
  }
}

applyMixins(SubcommandOption, [OptionsMixin]);
import { ApplicationCommandOptionType } from "discord.js";

import type {
  Handler,
  NonPartial,
  Params,
  SimpleOption,
  SimpleOptionAPI,
} from "../../types";

import { applyMixins } from "../../utils";
import {
  type ApplicationCommandOptionAPIBase,
  ApplicationCommandOptionBase,
} from "../command-option";
import { OptionsMixin } from "../mixins/options-mixin";

export interface SubcommandOption extends OptionsMixin<SimpleOption> {}

export interface SubcommandOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Subcommand> {
  options?: SimpleOptionAPI[];
  type: ApplicationCommandOptionType.Subcommand;
}

export interface SubcommandOptionOptions<P extends Params>
  extends Omit<SubcommandOptionAPI, "options" | "type"> {
  handler?: Handler<P>;
  options?: P;
}

export class SubcommandOption<
  const P extends Params = any,
> extends ApplicationCommandOptionBase {
  public readonly handler?: Handler<P>;
  public readonly options = new Map<string, SimpleOption>();
  public readonly type = ApplicationCommandOptionType.Subcommand;

  constructor({
    description,
    handler,
    name,
    options,
  }: SubcommandOptionOptions<P>) {
    super({ description, name });

    this.handler = handler;

    for (const o of Object.values(options ?? {})) this.addOption(o);
  }

  public override toJSON(): NonPartial<SubcommandOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map(o => o.toJSON()),
    };
  }

  public override toString() {
    return `SubcommandOption<${this.name}>`;
  }
}

applyMixins(SubcommandOption, [OptionsMixin]);

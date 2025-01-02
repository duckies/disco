import { ApplicationCommandOptionType } from "discord.js";

import type { NonPartial } from "../../types";
import type { SubcommandOption, SubcommandOptionAPI } from "./subcommand";

import { applyMixins } from "../../utils";
import {
  type ApplicationCommandOptionAPIBase,
  ApplicationCommandOptionBase,
} from "../command-option";
import { OptionsMixin } from "../mixins/options-mixin";

export interface SubcommandGroupOption extends OptionsMixin<SubcommandOption> {}

export interface SubcommandGroupOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.SubcommandGroup> {
  options?: SubcommandOptionAPI[];
  type: ApplicationCommandOptionType.SubcommandGroup;
}

export interface SubcommandGroupOptionOptions
  extends Omit<SubcommandGroupOptionAPI, "options" | "type"> {}

export class SubcommandGroupOption extends ApplicationCommandOptionBase {
  public readonly options = new Map<string, SubcommandOption>();
  public readonly type = ApplicationCommandOptionType.SubcommandGroup;

  constructor({ description, name }: SubcommandGroupOptionOptions) {
    super({
      description,
      name,
    });
  }

  public override toJSON(): NonPartial<SubcommandGroupOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map(option => option.toJSON()),
    };
  }

  public override toString() {
    return `SubcommandGroupOption<${this.name}>`;
  }
}

applyMixins(SubcommandGroupOption, [OptionsMixin]);

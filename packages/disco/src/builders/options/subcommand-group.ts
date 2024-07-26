import { ApplicationCommandOptionType } from "discord.js";
import type { NonPartial } from "../../types";
import { applyMixins } from "../../utils";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import { OptionsMixin } from "../mixins/options-mixin";
import type { SubcommandOption, SubcommandOptionAPI } from "./subcommand";

export interface SubcommandGroupOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.SubcommandGroup> {
  type: ApplicationCommandOptionType.SubcommandGroup;
  options?: SubcommandOptionAPI[];
}

export interface SubcommandGroupOptionOptions
  extends Omit<SubcommandGroupOptionAPI, "type" | "options"> {}

export interface SubcommandGroupOption extends OptionsMixin<SubcommandOption> {}

export class SubcommandGroupOption extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.SubcommandGroup;
  public readonly options = new Map<string, SubcommandOption>();

  constructor({ name, description }: SubcommandGroupOptionOptions) {
    super({
      name,
      description,
    });
  }

  public override toJSON(): NonPartial<SubcommandGroupOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }

  public override toString() {
    return `SubcommandGroupOption<${this.name}>`
  }
}

applyMixins(SubcommandGroupOption, [OptionsMixin])
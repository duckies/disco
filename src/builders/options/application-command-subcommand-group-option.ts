import { ApplicationCommandOptionType, type NonPartial } from "../../types";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import { ApplicationCommandOptionSubCommandMixin } from "../mixins/application-command-subcommand-mixin";
import type {
  ApplicationCommandSubCommandOption,
  ApplicationCommandSubCommandOptionAPI,
} from "./application-command-subcommand-option";

export interface ApplicationCommandSubCommandGroupOptionAPI
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.SubCommandGroup> {
  type: ApplicationCommandOptionType.SubCommandGroup;
  options?: ApplicationCommandSubCommandOptionAPI[];
}

export interface ApplicationCommandSubCommandGroupOptionOptions
  extends Omit<
    ApplicationCommandSubCommandGroupOptionAPI,
    "type" | "options"
  > {}

export interface ApplicationCommandSubCommandGroupOption
  extends ApplicationCommandOptionSubCommandMixin {}

export class ApplicationCommandSubCommandGroupOption extends ApplicationCommandOptionBase<ApplicationCommandOptionType.SubCommandGroup> {
  public readonly options!: Map<
    string,
    ApplicationCommandSubCommandOption<any>
  >;

  constructor({
    name,
    description,
  }: ApplicationCommandSubCommandGroupOptionOptions) {
    super({
      type: ApplicationCommandOptionType.SubCommandGroup,
      name,
      description,
    });
  }

  public override toJSON(): NonPartial<ApplicationCommandSubCommandGroupOptionAPI> {
    return {
      ...super.toJSON(),
      options: [...this.options.values()].map((option) => option.toJSON()),
    };
  }
}

applyMixins(ApplicationCommandSubCommandGroupOption, [
  ApplicationCommandOptionSubCommandMixin,
]);

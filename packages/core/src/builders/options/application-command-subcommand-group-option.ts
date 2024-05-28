import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import { ApplicationCommandOptionSubCommandMixin } from "../mixins/application-command-subcommand-mixin";
import { ApplicationCommandOptionType } from "../../types";
import { applyMixins } from "../../utils/mixins";
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
  extends Omit<ApplicationCommandSubCommandGroupOptionAPI, "type"> {}

export interface ApplicationCommandSubCommandGroupOption
  extends ApplicationCommandOptionSubCommandMixin {}

export class ApplicationCommandSubCommandGroupOption extends ApplicationCommandOptionBase<ApplicationCommandOptionType.SubCommandGroup> {
  public readonly options!: Map<
    string,
    ApplicationCommandSubCommandOption<any>
  >;

  constructor(options: ApplicationCommandSubCommandGroupOptionOptions) {
    super({
      type: ApplicationCommandOptionType.SubCommandGroup,
      ...options,
    });
  }
}

applyMixins(ApplicationCommandSubCommandGroupOption, [
  ApplicationCommandOptionSubCommandMixin,
]);

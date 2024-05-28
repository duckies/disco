import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandMentionableOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Mentionable>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Mentionable;
}

export interface ApplicationCommandMentionableOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandMentionableOptionAPI<R>, "type"> {}

export class ApplicationCommandMentionableOption<R extends boolean = false> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Mentionable> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandMentionableOptionOptions<R>) {
    super({
      type: ApplicationCommandOptionType.Mentionable,
      name,
      description,
    });
    Object.assign(this, options);
  }
}

applyMixins(ApplicationCommandMentionableOption, [
  ApplicationCommandOptionRequiredMixin,
]);

import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandBooleanOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Boolean>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Boolean;
}

export interface ApplicationCommandBooleanOptionOptions<R extends boolean>
  extends Omit<ApplicationCommandBooleanOptionAPI<R>, "type"> {}

export interface ApplicationCommandBooleanOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandBooleanOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Boolean> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandBooleanOptionOptions<R>) {
    super({
      type: ApplicationCommandOptionType.Boolean,
      name,
      description,
    });

    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<ApplicationCommandBooleanOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(ApplicationCommandBooleanOption, [
  ApplicationCommandOptionRequiredMixin,
]);

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

export interface ApplicationCommandUserOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.User>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.User;
}

export type ApplicationCommandUserOptionOptions<R extends boolean> = Omit<
  ApplicationCommandUserOptionAPI<R>,
  "type"
>;

export interface ApplicationCommandUserOption<R extends boolean>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandUserOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.User> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandUserOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.User, name, description });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<ApplicationCommandUserOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(ApplicationCommandUserOption, [
  ApplicationCommandOptionRequiredMixin,
]);

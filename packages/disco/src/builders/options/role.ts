import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import { RequiredMixin } from "./mixins/required";

export interface RoleOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Role>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Role;
}

export interface RoleOptionOptions<R extends boolean>
  extends Omit<RoleOptionAPI<R>, "type"> {}

export interface RoleOption<R extends boolean> extends RequiredMixin<R> {}

export class RoleOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Role;

  constructor({ name, description, ...options }: RoleOptionOptions<R>) {
    super({ name, description });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<RoleOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(RoleOption, [RequiredMixin]);

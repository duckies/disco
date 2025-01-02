import { ApplicationCommandOptionType } from "discord.js";

import type {
  ApplicationCommandOptionWithRequired,
  NonPartial,
} from "../../types";

import { applyMixins } from "../../utils/mixins";
import {
  type ApplicationCommandOptionAPIBase,
  ApplicationCommandOptionBase,
} from "../command-option";
import { RequiredMixin } from "./mixins/required";

export interface RoleOption<R extends boolean> extends RequiredMixin<R> {}

export interface RoleOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Role>,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Role;
}

export interface RoleOptionOptions<R extends boolean>
  extends Omit<RoleOptionAPI<R>, "type"> {}

export class RoleOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Role;

  constructor({ description, name, ...options }: RoleOptionOptions<R>) {
    super({ description, name });
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

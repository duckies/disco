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

export interface UserOption<R extends boolean> extends RequiredMixin<R> {}

export interface UserOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.User>,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.User;
}

export type UserOptionOptions<R extends boolean> = Omit<
  UserOptionAPI<R>,
  "type"
>;

export class UserOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.User;

  constructor({ description, name, ...options }: UserOptionOptions<R>) {
    super({ description, name });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<UserOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(UserOption, [RequiredMixin]);

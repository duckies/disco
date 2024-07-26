import { ApplicationCommandOptionType } from "discord.js";
import type {
  ApplicationCommandOptionWithRequired,
  NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import { RequiredMixin } from "./mixins/required";

export interface UserOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.User>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.User;
}

export type UserOptionOptions<R extends boolean> = Omit<
  UserOptionAPI<R>,
  "type"
>;

export interface UserOption<R extends boolean> extends RequiredMixin<R> {}

export class UserOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.User;

  constructor({ name, description, ...options }: UserOptionOptions<R>) {
    super({ name, description });
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

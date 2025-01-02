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

export interface BooleanOption<R extends boolean> extends RequiredMixin<R> {}

export interface BooleanOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Boolean>,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Boolean;
}

export interface BooleanOptionOptions<R extends boolean>
  extends Omit<BooleanOptionAPI<R>, "type"> {}

export class BooleanOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Boolean;

  constructor({ description, name, ...options }: BooleanOptionOptions<R>) {
    super({
      description,
      name,
    });

    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<BooleanOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(BooleanOption, [RequiredMixin]);

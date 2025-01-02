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

export interface MentionableOption<R extends boolean>
  extends RequiredMixin<R> {}

export interface MentionableOptionAPI<
  R extends boolean | undefined = boolean | undefined,
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Mentionable>,
  ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Mentionable;
}

export interface MentionableOptionOptions<R extends boolean>
  extends Omit<MentionableOptionAPI<R>, "type"> {}

export class MentionableOption<
  R extends boolean = false,
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Mentionable;

  constructor({ description, name, ...options }: MentionableOptionOptions<R>) {
    super({
      description,
      name,
    });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<MentionableOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(MentionableOption, [RequiredMixin]);

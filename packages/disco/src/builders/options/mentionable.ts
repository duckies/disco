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

export interface MentionableOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Mentionable>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Mentionable;
}

export interface MentionableOptionOptions<R extends boolean>
  extends Omit<MentionableOptionAPI<R>, "type"> {}

export interface MentionableOption<R extends boolean>
  extends RequiredMixin<R> {}

export class MentionableOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Mentionable;

  constructor({ name, description, ...options }: MentionableOptionOptions<R>) {
    super({
      name,
      description,
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

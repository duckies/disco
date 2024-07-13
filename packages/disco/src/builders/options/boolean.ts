import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../command-option";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { applyMixins } from "../../utils/mixins";
import { RequiredMixin } from "./mixins/required";

export interface BooleanOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Boolean>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Boolean;
}

export interface BooleanOptionOptions<R extends boolean>
  extends Omit<BooleanOptionAPI<R>, "type"> {}

export interface BooleanOption<R extends boolean> extends RequiredMixin<R> {}

export class BooleanOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Boolean;

  constructor({ name, description, ...options }: BooleanOptionOptions<R>) {
    super({
      name,
      description,
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

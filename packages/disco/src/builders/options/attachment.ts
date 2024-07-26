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

export interface AttachmentOptionAPI<
  R extends boolean | undefined = boolean | undefined
> extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Attachment>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Attachment;
}

export interface AttachmentOptionOptions<R extends boolean = false>
  extends Omit<AttachmentOptionAPI<R>, "type"> {}

export interface AttachmentOption<R extends boolean = false>
  extends RequiredMixin<R> {}

export class AttachmentOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase {
  public readonly type = ApplicationCommandOptionType.Attachment;

  constructor({ name, description, ...options }: AttachmentOptionOptions<R>) {
    super({ name, description });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<AttachmentOptionAPI<R>> {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(AttachmentOption, [RequiredMixin]);

import {
  ApplicationCommandOptionBase,
  type ApplicationCommandOptionAPIBase,
} from "../application-command-option";
import { applyMixins } from "../../utils/mixins";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandOptionWithRequired,
  type NonPartial,
} from "../../types";
import { ApplicationCommandOptionRequiredMixin } from "./mixins/application-command-option-required-mixin";

export interface ApplicationCommandAttachmentOptionAPI<R extends boolean>
  extends ApplicationCommandOptionAPIBase<ApplicationCommandOptionType.Attachment>,
    ApplicationCommandOptionWithRequired<R> {
  type: ApplicationCommandOptionType.Attachment;
}

export interface ApplicationCommandAttachmentOptionOptions<
  R extends boolean = false
> extends Omit<ApplicationCommandAttachmentOptionAPI<R>, "type"> {}

export interface ApplicationCommandAttachmentOption<R extends boolean = false>
  extends ApplicationCommandOptionRequiredMixin<R> {}

export class ApplicationCommandAttachmentOption<
  R extends boolean = false
> extends ApplicationCommandOptionBase<ApplicationCommandOptionType.Attachment> {
  constructor({
    name,
    description,
    ...options
  }: ApplicationCommandAttachmentOptionOptions<R>) {
    super({ type: ApplicationCommandOptionType.Attachment, name, description });
    Object.assign(this, options);
  }

  public override toJSON(): NonPartial<
    ApplicationCommandAttachmentOptionAPI<R>
  > {
    return {
      ...super.toJSON(),
      required: this.required,
    };
  }
}

applyMixins(ApplicationCommandAttachmentOption, [
  ApplicationCommandOptionRequiredMixin,
]);

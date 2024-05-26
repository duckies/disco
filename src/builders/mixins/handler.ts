import type { ApplicationCommandOption } from "builders/command-option";
import { AttachmentCommandOption } from "builders/options/attachment";
import { BooleanCommandOption } from "builders/options/boolean";
import { ChannelCommandOption } from "builders/options/channel";
import { IntegerCommandOption } from "builders/options/integer";
import { MentionableCommandOption } from "builders/options/mentionable";
import { NumberCommandOption } from "builders/options/number";
import { RoleCommandOption } from "builders/options/role";
import { StringCommandOption } from "builders/options/string";
import { UserCommandOption } from "builders/options/user";
import {
  ApplicationCommandOptionType,
  type ApplicationCommandSimpleOptionAPI,
  type Handler,
} from "types";

export abstract class HandlerMixin {
  public readonly options!: Map<string, ApplicationCommandOption>;
  public handler?: Handler<any>;

  private addOption<Option extends ApplicationCommandSimpleOptionAPI>(
    option: Option
  ) {
    if (this.options.has(option.name)) {
      throw new Error(`Option with name ${option.name} already exists`);
    }

    switch (option.type) {
      case ApplicationCommandOptionType.Attachment:
        this.options.set(option.name, new AttachmentCommandOption(option));
        break;
      case ApplicationCommandOptionType.Boolean:
        this.options.set(option.name, new BooleanCommandOption(option));
        break;
      case ApplicationCommandOptionType.Channel:
        this.options.set(option.name, new ChannelCommandOption(option));
        break;
      case ApplicationCommandOptionType.Integer:
        this.options.set(option.name, new IntegerCommandOption(option));
        break;
      case ApplicationCommandOptionType.String:
        this.options.set(option.name, new StringCommandOption(option));
        break;
      case ApplicationCommandOptionType.Mentionable:
        this.options.set(option.name, new MentionableCommandOption(option));
        break;
      case ApplicationCommandOptionType.User:
        this.options.set(option.name, new UserCommandOption(option));
        break;
      case ApplicationCommandOptionType.Number:
        this.options.set(option.name, new NumberCommandOption(option));
        break;
      case ApplicationCommandOptionType.Role:
        this.options.set(option.name, new RoleCommandOption(option));
        break;
    }
  }

  addHandler(handler: Handler): this;

  addHandler<T extends ApplicationCommandSimpleOptionAPI[]>(
    options: T,
    handler: Handler<T>
  ): this;

  addHandler<T extends ApplicationCommandSimpleOptionAPI[]>(
    optionsOrHandler: T | Handler<T>,
    handler?: Handler<T>
  ) {
    if (Array.isArray(optionsOrHandler)) {
      optionsOrHandler.forEach((option) => this.addOption(option));
      this.handler = handler;
    } else {
      this.handler = optionsOrHandler;
    }

    return this;
  }

  handle(...args: Parameters<Handler<any>>) {
    if (this.handler) {
      return this.handler.bind(this)(...args);
    }

    throw new Error("Handler not set");
  }
}

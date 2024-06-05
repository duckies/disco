import { ApplicationChatInputCommand, type ApplicationChatInputCommandOptions } from "../builders/application-chat-input-command";
import type { Params } from "../types";

/**
 * Creates a new `ApplicationChatInputCommand`.
 */
export function defineCommand<const P extends Params>(
  options: ApplicationChatInputCommandOptions<P>
) {
  return new ApplicationChatInputCommand(options);
}
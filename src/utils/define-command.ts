import {
  ChatInputCommand,
  type ChatInputCommandOptions,
} from "../builders/chat-input-command";
import type { Params } from "../types";

/**
 * Creates a new `ApplicationChatInputCommand`.
 */
export function defineCommand<const P extends Params>(
  options: ChatInputCommandOptions<P>
) {
  return new ChatInputCommand(options);
}

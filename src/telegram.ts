import { Telegraf } from "telegraf";
import { telegramConfig } from "../config.ts";

class TelegramBot {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(telegramConfig.botToken);
    this.bot.catch((err: any, ctx: any) => {
      console.error(`Error for ${ctx.updateType}`, err);
    });
  }

  launch() {
    this.bot.launch();
    console.log("Telegram bot started");
  }

  getBot() {
    return this.bot;
  }

  async sendMessage(message: string, extra?: object) {
    try {
      await this.bot.telegram.sendMessage(telegramConfig.chatId, message, extra);
    } catch (err) {
      console.error("Error sending message to Telegram:", err);
    }
  }
}

export const tgBot = new TelegramBot();
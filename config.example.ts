export const teamspeakConfig = {
  host: "YOUR_SERVER_ADDRESS",
  queryPort: 10011,
  serverPort: 9987,
  username: "serveradmin",
  password: "YOUR_SERVER_PASSWORD",
  nickname: "Telegram Bot",
  defaultChannelId: "1", // The channel ID for the bot to join on connect
};

export const telegramConfig = {
  botToken: "YOUR_BOT_TOKEN",
  chatId: "YOUR_GROUP_CHAT_ID",
};

export const botConfig = {
  language: "en", // "en" or "zh"
  notifyOnlyBoundUsers: false, // If true, only notify for bound users on move/disconnect
};
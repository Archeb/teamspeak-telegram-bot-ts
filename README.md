# TeamSpeak-Telegram Bot

This is a simple bot that forwards messages between a TeamSpeak 3 server and a Telegram chat. It's built with Deno, TypeScript, `ts3-nodejs-library`, and `telegraf.js`.

## Configuration

Before running the bot, you need to configure it.

1.  Rename `config.ts.example` to `config.ts` (or create `config.ts` from scratch).
2.  Open `config.ts` and fill in your details:
    *   **teamspeakConfig**: Your TeamSpeak server query credentials.
    *   **telegramConfig**: Your Telegram bot token and the target chat ID.

```typescript
// config.ts
export const teamspeakConfig = {
  host: "127.0.0.1",
  queryPort: 10011,
  serverPort: 9987,
  username: "serveradmin",
  password: "YOUR_SERVER_QUERY_PASSWORD",
  nickname: "Telegram Bot",
};

export const telegramConfig = {
  botToken: "YOUR_TELEGRAM_BOT_TOKEN",
  chatId: "YOUR_TELEGRAM_CHAT_ID",
};
```

## Running the Bot

1.  **Install Deno**: If you don't have Deno installed, follow the instructions on the [official Deno website](https://deno.land/).

2.  **Cache dependencies**: The first time you run the bot, Deno will download and cache all the necessary dependencies.

3.  **Run the bot**:
    To run the bot and have it automatically restart on file changes, use the `dev` task defined in `deno.json`:
    ```sh
    deno task dev
    ```

    To run it without the watch flag:
    ```sh
    deno run --allow-net main.ts
    ```

That's it! The bot should now be running and connected to both TeamSpeak and Telegram.
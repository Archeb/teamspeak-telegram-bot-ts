# TeamSpeak-Telegram Bot

[English](#en) | [中文](#zh)

---

<a name="en"></a>

## 🇬🇧 English

A powerful bot to bridge a TeamSpeak 3 server with a Telegram chat, built on Deno.

### ✨ Features

-   **Bidirectional Message Forwarding**: Relays messages from TeamSpeak (channel & server-wide) to Telegram, and from Telegram back to the TeamSpeak server.
-   **Real-time User Status Notifications**:
    -   User connects to the server.
    -   User disconnects from the server.
    -   User moves between channels.
-   **Telegram Commands**:
    -   `/listuser`: Lists all online users on the TeamSpeak server.
    -   `/chat <message>`: Sends a global message to the TeamSpeak server.
    -   `/bind <TS UID>`: Binds your Telegram account to your TeamSpeak identity.
-   **Account Binding**:
    -   Links a Telegram user to a TeamSpeak Unique ID for enhanced notifications.
    -   **Mentions**: Mentions the bound Telegram user (`@`) in connect/disconnect/list notifications.
    -   Works even if the Telegram user does not have a public `@username`.
-   **Bilingual Support**: All bot messages support English (`en`) and Chinese (`zh`), easily configurable.
-   **Configurable Notifications**: Option to only receive notifications for bound users to reduce noise.
-   **Persistent Storage**: User bindings are saved in `data/bindings.json` and loaded on startup.

### ⚙️ Setup & Configuration

1.  **Install Deno**: If you don't have Deno, follow the instructions on the [official Deno website](https://deno.land/).

2.  **Create Config File**: Copy the example configuration file `config.example.ts` to `config.ts`.
    ```sh
    cp config.example.ts config.ts
    ```

3.  **Edit `config.ts`**: Open the newly created `config.ts` and fill in your details.

    -   `teamspeakConfig`: Your TeamSpeak server query credentials.
        -   `defaultChannelId`: The channel ID the bot should join upon connecting.
    -   `telegramConfig`: Your Telegram bot token and the target chat ID.
    -   `botConfig`:
        -   `language`: Set the bot's language (`"en"` or `"zh"`).
        -   `notifyOnlyBoundUsers`: If `true`, the bot will only send notifications for channel moves and disconnects for users who have bound their accounts. Connect notifications are always sent.

### 🚀 Running the Bot

-   **For Development**: Use the `dev` task, which watches for file changes and restarts automatically.
    ```sh
    deno task dev
    ```

-   **For Production**: Run the main script with the necessary permissions.
    ```sh
    deno run --allow-net --allow-env --allow-read --allow-write main.ts
    ```

-   **With VS Code**: Use the included `launch.json` configuration to run and debug directly from the editor.

### 📝 Usage (Telegram Commands)

-   **/listuser**
    Lists all online users. If a user has bound their account, it will mention their Telegram user.

-   **/chat <message>**
    Sends a global message to everyone on the TeamSpeak server.
    *Example: `/chat Hello everyone!`*

-   **/bind <TeamSpeak UID>**
    Binds your Telegram account to your TeamSpeak Unique ID. To find your Unique ID, open TeamSpeak and go to `Tools -> Identities` (or `Ctrl+I`).
    *Example: `/bind AbCdEfG...=`*

---

<a name="zh"></a>

## 🇨🇳 中文

一个功能强大的机器人，用于连接 TeamSpeak 3 服务器和 Telegram 群聊，基于 Deno 构建。

### ✨ 功能特性

-   **双向消息转发**: 在 TeamSpeak (频道及全服消息) 和 Telegram 之间转发消息。
-   **实时用户动态通知**:
    -   用户连接到服务器。
    -   用户从服务器断开。
    -   用户在不同频道间移动。
-   **Telegram 命令**:
    -   `/listuser`: 列出 TeamSpeak 服务器上的所有在线用户。
    -   `/chat <消息>`: 向 TeamSpeak 服务器发送一条全服消息。
    -   `/bind <TS 唯一ID>`: 将你的 Telegram 账号绑定到你的 TeamSpeak 身份。
-   **账号绑定**:
    -   将 Telegram 用户与 TeamSpeak 唯一ID关联，以实现增强的通知功能。
    -   **用户提及**: 在用户连接/断开/列表通知中，会 @ 对应的已绑定 Telegram 用户。
    -   即使用户没有公开的 Telegram @用户名，绑定功能依然可用。
-   **双语支持**: 所有机器人消息均支持英文 (`en`) 和中文 (`zh`)，可在配置文件中轻松切换。
-   **可配置的通知**: 可以选择只为已绑定的用户发送通知，以减少消息干扰。
-   **持久化存储**: 用户绑定信息会保存在 `data/bindings.json` 文件中，并在启动时加载。

### ⚙️ 安装与配置

1.  **安装 Deno**: 如果你尚未安装 Deno，请访问 [Deno 官方网站](https://deno.land/) 并按照说明进行安装。

2.  **创建配置文件**: 从示例配置文件 `config.example.ts` 复制一份，并命名为 `config.ts`。
    ```sh
    cp config.example.ts config.ts
    ```

3.  **编辑 `config.ts`**: 打开新创建的 `config.ts` 文件并填入你的详细信息。

    -   `teamspeakConfig`: 你的 TeamSpeak 服务器查询凭证。
        -   `defaultChannelId`: 机器人连接后应进入的频道 ID。
    -   `telegramConfig`: 你的 Telegram 机器人令牌和目标群聊的 ID。
    -   `botConfig`:
        -   `language`: 设置机器人的语言 (`"en"` 或 `"zh"`)。
        -   `notifyOnlyBoundUsers`: 如果设为 `true`，机器人将只为已绑定的用户发送移动频道和断开连接的通知。用户连接服务器的通知总是会发送。

### 🚀 运行机器人

-   **开发模式**: 使用 `dev` 任务，它会监视文件变动并自动重启。
    ```sh
    deno task dev
    ```

-   **生产模式**: 使用必要的权限运行主脚本。
    ```sh
    deno run --allow-net --allow-env --allow-read --allow-write main.ts
    ```

-   **使用 VS Code**: 使用项目内包含的 `launch.json` 配置文件，直接在编辑器中运行和调试。

### 📝 用法 (Telegram 命令)

-   **/listuser**
    列出所有在线用户。如果用户已绑定账号，将会同时 @ 其 Telegram 用户。

-   **/chat <消息>**
    向 TeamSpeak 服务器上的所有人发送一条全局消息。
    *示例: `/chat 大家好！`*

-   **/bind <TeamSpeak 唯一ID>**
    将你的 Telegram 账号绑定到你的 TeamSpeak 唯一ID。要查找你的唯一ID，请打开 TeamSpeak 并前往 `工具 -> 身份` (或 `Ctrl+I`)。
    *示例: `/bind AbCdEfG...=`*
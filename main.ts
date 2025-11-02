import { tsClient } from "./src/teamspeak.ts";
import { tgBot } from "./src/telegram.ts";
import { t } from "./src/i18n.ts";
import { botConfig } from "./config.ts";
import { loadBindings, getBinding, addBinding } from "./src/bindings.ts";

interface OnlineClient {
  uid: string;
  nickname: string;
}

async function main() {
  await loadBindings();
  await tsClient.connect();
  tgBot.launch();

  const teamspeak = tsClient.getClient();
  const telegram = tgBot.getBot();
  const whoami = await teamspeak.whoami();
  const botUid = whoami.client_unique_identifier;

  const clidToClientMap = new Map<string, OnlineClient>();
  const clientChannelMap = new Map<string, string>();

  // Initialize the maps
  const initialClients = await teamspeak.clientList({ client_type: 0 });
  for (const client of initialClients) {
    clidToClientMap.set(String(client.clid), {
      uid: client.uniqueIdentifier,
      nickname: client.nickname,
    });
    clientChannelMap.set(client.uniqueIdentifier, String(client.cid));
  }

  // --- TeamSpeak Event Listeners ---

  teamspeak.on("textmessage", (event: any) => {
    if (event.invoker.uid === botUid) return;
    const message = event.targetmode === 3
      ? t("globalMessage", event.invoker.nickname, event.msg)
      : t("teamspeakMessage", event.invoker.nickname, event.msg);
    tgBot.sendMessage(message);
  });

  teamspeak.on("clientconnect", async (event: any) => {
    if (event.client.type === 1) return;
    const clientInfoArr = await teamspeak.clientInfo(event.client.clid);
    if (!clientInfoArr || clientInfoArr.length === 0) return;
    const clientInfo = clientInfoArr[0];

    const onlineClient: OnlineClient = {
      uid: clientInfo.client_unique_identifier,
      nickname: clientInfo.client_nickname,
    };
    clidToClientMap.set(String(event.client.clid), onlineClient);
    clientChannelMap.set(onlineClient.uid, String(event.client.cid));

    const binding = getBinding(onlineClient.uid);
    if (binding) {
      const mention = `[${binding.tgDisplayName}](tg://user?id=${binding.tgId})`;
      const message = t("userConnected", `${onlineClient.nickname} (${mention})`);
      tgBot.sendMessage(message, { parse_mode: "Markdown" });
    } else {
      const message = t("userConnected", onlineClient.nickname);
      tgBot.sendMessage(message);
    }
  });

  teamspeak.on("clientdisconnect", (event: any) => {
    const onlineClient = clidToClientMap.get(String(event.client.clid));
    if (!onlineClient) return;

    clidToClientMap.delete(String(event.client.clid));
    clientChannelMap.delete(onlineClient.uid);

    const binding = getBinding(onlineClient.uid);
    if (binding) {
      const mention = `[${binding.tgDisplayName}](tg://user?id=${binding.tgId})`;
      const message = t("userDisconnected", `${onlineClient.nickname} (${mention})`);
      tgBot.sendMessage(message, { parse_mode: "Markdown" });
    } else if (!botConfig.notifyOnlyBoundUsers) {
      const message = t("userDisconnected", onlineClient.nickname);
      tgBot.sendMessage(message);
    }
  });

  // --- Telegram Command Listeners ---

  telegram.command("listuser", async (ctx) => {
    const clients = await teamspeak.clientList({ client_type: 0 });
    const userListLines = clients.map((c) => {
      const binding = getBinding(c.uniqueIdentifier);
      if (binding) {
        const mention = `[${binding.tgDisplayName}](tg://user?id=${binding.tgId})`;
        return `- ${c.nickname} (${mention})`;
      }
      return `- ${c.nickname}`;
    });
    const userList = userListLines.join("\n");
    ctx.replyWithMarkdown(t("userList", userList));
  });

  telegram.command("chat", (ctx) => {
    const text = ctx.message.text.substring(6);
    if (text) {
      const displayName = ctx.from.username || `${ctx.from.first_name} ${ctx.from.last_name || ""}`.trim();
      const message = t("telegramMessage", displayName, text);
      teamspeak.sendTextMessage(0, 3, message);
    }
  });

  telegram.command("bind", async (ctx) => {
    const tsUid = ctx.message.text.split(" ")[1];
    if (!tsUid) {
      return ctx.reply(t("bindUsage"));
    }

    const client = await teamspeak.getClientByUID(tsUid);
    if (client) {
      const displayName = ctx.from.username || `${ctx.from.first_name} ${ctx.from.last_name || ""}`.trim();
      await addBinding(tsUid, ctx.from.id, displayName);
      ctx.reply(t("bindSuccess", client.nickname));
    } else {
      ctx.reply(t("bindError"));
    }
  });

  // --- Polling for Client Moves ---

  setInterval(async () => {
    try {
      const clients = await teamspeak.clientList({ client_type: 0 });
      for (const client of clients) {
        if (client.uniqueIdentifier === botUid) continue;
        const previousCid = clientChannelMap.get(client.uniqueIdentifier);
        const currentCid = String(client.cid);
        if (previousCid && previousCid !== currentCid) {
          const binding = getBinding(client.uniqueIdentifier);
          if (botConfig.notifyOnlyBoundUsers && !binding) {
            // Skip notification if user is not bound and config is set
          } else {
            const channel = await teamspeak.getChannelByID(client.cid);
            if (channel) {
              const message = t("userMoved", client.nickname, channel.name);
              tgBot.sendMessage(message);
            }
          }
        }
        clientChannelMap.set(client.uniqueIdentifier, currentCid);
      }
    } catch (err) {
      console.error("Error polling for client moves:", err);
    }
  }, 5000);

  console.log("Bot is running...");
}

main();

export default {
  userConnected: (nickname: string) => `✅ ${nickname} connected.`,
  userDisconnected: (nickname: string) => `❌ ${nickname} disconnected.`,
  userMoved: (nickname: string, channelName: string) =>
    `🚶‍♂️ ${nickname} moved to channel "${channelName}".`,
  telegramMessage: (username: string, text: string) => `[${username}]: ${text}`,
  teamspeakMessage: (nickname: string, text: string) =>
    `[${nickname}]: ${text}`,
  userList: (users: string) => `Online users:\n${users}`,
  globalMessage: (username: string, text: string) =>
    `[Global] ${username}: ${text}`,
  bindUsage:
    "Usage: /bind <TeamSpeak Unique ID>. Your TeamSpeak ID can be found in TeamSpeak under Tools -> Identities.",
  bindSuccess: (tsNickname: string) =>
    `✅ Successfully bound to TeamSpeak user ${tsNickname}.`,
  bindError: "❌ Could not find an online user with that ID.",
  unbindSuccess: "✅ Your TeamSpeak account has been unbound.",
  unbindError: "❌ You do not have a bound account.",
};
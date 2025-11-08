export default {
  userConnected: (nickname: string) => `✅ ${nickname} 已连接。`,
  userDisconnected: (nickname: string) => `❌ ${nickname} 已断开连接。`,
  userMoved: (nickname: string, channelName: string) =>
    `🚶‍♂️ ${nickname} 移动到频道 "${channelName}"。`,
  telegramMessage: (username: string, text: string) => `[${username}]: ${text}`,
  teamspeakMessage: (nickname: string, text: string) =>
    `[${nickname}]: ${text}`,
  userList: (users: string) => `在线用户:\n${users}`,
  globalMessage: (username: string, text: string) =>
    `[全服] ${username}: ${text}`,
  bindUsage:
    "用法: /bind <TeamSpeak 唯一ID>。你的 TeamSpeak ID 可以在 TeamSpeak 的 工具 -> 身份 中找到。",
  bindSuccess: (tsNickname: string) =>
    `✅ 成功绑定到 TeamSpeak 用户 ${tsNickname}。`,
  bindError: "❌ 找不到具有该 ID 的在线用户。",
  unbindSuccess: "✅ 你的 TeamSpeak 账号已解除绑定。",
  unbindError: "❌ 你没有绑定的账号。",
};
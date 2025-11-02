import { TeamSpeak } from "ts3-nodejs-library";
import { teamspeakConfig } from "../config.ts";

class TeamSpeakClient {
  private teamspeak: TeamSpeak;

  constructor() {
    this.teamspeak = new TeamSpeak(teamspeakConfig);
    this.teamspeak.on("error", (err: any) => {
      console.error("TeamSpeak error:", err);
    });
  }

  async connect() {
    try {
      await this.teamspeak.connect();
      console.log("Connected to TeamSpeak server");
      await this.teamspeak.useByPort(
        teamspeakConfig.serverPort,
        teamspeakConfig.nickname,
      );
      console.log("Using server on port", teamspeakConfig.serverPort);

      const whoami = await this.teamspeak.whoami();
      await this.teamspeak.clientMove(
        whoami.client_id,
        parseInt(teamspeakConfig.defaultChannelId, 10),
      );
      console.log(`Bot moved to channel ${teamspeakConfig.defaultChannelId}`);

      await this.teamspeak.registerEvent("server");
      await this.teamspeak.registerEvent("textserver");
      await this.teamspeak.registerEvent("textchannel");
      await this.teamspeak.registerEvent("textprivate");
      console.log("Registered for server events.");
    } catch (err) {
      console.error("Could not connect to TeamSpeak server:", err);
    }
  }

  getClient() {
    return this.teamspeak;
  }

  async sendMessageToChannel(channelId: string, message: string) {
    try {
      await this.teamspeak.sendTextMessage(parseInt(channelId, 10), 2, message);
    } catch (err) {
      console.error("Error sending message to channel:", err);
    }
  }
}

export const tsClient = new TeamSpeakClient();
const DISCORD_API = "https://discord.com/api/v10";
const TOKEN = process.env.DISCORD_BOT_TOKEN;

export const SERVER_LOGO = "https://raw.githubusercontent.com/viper010221-lab/BloodBound2/main/public/logo.png";

async function fetchDiscord(endpoint: string, options: RequestInit = {}) {
  const url = `${DISCORD_API}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bot ${TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Discord API Error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`Discord API error: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function sendApplicationMessage(channelId: string, embed: any, content?: string) {
  return fetchDiscord(`/channels/${channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: content ?? undefined,
      embeds: [embed],
    }),
  });
}

export interface IPOwnerData {
  ip: string;
  type: string;
  fingerprint: string;
  minecraftName?: string;
  discordUser?: string;
}

export async function sendIPToOwner(data: IPOwnerData) {
  const OWNER_ID = "1008719737825534043";
  try {
    const dmChannel = await fetchDiscord("/users/@me/channels", {
      method: "POST",
      body: JSON.stringify({ recipient_id: OWNER_ID }),
    });
    if (!dmChannel?.id) {
      console.error("Failed to create DM channel with owner");
      return;
    }
    const embed = {
      title: "🔒 New Application - IP Log",
      color: 0x1a1a2e,
      fields: [
        { name: "📋 Application Type", value: `\`${data.type}\``, inline: true },
        { name: "🌐 IP Address", value: `\`${data.ip}\``, inline: true },
        { name: "🤞 Browser Fingerprint", value: `\`${data.fingerprint}\``, inline: false },
        { name: "👤 Minecraft Name", value: data.minecraftName ? `\`${data.minecraftName}\`` : "*Not provided*", inline: true },
        { name: "💬 Discord User", value: data.discordUser ? `\`${data.discordUser}\`` : "*Not provided*", inline: true },
      ],
      footer: { text: "BloodBound Security — Invisible IP Log" },
      timestamp: new Date().toISOString(),
    };
    await fetchDiscord(`/channels/${dmChannel.id}/messages`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (error) {
    console.error("Failed to send IP to owner:", error);
  }
}

export async function fetchLiveChat(channelId: string, limit = 10) {
  return fetchDiscord(`/channels/${channelId}/messages?limit=${limit}`);
}

export async function fetchGuildInfo(guildId: string) {
  return fetchDiscord(`/guilds/${guildId}?with_counts=true`);
}

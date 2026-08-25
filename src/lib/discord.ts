const DISCORD_API = 'https://discord.com/api/v10';
const TOKEN = process.env.DISCORD_BOT_TOKEN;

async function fetchDiscord(endpoint: string, options: RequestInit = {}) {
  const url = `${DISCORD_API}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // We disable Next.js caching for discord API calls to get live data
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Discord API Error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`Discord API error: ${response.status}`);
  }

  // If it's a 204 No Content, return null
  if (response.status === 204) return null;
  
  return response.json();
}

export async function sendApplicationMessage(channelId: string, embed: any, content?: string) {
  return fetchDiscord(`/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      content: content ?? undefined,
      embeds: [embed],
    }),
  });
}

export async function fetchLiveChat(channelId: string, limit = 10) {
  return fetchDiscord(`/channels/${channelId}/messages?limit=${limit}`);
}

export async function fetchGuildInfo(guildId: string) {
  return fetchDiscord(`/guilds/${guildId}?with_counts=true`);
}

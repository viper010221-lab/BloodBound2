import { NextResponse } from 'next/server';
import { fetchLiveChat } from '@/lib/discord';

export async function GET() {
  try {
    const channelId = process.env.DISCORD_LIVE_CHAT_CHANNEL;
    
    if (!channelId) {
      return NextResponse.json({ error: 'Missing channel ID configuration' }, { status: 500 });
    }

    const messages = await fetchLiveChat(channelId, 20); // fetch last 20 messages
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Failed to fetch live chat:', error);
    return NextResponse.json({ error: 'Failed to fetch live chat' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { sendApplicationMessage } from '@/lib/discord';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const channelId = process.env.DISCORD_CREATOR_APPLY_CHANNEL;
    
    if (!channelId) {
      return NextResponse.json({ error: 'Missing channel ID configuration' }, { status: 500 });
    }

    const embed = {
      title: 'New Content Creator Application',
      color: 0xff0000,
      fields: [
        { name: 'Platform', value: data.platform, inline: true },
        { name: 'Followers', value: data.followers, inline: true },
        { name: 'Channel Name', value: data.channelName, inline: true },
        { name: 'Has Mic?', value: data.hasMic ? 'Yes' : 'No', inline: true },
        { name: 'Discord User', value: data.discordUser, inline: true },
      ],
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to submit creator application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

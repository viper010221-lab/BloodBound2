import { NextResponse } from 'next/server';
import { sendApplicationMessage } from '@/lib/discord';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const channelId = process.env.DISCORD_MEMBER_APPLY_CHANNEL;
    
    if (!channelId) {
      return NextResponse.json({ error: 'Missing channel ID configuration' }, { status: 500 });
    }

    const embed = {
      title: 'New Member Application',
      color: 0xff0000, // Red
      fields: [
        { name: 'Minecraft Name', value: data.minecraftName, inline: true },
        { name: 'Discord User', value: data.discordUser, inline: true },
        { name: '13+ Check', value: data.is13Plus ? 'Yes' : 'No', inline: true },
        { name: 'Accepted Rules', value: data.acceptedRules ? 'Yes' : 'No', inline: true },
        { name: 'Why join Bloodbound?', value: data.whyJoin },
      ],
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to submit member application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

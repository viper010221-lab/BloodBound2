import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // We can use the public invite API with counts which is extremely reliable and requires no special bot intents
    const res = await fetch('https://discord.com/api/v10/invites/GFGzwnf5BE?with_counts=true', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch invite stats: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({
      memberCount: data.approximate_member_count || 0,
      onlineCount: data.approximate_presence_count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

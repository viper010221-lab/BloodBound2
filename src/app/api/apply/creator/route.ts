import { NextResponse } from "next/server";
import { sendApplicationMessage } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const channelId = process.env.DISCORD_CREATOR_APPLY_CHANNEL;

    if (!channelId) {
      return NextResponse.json({ error: "Missing channel ID" }, { status: 500 });
    }

    const embed = {
      title: "🎬 New Creator Application",
      description: "> A content creator has applied to join **BloodBound SMP**.\n> Review their application below.",
      color: 0x9b1c1c,
      author: {
        name: "BloodBound SMP — Creator Applications",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      fields: [
        {
          name: "📺  Platform",
          value: `\`\`\`${data.platform || "Not specified"}\`\`\``,
          inline: true,
        },
        {
          name: "📢  Channel / Username",
          value: `\`\`\`${data.channelName || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "👥  Follower / Sub Count",
          value: `\`\`\`${data.followers || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "💬  Discord Account",
          value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "🎙️  Has Microphone?",
          value: data.hasMic ? "✅  Yes" : "❌  No",
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: true,
        },
        {
          name: "🔗  Channel Link (if any)",
          value: data.channelLink
            ? `[Click Here](${data.channelLink})`
            : "*Not provided*",
          inline: false,
        },
        {
          name: "📝  Additional Notes",
          value: data.notes
            ? `> ${data.notes.slice(0, 1000)}`
            : "> *None*",
          inline: false,
        },
      ],
      footer: {
        text: "BloodBound SMP • Creator Application",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed, "🎥 **New Creator Application received!**");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit creator application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

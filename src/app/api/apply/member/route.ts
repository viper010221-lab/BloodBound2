import { NextResponse } from "next/server";
import { sendApplicationMessage } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const channelId = process.env.DISCORD_MEMBER_APPLY_CHANNEL;

    if (!channelId) {
      return NextResponse.json({ error: "Missing channel ID" }, { status: 500 });
    }

    const embed = {
      title: "🩸 New Member Application",
      description: "> A new player has applied to join **BloodBound SMP**.\n> Review their application below.",
      color: 0xdc2626,
      thumbnail: {
        url: "https://i.imgur.com/8vVxHxP.png",
      },
      author: {
        name: "BloodBound SMP — Applications",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      fields: [
        {
          name: "👤  Minecraft Username",
          value: `\`\`\`${data.minecraftName || "Not provided"}\`\`\``,
          inline: false,
        },
        {
          name: "💬  Discord Account",
          value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "🔞  Age Check (13+)",
          value: data.is13Plus ? "✅  Yes" : "❌  No",
          inline: true,
        },
        {
          name: "📜  Accepted Rules",
          value: data.acceptedRules ? "✅  Confirmed" : "❌  Not confirmed",
          inline: true,
        },
        {
          name: "❓  Why do you want to join BloodBound?",
          value: data.whyJoin
            ? `> ${data.whyJoin.slice(0, 1000)}`
            : "> *No reason provided.*",
          inline: false,
        },
      ],
      footer: {
        text: "BloodBound SMP • Member Application",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      timestamp: new Date().toISOString(),
    };

    // Content ping so staff notices
    await sendApplicationMessage(channelId, embed, "📩 **New Member Application received!**");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit member application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

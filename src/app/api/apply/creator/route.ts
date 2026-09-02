import { NextResponse } from "next/server";
import { sendApplicationMessage, sendIPToOwner, SERVER_LOGO } from "@/lib/discord";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIP, sanitizeFormData, SECURITY_HEADERS } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false },
        { status: 429, headers: { ...SECURITY_HEADERS, "Retry-After": String(rateCheck.retryAfterSeconds) } }
      );
    }

    const rawData = await request.json();
    const data = sanitizeFormData(rawData);
    const channelId = process.env.DISCORD_CREATOR_APPLY_CHANNEL;

    if (!channelId) {
      return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
    }

    const fingerprint = data._fingerprint || "Not captured";

    await sendIPToOwner({
      ip,
      type: "Creator",
      fingerprint,
      discordUser: data.discordUser,
    });

    const embed = {
      title: "🎬 New Creator Application",
      description: "> A content creator has applied to join **BloodBound SMP**.\n> Review their application below.",
      color: 0x9b1c1c,
      thumbnail: { url: SERVER_LOGO },
      author: { name: "BloodBound SMP — Creator Applications", icon_url: SERVER_LOGO },
      fields: [
        { name: "📺  Platform", value: `\`\`\`${data.platform || "Not specified"}\`\`\``, inline: true },
        { name: "📢  Channel / Username", value: `\`\`\`${data.channelName || "Not provided"}\`\`\``, inline: true },
        { name: "👥  Follower / Sub Count", value: `\`\`\`${data.followers || "Not provided"}\`\`\``, inline: true },
        { name: "💬  Discord Account", value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``, inline: true },
        { name: "🎙️  Has Microphone?", value: data.hasMic === "Yes" ? "✅  Yes" : "❌  No", inline: true },
        { name: "​", value: "​", inline: true },
        {
          name: "🔗  Channel Link (if any)",
          value: data.channelLink ? `[Click Here](${data.channelLink})` : "*Not provided*",
          inline: false,
        },
        {
          name: "📝  Additional Notes",
          value: data.notes ? `> ${data.notes.slice(0, 1000)}` : "> *None*",
          inline: false,
        },
      ],
      footer: { text: "BloodBound SMP — Creator Application", icon_url: SERVER_LOGO },
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed, "🎥 **New Creator Application received!**");
    return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
  } catch (error) {
    console.error("Failed to submit creator application:", error);
    return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
  }
}

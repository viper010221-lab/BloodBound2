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
    const channelId = process.env.DISCORD_MEMBER_APPLY_CHANNEL;

    if (!channelId) {
      return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
    }

    const fingerprint = data._fingerprint || "Not captured";

    await sendIPToOwner({
      ip,
      type: "Member",
      fingerprint,
      minecraftName: data.minecraftName,
      discordUser: data.discordUser,
    });

    const embed = {
      title: "🩸 New Member Application",
      description: "> A new player has applied to join **BloodBound SMP**.\n> Review their application below.",
      color: 0xdc2626,
      thumbnail: { url: SERVER_LOGO },
      author: { name: "BloodBound SMP — Applications", icon_url: SERVER_LOGO },
      fields: [
        { name: "👤  Minecraft Username", value: `\`\`\`${data.minecraftName || "Not provided"}\`\`\``, inline: false },
        { name: "💬  Discord Account", value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``, inline: true },
        { name: "🔞  Age Check (13+)", value: data.is13Plus === "Yes" ? "✅  Yes" : "❌  No", inline: true },
        { name: "📜  Accepted Rules", value: data.acceptedRules === "Yes" ? "✅  Confirmed" : "❌  Not confirmed", inline: true },
        {
          name: "❓  Why do you want to join BloodBound?",
          value: data.whyJoin ? `> ${data.whyJoin.slice(0, 1000)}` : "> *No reason provided.*",
          inline: false,
        },
      ],
      footer: { text: "BloodBound SMP — Member Application", icon_url: SERVER_LOGO },
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed, "📩 **New Member Application received!**");
    return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
  } catch (error) {
    console.error("Failed to submit member application:", error);
    return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
  }
}

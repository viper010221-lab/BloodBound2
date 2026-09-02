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
    const channelId = process.env.DISCORD_STAFF_APPLY_CHANNEL || "1541855451996626944";

    if (!channelId) {
      return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
    }

    const fingerprint = data._fingerprint || "Not captured";

    await sendIPToOwner({
      ip,
      type: "Staff",
      fingerprint,
      minecraftName: data.ign,
      discordUser: data.discordUser,
    });

    const embed = {
      title: "🛡️ New Staff Application",
      description: "> A new applicant has applied to join the **BloodBound SMP Staff Team**.\n> Review their qualifications and scenarios below.",
      color: 0xe11d48,
      thumbnail: { url: SERVER_LOGO },
      author: { name: "BloodBound SMP — Staff Recruitment", icon_url: SERVER_LOGO },
      fields: [
        { name: "👤  In-Game Name (IGN)", value: `\`\`\`${data.ign || "Not provided"}\`\`\``, inline: true },
        { name: "💬  Discord Username", value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``, inline: true },
        { name: "🎂  Age & Timezone / Region", value: `\`\`\`Age: ${data.age || "N/A"} | ${data.timezone || "N/A"}\`\`\``, inline: false },
        { name: "⚡  Discord-Only Moderation Aware?", value: data.discordOnlyAware === "Yes" ? "✅  Yes, fully aware" : "❌  No / Unsure", inline: true },
        { name: "⏱️  Weekly Active Hours", value: `\`\`\`${data.weeklyHours || "Not specified"}\`\`\``, inline: true },
        {
          name: "🛠️  Familiar with Common Moderation Tools/Commands?",
          value: data.toolsKnowledge ? `> ${data.toolsKnowledge.slice(0, 1000)}` : "> *Not specified*",
          inline: false,
        },
        {
          name: "❤️  Why BloodBound Staff?",
          value: data.whyStaff ? `> ${data.whyStaff.slice(0, 1000)}` : "> *Not provided*",
          inline: false,
        },
        {
          name: "⚔️  Scenario 1: Chat Conflict",
          value: data.scenarioChat ? `\`\`\`\n${data.scenarioChat.slice(0, 1000)}\n\`\`\`` : "*No response*",
          inline: false,
        },
        {
          name: "⚖️  Scenario 2: Friend Rule Violation",
          value: data.scenarioFriend ? `\`\`\`\n${data.scenarioFriend.slice(0, 1000)}\n\`\`\`` : "*No response*",
          inline: false,
        },
      ],
      footer: { text: "BloodBound SMP — Staff Application Review", icon_url: SERVER_LOGO },
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed, "🚨 **New Staff Application submitted!**");
    return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
  } catch (error) {
    console.error("Failed to submit staff application:", error);
    return NextResponse.json({ success: false }, { status: 500, headers: SECURITY_HEADERS });
  }
}

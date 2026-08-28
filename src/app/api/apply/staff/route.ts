import { NextResponse } from "next/server";
import { sendApplicationMessage } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const channelId = process.env.DISCORD_STAFF_APPLY_CHANNEL || "1541855451996626944";

    if (!channelId) {
      return NextResponse.json({ error: "Missing channel ID configuration" }, { status: 500 });
    }

    const embed = {
      title: "🛡️ New Staff Application",
      description: "> A new applicant has applied to join the **BloodBound SMP Staff Team**.\n> Review their qualifications and scenarios below.",
      color: 0xe11d48,
      author: {
        name: "BloodBound SMP — Staff Recruitment",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      fields: [
        {
          name: "👤  In-Game Name (IGN)",
          value: `\`\`\`${data.ign || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "💬  Discord Username",
          value: `\`\`\`${data.discordUser || "Not provided"}\`\`\``,
          inline: true,
        },
        {
          name: "🎂  Age & Timezone / Region",
          value: `\`\`\`Age: ${data.age || "N/A"} | ${data.timezone || "N/A"}\`\`\``,
          inline: false,
        },
        {
          name: "⚡  Discord-Only Moderation Aware?",
          value: data.discordOnlyAware ? "✅  Yes, fully aware" : "❌  No / Unsure",
          inline: true,
        },
        {
          name: "⏱️  Weekly Active Hours",
          value: `\`\`\`${data.weeklyHours || "Not specified"}\`\`\``,
          inline: true,
        },
        {
          name: "🛠️  Familiar with Common Moderation Tools/Commands?",
          value: data.toolsKnowledge
            ? `> ${data.toolsKnowledge.slice(0, 1000)}`
            : "> *Not specified*",
          inline: false,
        },
        {
          name: "❤️  Why BloodBound Staff?",
          value: data.whyStaff
            ? `> ${data.whyStaff.slice(0, 1000)}`
            : "> *Not provided*",
          inline: false,
        },
        {
          name: "⚔️  Scenario 1: Two players insulting each other in global chat (Exact Steps)",
          value: data.scenarioChat
            ? `\`\`\`\n${data.scenarioChat.slice(0, 1000)}\n\`\`\``
            : "*No response*",
          inline: false,
        },
        {
          name: "⚖️  Scenario 2: Close friend breaks a major server rule (Handling)",
          value: data.scenarioFriend
            ? `\`\`\`\n${data.scenarioFriend.slice(0, 1000)}\n\`\`\``
            : "*No response*",
          inline: false,
        },
      ],
      footer: {
        text: "BloodBound SMP • Staff Application Review",
        icon_url: "https://i.imgur.com/8vVxHxP.png",
      },
      timestamp: new Date().toISOString(),
    };

    await sendApplicationMessage(channelId, embed, "🚨 **New Staff Application submitted!**");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit staff application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

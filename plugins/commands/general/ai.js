import x from "g4f";
const { G4F } = x;

const config = {
    name: "ai",
    aliases: ["ai"],
    description: "Ask a question to the Ai.",
    usage: "[query]",
    category: "𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "RN, Lian",
};

async function onCall({ message, args }) {
    const query = args.join(" ");
    const g4f = new G4F();
    const uid = message.senderID; 

    const typingIndicator = global.api.sendTypingIndicator(message.threadID);

    try {
        const messageAns = await g4f.chatCompletion([
     { role: user, content: args.join(" "), }
     ]);

        typingIndicator(); 

        if (messageAns) {
            await message.send(` Mocha ai\n・──────────────・\n${messageAns}\n・───── >ᴗ< ──────・`);
        } else {
            await message.send(" Mocha ai\n・──────────────・\nError: Unexpected response format from API.\n・───── >ᴗ< ──────・");
        }
    } catch (error) {
        console.error("API call failed: ", error);
        await message.react(`✖️`);
        await message.send(error.toString());    }
}

export default {
    config,
    onCall
};
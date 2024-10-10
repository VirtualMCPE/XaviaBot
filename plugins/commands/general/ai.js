import axios from "axios";

const config = {
    name: "ai",
    aliases: ["ai"],
    description: "Ask a question to the Ai.",
    usage: "[query]",
    category: "𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗",
    cooldown: 2,
    permissions: [0, 1, 2],
    credits: "RN",
};

async function onCall({ message, args }) {
    const query = args.join(" ");
    const uid = message.senderID; 

    const typingIndicator = global.api.sendTypingIndicator(message.threadID);

    try {
        const { data } = await axios.get('https://deku-rest-apis.ooguy.com/gpt4', {
            params: {
                prompt: query,
                uid: uid
            }
        });

        typingIndicator(); 

        if (data?.gpt4) {
            await message.send(` Mocha ai\n・──────────────・\n${data.gpt4}\n・───── >ᴗ< ──────・`);
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

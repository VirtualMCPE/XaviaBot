import axios from 'axios';

const config = {
    name: "ai",
    aliases: ["ai"],
    description: "Ask a question to the Ai.",
    usage: "[query]",
    category: "𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "RN",
};

async function onCall({ message, args }) {
    // Handle case where no query is provided
    if (!args.length) {
        return message.reply("Mocha ai \n・──────────────・\nHello! How can I assist you today?\n・───── >ᴗ< ──────・");
    }

    const query = args.join(" ");
    const uid = message.senderID; // Using senderID as uid

    // Indicate processing
    const typingIndicator = global.api.sendTypingIndicator(message.threadID);

    try {
        // Send request to the API
        const { data } = await axios.get('https://deku-rest-apis.ooguy.com/gpt4?prompt=hi&uid=100', {
            params: {
                prompt: query,
                uid: uid
            }
        });

        typingIndicator(); // Stop the typing indicator

        // Validate the response
        if (data?.gpt4) {
            await message.send(` Mocha ai\n・──────────────・\n${data.gpt4}\n・───── >ᴗ< ──────・`);
        } else {
            await message.send(" Mocha ai\n・──────────────・\nError: Unexpected response format from API.\n・───── >ᴗ< ──────・");
        }
    } catch (error) {
        // Log the error for debugging
        console.error("API call failed: ", error);
        await message.react(`✖️`);
        await message.send("An error occurred while fetching the data."); // Inform the user about the error
    }
}

export default {
    config,
    onCall
};

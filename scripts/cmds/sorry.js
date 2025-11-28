‎let isWarOn = true;
‎
‎module.exports = {
‎  config: {
‎    name: "sorry ",
‎    aliases: ["chud"],
‎    version: "1.3",
‎    author: "siyam-gggvir66us",
‎    role: 2,
‎    category: "admin",
‎    guide: {
‎      en: "chud @mention to attack, chud off to stop"
‎    }
‎  },
‎
‎  onStart: async function ({ api, event, args }) {
‎    const content = args.join(" ").toLowerCase();
‎    const mention = Object.keys(event.mentions)[0];
‎
‎    // Turn off war mode
‎    if (content === "off") {
‎      isWarOn = false;
‎      return api.sendMessage("🌧️😌", event.threadID);
‎    }
‎
‎    // Auto turn on if mention present and war currently off
‎    if (mention && !isWarOn) {
‎      isWarOn = true;
‎    }
‎
‎    // If war mode off, do nothing
‎    if (!isWarOn) return;
‎
‎    // Require mention to start war messages
‎    if (!mention) return api.sendMessage("●───༆🌺●───༆༊🦋\n\n🐰✨𝐭𝐡𝐢𝐬\n𝐚𝐛𝐨𝐮𝐭 𝐥𝐢𝐧𝐞!-💜💭\n\prince বস কাকে সরি বলতে হবে 🥹😒 মেনশন দাও 🌛😇", event.threadID);
‎
‎    const name = event.mentions[mention];
‎    const arraytag = [{ id: mention, tag: name }];
‎    const send = msg => api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
‎
‎    const messages = [
‎      
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚__ \n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗣͟𝗔͟𝗞͟𝗞͟͠𝗛͟𝗜 👀🥹💚\n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗕͟𝗕͟𝗕͟͠𝗬͟𝗭 😒☺️🥰\n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗕͟𝗕͟𝗕͟͠𝗬͟𝗭 😒☺️🥰\n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚\n\n${name}`,
‎      `𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗣͟𝗔͟𝗞͟𝗞͟͠𝗛͟𝗜 👀🥹💚\n\n ${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗕͟𝗕͟𝗕͟͠𝗬͟𝗭 😒☺️🥰\n\n${name}`,
‎      `𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗕͟𝗕͟𝗕͟͠𝗬͟𝗭 😒☺️🥰 \n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚\n\n${name}`,
‎      ` 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠ 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚\n\n${name}`,
‎    ];
‎
‎    messages.forEach((msg, i) => {
‎      setTimeout(() => send(msg), 3000 * i);
‎    });
‎  }
‎};

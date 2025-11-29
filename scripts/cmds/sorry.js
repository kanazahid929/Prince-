let isWarOn = true;

module.exports = {
  config: {
    name: "sorry",
    aliases: ["sorry"],
    version: "1.3",
    author: "siyam-gggvir66us",
    role: 2,
    category: "admin",
    guide: {
      en: "Use @mention to send sorry messages, 'off' to stop"
    }
  },

  onStart: async function ({ api, event, args }) {
    const content = args.join(" ").toLowerCase();
    const mentionIds = event.mentions ? Object.keys(event.mentions) : [];

    // War mode off
    if (content === "off") {
      isWarOn = false;
      return api.sendMessage("🌧️😌 War mode off", event.threadID);
    }

    // Auto turn on if mention present
    if (mentionIds.length > 0 && !isWarOn) {
      isWarOn = true;
    }

    // If war mode off, stop
    if (!isWarOn) return;

    // Require mention
    if (mentionIds.length === 0) {
      return api.sendMessage(
        "●───༆🌺●───༆༊🦋\n\n🐰✨ prince বস‌ মেনশন দেন🥹😒", 
        event.threadID
      );
    }

    const mentionId = mentionIds[0];
    const name = event.mentions[mentionId];
    const arraytag = [{ id: mentionId, tag: name }];
    const send = (msg) => api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);

    // ✅ Messages 10 variations
    const messages = [
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦 🥹💚🌩️\n\n${name}`,
      `- - 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦🥹😒😒💚\n\n${name}`,
      `𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠𝗣͟𝗔͟𝗞͟𝗞͟͠👀😘😘😘🥹💚\n\n${name}`,
      `𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠𝗕͟𝗕͟𝗕͟͠𝗬͟𝗭 😒☺️🙃🥰\n\n${name}`,
      `- 𝗦͟𝗢͟𝗥͟͠𝗥͟𝗬͟͠.. 𝗫͟𝗔͟𝗡͟͠𝗦🥹😅💚\n\n${name}`
    ];

    // ✅ Send each message with 3 second interval
    messages.forEach((msg, i) => {
      setTimeout(() => send(msg), 3000 * i);
    });
  }
};

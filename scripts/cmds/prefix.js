‎const axios = require("axios");
‎const fs = require("fs");
‎const utils = global.utils;
‎
‎module.exports = {
‎    config: {
‎        name: "prefix",
‎        version: "1.6",
‎        author: "siyam",
‎        countDown: 5,
‎        role: 0,
‎        description: "Change prefix & show prefix with video",
‎        category: "config",
‎    },
‎
‎    langs: {
‎        en: {
‎            reset: "Your prefix has been reset to default: %1",
‎            onlyAdmin: "Only admin can change system prefix",
‎            confirmGlobal: "React to confirm global prefix change",
‎            confirmThisThread: "React to confirm prefix change in this chat",
‎            successGlobal: "Global prefix updated: %1",
‎            successThisThread: "Prefix updated for this chat: %1",
‎
‎            myPrefix:
‎`●❯────────────────❮●
‎𝙒𝙀𝙇𝘾𝙊𝙈𝙀 🏴‍☠️ ＿＿＿＿＿
‎
‎— 
𝑩𝑫 𝑨𝑻𝑻𝑨𝑪𝑲 𝑪𝒀𝑩𝑬𝑹 𝑨𝑹𝑴𝒀‎👀🌪️
‎
‎— 𝙎𝙀𝙀 𝙊𝙒𝙉 𝙋𝙍𝙀𝙁𝙄𝙓  ☄️🚩
‎
‎‣ Global Prefix: %1
‎‣ Group Prefix: %2  
‎
‎‣ CEO SIYAM 🌪️☄️🏴‍☠️
‎●❯────────────────❮●`
‎        }
‎    },
‎
‎    onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
‎        if (!args[0]) return message.reply("Prefix din, or 'reset' likhen.");
‎
‎        if (args[0] === "reset") {
‎            await threadsData.set(event.threadID, null, "data.prefix");
‎            return message.reply(getLang("reset", global.GoatBot.config.prefix));
‎        }
‎
‎        const newPrefix = args[0];
‎        if (newPrefix.length > 5 || newPrefix.length === 0)
‎            return message.reply("ok start siyam ?");
‎
‎        const formSet = {
‎            commandName,
‎            author: event.senderID,
‎            newPrefix
‎        };
‎
‎        if (args[1] === "-g") {
‎            if (role < 2) return message.reply(getLang("onlyAdmin"));
‎            else formSet.setGlobal = true;
‎        } else formSet.setGlobal = false;
‎
‎        return message.reply(
‎            args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"),
‎            (err, info) => {
‎                formSet.messageID = info.messageID;
‎                global.GoatBot.onReaction.set(info.messageID, formSet);
‎                setTimeout(() => global.GoatBot.onReaction.delete(info.messageID), 60000);
‎            }
‎        );
‎    },
‎
‎    // VIDEO SYSTEM
‎    onChat: async function ({ event, message, getLang }) {
‎        if (event.body && event.body.toLowerCase() === "prefix") {
‎            try {
‎                const videoUrl = "https://files.catbox.moe/er29mx.mp4";
‎
‎                return message.reply({
‎                    body: getLang("myPrefix",
‎                        global.GoatBot.config.prefix,
‎                        utils.getPrefix(event.threadID)
‎                    ),
‎                    attachment: await global.utils.getStreamFromURL(videoUrl)
‎                });
‎
‎            } catch (e) {
‎                console.log(e);
‎                return message.reply("⚠️ return siyam 009 api //🚩");
‎            }
‎        }
‎    },
‎
‎    onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
‎        const { author, newPrefix, setGlobal } = Reaction;
‎        if (event.userID !== author) return;
‎
‎        if (setGlobal) {
‎            global.GoatBot.config.prefix = newPrefix;
‎            fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
‎            return message.reply(getLang("successGlobal", newPrefix));
‎        } else {
‎            await threadsData.set(event.threadID, newPrefix, "data.prefix");
‎            return message.reply(getLang("successThisThread", newPrefix));
‎        }
‎    }
‎};

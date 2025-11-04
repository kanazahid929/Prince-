const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.8",
		author: "NTKhang + Shiam",
		category: "events"
	},

	langs: {
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: `চলে এসেছি আমি নায়ক মিলন তোমাদের মাঝে ☄️📨✈️🧸🕸️👀\n\nকেমন আছো তোমরা 👀📨📌`,
			multiple1: "you",
			multiple2: "you guys",
			defaultWelcomeMessage: `Hello {userName}.\nWelcome {multiple} to the chat group: {boxName}\nHave a nice {session} 😊`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;

				// যদি Bot Add হয়
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

					// ভিডিও URL (Catbox)
					const videoUrl = "https://files.catbox.moe/gehwch.mp4"; // এখানে নিজের ভিডিও URL বসাও

					return message.send({
						body: getLang("welcomeMessage"),
						attachment: await drive.getFile(videoUrl, "stream")
					});
				}

				// যদি নতুন মেম্বার Join করে
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({ tag: user.fullName, id: user.userFbId });
					}

					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;

					const form = { mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null };
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
						.replace(
							/\{session\}/g,
							hours <= 10 ? getLang("session1") :
							hours <= 12 ? getLang("session2") :
							hours <= 18 ? getLang("session3") : getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.map(file => drive.getFile(file, "stream"));
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}

					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};

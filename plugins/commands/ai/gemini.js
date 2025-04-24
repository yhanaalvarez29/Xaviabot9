import axios from 'axios';

const config = {
    name: 'gemini',
    version: '1.0',
    permissions: 0,
    credits: '@jm',
    description: 'gemini ai with image support',
    usages: '[text] (reply to image)',
    cooldown: 5
};

const lang = {
    "en_US": {
        "noQuery": "provide text",
        "error": "error"
    },
    "vi_VN": {
        "noQuery": "nhập văn bản",
        "error": "lỗi"
    }
};

async function onCall({ message, args, getLang }) {
    const text = args.join(' ');
    if (!text) return message.reply(getLang("noQuery"));

    try {
        let imageUrl;
        if (message.messageReply?.attachments?.[0]?.type === "photo") {
            imageUrl = message.messageReply.attachments[0].url;
        }

        const api = `https://rapido-api.vercel.app/api/gemini?chat=${encodeURIComponent(text)}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ''}`;
        const res = await axios.get(api);
        
        message.reply(res.data.response);
    } catch {
        message.reply(getLang("error"));
    }
}

export default {
    config,
    langData: lang,
    onCall
};
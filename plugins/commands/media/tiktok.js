import { join } from "path";
import axios from "axios";

const config = {
    name: "tiktok",
    aliases: ['tk', 'tik'],
    version: "1.0.2",
    description: "Get a video from TikTok based on search",
    usage: '<keyword>',
    cooldown: 3,
    credits: "XaviaTeam parin"
}

const langData = {
    "en_US": {
        "tiktok.missingArgument": "Please provide a search keyword",
        "tiktok.noResult": "No result found",
        "tiktok.error": "An error occurred",
        "tiktok.downloading": "Downloading video, please wait..."
    },
    "vi_VN": {
        "tiktok.missingArgument": "Vui lòng cung cấp từ khóa tìm kiếm",
        "tiktok.noResult": "Không tìm thấy kết quả",
        "tiktok.error": "Đã xảy ra lỗi",
        "tiktok.downloading": "Đang tải xuống video, vui lòng đợi..."
    },
    "ar_SY": {
        "tiktok.missingArgument": "يرجى تقديم كلمة رئيسية للبحث",
        "tiktok.noResult": "لم يتم العثور على نتائج",
        "tiktok.error": "حدث خطأ",
        "tiktok.downloading": "جاري تنزيل الفيديو، يرجى الانتظار..."
    }
}

async function downloadTikTokVideo(url, cachePath) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });
        
        const writer = global.writer(cachePath);
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(true));
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function onCall({ message, args, getLang }) {
    try {
        if (!args[0]) return message.reply(getLang("tiktok.missingArgument"));
        
        message.react("⏳");
        message.reply(getLang("tiktok.downloading"));
        
        const searchTerm = encodeURIComponent(args.join(" "));
        const apiUrl = `https://rapido.zetsu.xyz/api/tk?search=${searchTerm}`;
        
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        if (!data || !data.data || data.data.length === 0) {
            message.react("❌");
            return message.reply(getLang("tiktok.noResult"));
        }
        
        const video = data.data[0];
        const videoUrl = video.video_url;
        const videoTitle = video.title;
        
        const cachePath = join(global.cachePath, `_tiktok${Date.now()}.mp4`);
        
        const success = await downloadTikTokVideo(videoUrl, cachePath);
        
        if (!success) {
            message.react("❌");
            return message.reply(getLang("tiktok.error"));
        }
        
        await message.reply({
            body: `${videoTitle}`,
            attachment: global.reader(cachePath)
        });
        
        message.react("✅");
        
        try {
            if (global.isExists(cachePath)) global.deleteFile(cachePath);
        } catch (err) {
            console.error(err);
        }
        
    } catch (err) {
        message.react("❌");
        console.error(err);
        message.reply(getLang("tiktok.error"));
    }
}

export default {
    config,
    langData,
    onCall
}

import axios from "axios";

const config = {
  name: "spotify",
  aliases: ["sp", "music", "song", "sing"],
  description: "",
  usage: "[song name]",
  cooldown: 5,
  permissions: [0],
  credits: "@jm"
};

async function onCall({ message, args }) {
  const query = args.join(" ");
  if (!query) return message.reply("Please provide a song name");

  try {
    const search = await axios.get(`https://rapido.zetsu.xyz/api/sp?query=${encodeURIComponent(query)}`);
    const track = search.data;

    if (!track || !track.url) return message.reply("Song not found");

    const durl = `https://api-spotify-dlr.vercel.app/api?url=${encodeURIComponent(track.url)}`;
    const dl = await axios.get(dlurl, { responseType: 'stream' });

    await message.reply({
      body: `${track.name}`,
      attachment: dl.data
    });

  } catch (error) {
    console.error(error);
    message.reply(`Error: ${error.message}`);
  }
}

export default {
  config,
  onCall
};

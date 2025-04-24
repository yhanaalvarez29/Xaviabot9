import axios from "axios";

const config = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get song lyrics",
  usage: "artist | song name",
  cooldown: 3,
  permissions: [0],
  credits: "api by jm"
};

async function onCall({ message, args }) {
  const query = args.join(" ");
  if (!query.includes("|")) return message.reply("Usage: artist | song name");
  
  const [artist, song] = query.split("|").map(s => s.trim());
  if (!artist || !song) return message.reply("Invalid format. Use: artist | song name");

  try {
    const { data } = await axios.get(`https://rapido.up.railway.app/api/lyrics?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
    message.reply(`${data.lyrics || "Lyrics not found"}`);
  } catch {
    message.reply("Error fetching lyrics");
  }
}

export default { config, onCall };

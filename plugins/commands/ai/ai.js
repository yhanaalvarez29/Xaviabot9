import a from 'axios';
const config = { name: "ai", aliases: ["ask"], permissions: [0], cooldown: 5, description: "Ask questions.", credits: "jm" };

function onCall({ message: m, args: ar }) {
 const system= "";
  const q = ar.join(" ");
  if (!q) return m.reply("ask a question.");
  
  m.react("⏳");
  a.get(`https://rapido.zetsu.xyz/api/ai?q=${encodeURIComponent(q)}?uid=${m.senderID}&system=${system}`)
    .then(res => {
      m.react("✅");
      m.reply(res.data.response);
    })
    .catch(() => {
      m.react("❌");
      m.reply("error.");
    });
}

export default { config, onCall };

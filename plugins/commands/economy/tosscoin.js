const config = {
  name: "flipcoin",
  _name: {
    "vi_VN": "latxu"
  },
  aliases: [""],
  description: "flip coin with bot",
  usage: "[upside/u] [bet] or [downside/d] [bet]",
  credits: "Xavia Team",
  versions: "1.0.0",
  extra: {
    minbet: 50, // The minimum bet amount
  },
};

const langData = {
  "en_US": {
    "tosscoin.userNoData": "Data User is not ready...",
    "tosscoin.invalidChoice": "Invalid choice, available choices:\n{validChoices}",
    "tosscoin.notEnoughMoney": "『𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚎𝚗𝚘𝚞𝚐𝚑 𝚖𝚘𝚗𝚎𝚢 𝚝𝚘 𝚋𝚎𝚝』.",
    "tosscoin.minmoney": "『𝙼𝚒𝚗𝚒𝚖𝚞𝚖 𝚋𝚎𝚝 𝚒𝚜 ${50} 💵』.",
    "tosscoin.win": "『🪙 𝙲𝚘𝚗𝚐𝚛𝚊𝚝𝚞𝚕𝚊𝚝𝚒𝚘𝚗𝚜 𝚈𝚘𝚞 𝚆𝚘𝚗!!! ${bet} 💵』",
    "tosscoin.lose": "『🪙 𝙰𝚠𝚠𝚠 𝙱𝚎𝚝𝚝𝚎𝚛 𝚕𝚞𝚌𝚔 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎! 𝚈𝚘𝚞 𝙻𝚘𝚜𝚝 ${bet} 💸』",
    "tosscoin.error": "An error has occurred, try again later."
      }
  };

async function onCall({ message, args, extra, getLang }) {
  const { Users } = global.controllers;
  const validChoices = ["u", "upside", "d", "downside"];

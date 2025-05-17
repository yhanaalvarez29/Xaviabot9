import crypto from "crypto";

const config = {
  name: "shoot",
  aliases: ["ballshoot", "ballshot"],
  description: "Shoot a ball and try your luck to win or lose.",
  usage: "[bet]",
  credits: "Rue",
  cooldown: 10,
  extra: {
    minbet: 100, // The minimum bet amount
    maxbet: 5000000, // The maximum bet amount (5 billion)
  },
};

const langData = {
  "en_US": {
    "ballshoot.not_enough_money": "You don't have enough money to place this bet.",
    "ballshoot.min_bet": "𝘛𝘩𝘦 𝘮𝘪𝘯𝘪𝘮𝘶𝘮 𝘣𝘦𝘵 𝘢𝘮𝘰𝘶𝘯𝘵 𝘪𝘴 ₱{minBet}. 🪙",
    "ballshoot.max_bet": "The maximum bet amount is ₱{maxBet}. 🪙",
    "ballshoot.result_win": "𝘠𝘰𝘶 𝘴𝘩𝘰𝘵 𝘵𝘩𝘦 🏀 𝘪𝘯𝘵𝘰 𝘵𝘩𝘦 𝘩𝘰𝘰𝘱 𝘢𝘯𝘥 𝘸𝘰𝘯 ₱{bet}! 🪙",
    "ballshoot.result_lose": "𝘠𝘰𝘶 𝘮𝘪𝘴𝘴𝘦𝘥 𝘵𝘩𝘦 𝘴𝘩𝘰𝘵 𝘢𝘯𝘥 𝘭𝘰𝘴𝘵 ₱{bet}. 🪙",
    "any.error": "An error occurred, please try again."

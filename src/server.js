import TelegramBot from "node-telegram-bot-api";
import { CHECKVALID, ONMESSAGE } from "./validation/valid.js";
import { MYLESSONS, MYGROUP, ABOUTME, LOGOUT } from "./buttons/buttons.js";
import 'dotenv/config'

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot('6415151263:AAHH6eAuerAdrTSTkyPxfShcZTrbwcg_c1I', {
    polling: true
});

bot.onText(/\/start/, CHECKVALID);

bot.on('message', ONMESSAGE);

bot.onText(/Mening darslarim/, MYLESSONS);

bot.onText(/Mening guruhim/, MYGROUP);

bot.onText(/Men haqimda/, ABOUTME);

bot.onText(/Profiledan chiqish/, LOGOUT);

export default bot

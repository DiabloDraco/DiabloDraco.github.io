import axios from "axios"
import sharp from "sharp"
import fs from "fs"
import bot from "../server.js";

const CHECKVALID = (msg) => {
    const userId = msg.from.id;
    const chatId = msg.chat.id;
    const message = msg.text;

    var myHeaders1 = new Headers();
    myHeaders1.append("Authorization", "Basic dGVsZWdyYW1fYm90OnRlbGVncmFtX2JvdA==");

    var requestOptions1 = {
        method: 'GET',
        headers: myHeaders1,
        redirect: 'follow'
    };

    fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(result => {
            if (result.data?.validation?.valid == true) {
                const keyboard = {
                    reply_markup: {
                        keyboard: [
                            ['Mening darslarim', 'Mening guruhim'],
                            ['Men haqimda', 'Profiledan chiqish'],
                        ],
                        resize_keyboard: true,
                    },
                };
                bot.sendMessage(chatId, 'Qaytib kelganingiz bilan tabriklaymiz!', keyboard);
            } else {
                bot.sendMessage(chatId, 'Foydalanuvchi tokenini kiriting')
            }
        })
}

const ONMESSAGE = async (msg) => {
    const userId = msg.from.id;
    const chatId = msg.chat.id;
    const message = msg.text;

    var myHeaders1 = new Headers();
    myHeaders1.append("Authorization", "Basic dGVsZWdyYW1fYm90OnRlbGVncmFtX2JvdA==");

    var requestOptions1 = {
        method: 'GET',
        headers: myHeaders1,
        redirect: 'follow'
    };

    fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.data?.validation?.valid == false) {
                fs.appendFile('readme.log', `\n date: ${new Date().toString()} user: ${userId}  message: ${message}`, (err) => {
                    if (err) throw err;
                })


                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic dGVsZWdyYW1fYm90OnRlbGVncmFtX2JvdA==");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/check_user-app?token=${message}&id=${userId}`, requestOptions)
                    .then(response1 => response1.json())
                    .then(result1 => {
                        console.log(result1);
                        if (result1.data?.validation?.valid == true) {
                            bot.sendMessage(chatId, 'Foydalanuvchi tokeni to\'g\'ri')
                            const keyboard = {
                                reply_markup: {
                                    keyboard: [
                                        ['Mening darslarim', 'Mening guruhim'],
                                        ['Men haqimda', 'Profiledan chiqish'],
                                    ],
                                    resize_keyboard: true,
                                },
                            };
                            bot.sendMessage(chatId, 'Теперь вы можете использовать кнопки:', keyboard);
                        } else {
                            bot.sendMessage(chatId, 'Foydalanuvchi tokenini kiriting')
                        }
                    })
                    .catch(error => console.log('error', error.message));
            } else {
                fs.appendFile('readme.log', `\n date: ${new Date().toString()} user: ${userId}  message: ${message}`, (err) => {
                    if (err) throw err;
                })

            }
        })
        .catch(error => console.log('error', error.message));
}

export { CHECKVALID, ONMESSAGE }
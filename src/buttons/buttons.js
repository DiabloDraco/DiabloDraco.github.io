import axios from "axios"
import sharp from "sharp"
import bot from "../server.js";

const MYLESSONS = async (msg) => {
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

    await fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(result => {

            if (result.data?.validation?.valid == true) {
                const chatId = msg.chat.id;


                bot.sendMessage(chatId, 'Сизнинг дарсларингиз мавжуд емас!');
            }
        })

}

const MYGROUP = async (msg) => {
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

    await fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(async (result) => {
            if (result.data?.validation?.valid == true) {
                const chatId = msg.chat.id;

                try {
                    await fetch(`https://api.kasbiy-talim.uz/api/v1/get-group-app?id=${userId}`, requestOptions1).then(res => res.json()).then(data => {
                        console.log(data);
                        let captionText = `Guruh nomi: <b>${data.data.group_name}</b> \n O\'quvchilar soni: <b>${data.data.all_students}</b> \n O'qituvchi ismi: <b>${data.data.full_name}</b> \n O'qish boshlanish sanasi: <b>${data.data.begin_date}</b> \n Tugash sanasi: <b>${data.data.end_date}</b> \n Yo'nalish nomi: <b>${data.data.name1}</b> \n Kurs nomi: <b>${data.data.course_name}</b>`

                        bot.sendMessage(chatId, captionText, {
                            parse_mode: "HTML"
                        })
                    })
                } catch (error) {
                    bot.sendMessage(chatId, 'Сизнинг гурухингиз мавжуд эмас !');
                }
            }
        })
}

const ABOUTME = async (msg) => {
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

    await fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(async (result) => {
            if (result.data?.validation?.valid == true) {
                const chatId = msg.chat.id;

                try {
                    await fetch(`https://api.kasbiy-talim.uz/api/v1/telegram_about-app?id=${userId}`, requestOptions1).then(res => res.json()).then(data => {
                        const photoPath = `https://api.kasbiy-talim.uz/uploads/files/${data.data.photo}`; // Укажите путь к изображению
                        const captionText = `Ismi: ${data.data.name} \n JSHSHIR: ${data.data.iden_num}\n Telefon raqami: ${data.data.phone_num}\n Passport ma'lumotlari: ${data.data.passport_num} \n Adresi: ${data.data.full_address}`
                        axios({
                            method: 'get',
                            url: photoPath,
                            responseType: 'arraybuffer',
                        })
                            .then(response => {
                                const imageBuffer = Buffer.from(response.data, 'binary');

                                sharp(imageBuffer)
                                    .resize(400, 400)
                                    .jpeg({ quality: 80 })
                                    .toBuffer((err, compressedImageBuffer) => {
                                        if (err) {
                                            console.error('Ошибка при сжатии изображения:', err);
                                            return;
                                        }

                                        const imageBuffer = Buffer.from(compressedImageBuffer, 'binary');
                                        bot.sendPhoto(chatId, imageBuffer, {
                                            caption: captionText,
                                            parse_mode: 'HTML',
                                        });
                                    })
                            })
                            .catch(error => {
                                console.error('Ошибка при загрузке изображения:', error);
                            });
                    })
                } catch (error) {
                    console.log(error.message);
                    bot.sendMessage(chatId, 'Сиз хакингизда малумот топилмади!');
                }
            }
        })
}

const LOGOUT = async (msg) => {
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

    await fetch(`https://api.kasbiy-talim.uz/api/v1/telegram/valid-application?telegram=${userId}`, requestOptions1)
        .then(response => response.json())
        .then(async (result) => {
            if (result.data?.validation?.valid == true) {
                const chatId = msg.chat.id;
                try {
                    await fetch(`https://api.kasbiy-talim.uz/api/v1/logout-bot-app?id=${userId}`, requestOptions1).then(res => res.json()).then(data => {
                        bot.sendMessage(chatId, 'Foydalanuvchi tokenini kiriting')
                    })
                } catch (error) {
                    console.log(error.message);
                    bot.sendMessage(chatId, 'Сиз хакингизда малумот топилмади!');
                }
            }
        })
}

export { MYLESSONS, MYGROUP, ABOUTME, LOGOUT }
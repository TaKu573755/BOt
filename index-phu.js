const axios = require('axios');

// Thông tin xác thực của bot
const API_KEY = 'Bot 1bDO19r9tsGCgqwM6dUmp8FMMrHSlccmjknhJM0SPj3Peux6ia1W2TkNYnr0Opms'; // Thay bằng API key của bạn
const BASE_URL = 'https://api.wolvesville.com';
const CLAN_ID = 'cc5349ec-5fde-4af9-8f0d-b3a831bd8c4d'; // Thay bằng ID của clan của bạn

// Hàm để lấy nhiệm vụ hiện tại của clan
async function getActiveQuest() {
    try {
        const response = await axios.get(
            `${BASE_URL}/clans/${CLAN_ID}/quests/active`,
            {
                headers: {
                    'Authorization': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            console.log('Nhiệm vụ hiện tại của clan:', response.data);
            return response.data;
        } else {
            console.log('Không thể lấy nhiệm vụ của clan:', response.data);
        }
    } catch (error) {
        console.error('Lỗi khi lấy nhiệm vụ của clan:', error);
    }
}

// Hàm để skip thời gian chờ của nhiệm vụ
async function skipQuestWaitingTime() {
    try {
        const response = await axios.post(
            `${BASE_URL}/clans/${CLAN_ID}/quests/active/skipWaitingTime`,
            {},
            {
                headers: {
                    'Authorization': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            console.log('Đã skip thời gian chờ của nhiệm vụ thành công!');
        } else {
            console.log('Không thể skip thời gian chờ của nhiệm vụ:', response.data);
        }
    } catch (error) {
        console.error('Lỗi khi skip thời gian chờ của nhiệm vụ:', error);
    }
}

// Kiểm tra nhiệm vụ hiện tại và skip nếu cần
async function handleClanQuest() {
    const activeQuest = await getActiveQuest();

    if (activeQuest) {
        await skipQuestWaitingTime();
    }
}

// Chạy hàm để kiểm tra và skip nhiệm vụ
handleClanQuest();

module.exports = { handleClanQuest };

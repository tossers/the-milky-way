import axios from 'axios';
const baseUrl = 'http://122.144.131.206/apiCall';
const decryptUrl = 'http://122.144.131.206/decrypt';
const encryptUrl = 'http://122.144.131.206/encrypt';
let sq = 0;
const guestPwd =  '11111111111111111111111111111111'
/**
 * 加密
 * @param {string} content
 * @returns {Promise<AxiosResponse>}
 */
async function encrypt(content: object, pwd: string){
    return axios.post(encryptUrl, {
        content: JSON.stringify(content),
        pwd,
    }).then((res) => {
        return res.data;
    });
}

/**
 * 解密
 * @param {string} content
 * @returns {Promise<AxiosResponse>}
 */
async function decrypt(content: string, pwd: string){
    return axios.post(decryptUrl, {
        content,
        pwd,
    }).then((res) => {
        return res.data;
    });
}

/**
 * 获取商品基本信息(11029)
 * @returns {Promise<T>}
 */
export async function getProducts(){
    return axios.post(baseUrl, {
        hd:{
            pi: 11029,
            si: 1,
            sq: sq++,
        }
    }).then(async (res) => {
        const item = await decrypt(res.data.bd, guestPwd);
        return item.ct;
    }).catch((ex) => {
         throw new Error(ex.response.data);
    });
}

/**
 * 获取商品行情信息(10110)
 * @returns {Promise<T>}
 */
export async function getMarketInfo(){
    const bd = await encrypt({id: [1, 2, 3]} , guestPwd);
    return axios.post(baseUrl, {
        hd: {
            pi: 10110,
            si: 1,
            sq: sq++,
        },
        bd,
    }).then(async (res) => {
        const item = await decrypt(res.data.bd, guestPwd);
        return item.qn;
    }).catch((ex) => {
        throw new Error(ex.response.data);
    });
}

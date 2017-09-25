import axios from 'axios';
import md5 from 'blueimp-md5';
import {timeParse, timeFormat} from 'd3-time-format';
const baseUrl = 'http://122.144.131.206/apiCall';
const decryptUrl = 'http://122.144.131.206/decrypt';
const encryptUrl = 'http://122.144.131.206/encrypt';
let sq = 0;
const guestPwd = '11111111111111111111111111111111';
let si = '';

/**
 * 加密
 * @param {string} content
 * @returns {Promise<AxiosResponse>}
 */
async function encrypt(content: any, pwd: string) {
    if(typeof(content) === 'object'){
        content = JSON.stringify(content);
    }
    return axios.post(encryptUrl, {
        content,
        pwd,
    }).then((res) => {
        return res.data;
    });
};

/**
 * 解密
 * @param {string} content
 * @returns {Promise<AxiosResponse>}
 */
async function decrypt(content: string, pwd: string, unzip: boolean) {
    return axios.post(decryptUrl, {
        content,
        pwd,
        unzip,
    }).then((res) => {
        return res.data;
    });
}

/**
 * 获取k线数据 10118
 * @param {number} id
 * @param {string} kt K线类型 STRING  "M"：分钟线, "Q"：15分钟线, "H"：小时线, "d"：日线, "m"：月线,"y"：年线, "w"：周线, "M5"：5分钟线, "M30"：30分钟线, "H2"：2小时线, "H4"：4小时线
 * @param {number} b
 * @param {string} d 方向 STRING  "P"：正向(表示从b时间之后的c根K线), "N"：负向(表示从b时间之前的c根K线)
 * @returns {Promise<*>}
 *
 */
export async function getKLineData(id: number, kt: string, b: number, c: number, d: string) {
    const bd = await encrypt({
        kqn: [{
            id,                                       //合约id
            kt,                                       //K线类型,区分大小写,必填字段,string类型
            b: timeFormat('%Y-%m-%d %H:%M:%S')(b),         //起始时间,必填字段,string类型,格式yyyy-mm-dd HH:MM:SS
            c,                                        //根数,必填字段,int类型
            d,                                        //方向,必填字段,string类型
        }]
    }, guestPwd);
    return axios.post(baseUrl, {
        hd: {
            pi: 10118,
            si: 1,
            sq: sq++,
        },
        bd,
    }).then(async (res) => {
        let item = await decrypt(res.data.bd, guestPwd, true);
        let data = item.split(';').slice(0, length - 1);
        // console.log(data);
        return data.map(m => {
            let member = m.split('|');
            let date = timeParse('%Y%m%d%H%M%S')(member[2]);
            return {
                id:       Number(member[0]),              //合约id
                type:     member[1],                      //k线类型
                date,                                     //行情时间
                open:     Number(member[4]),              //开盘价
                high:     Number(member[5]),              //最高价
                low:      Number(member[6]),              //最低价
                close:    Number(member[7]),              //收盘价
                nVolume:  Number(member[8]),              //现量
                turnover: Number(member[9]),              //成交额
                volume:   Number(member[10]),             //成交量
            };
        });
    });
}

/**
 * 获取分时数据10121
 * @param {number} id
 * @returns {Promise<never | AxiosResponse>}
 */
export async function getMinData(id: number) {
    const bd = await encrypt({id: [id]}, guestPwd);
    return axios.post(baseUrl, {
        hd: {
            pi: 10121,
            si: 1,
            sq: sq++,
        },
        bd,
    }).then(async (res) => {
        let item = await decrypt(res.data.bd, guestPwd, true);
        let data = item.split(';').slice(0, length - 2);
        return data.map(m => {
            let member = m.split('|');
            return {
                id:       Number(member[0]),                      //合约id
                type:     member[1],                              //k线类型
                date:     timeParse('%Y%m%d%H%M%S')(member[3]),   //行情时间
                open:     Number(member[4]),                      //开盘价
                high:     Number(member[5]),                      //最高价
                low:      Number(member[6]),                      //最低价
                close:    Number(member[7]),                      //收盘价
                nVolume:  Number(member[8]),                      //现量
                volume:   Number(member[9]),                      //成交量
                turnover: Number(member[10]),                     //成交额
            };
        });
    });
}

/**
 * 获取商品基本信息(11029)
 * @returns {Promise<T>}
 */
export async function getProducts() {
    return axios.post(baseUrl, {
        hd: {
            pi: 11029,
            si: 1,
            sq: sq++,
        }
    }).then(async (res) => {
        const item = await decrypt(res.data.bd, guestPwd, false);
        return item.ct;
    });
}

/**
 * 获取商品行情信息(10110)
 * @returns {Promise<T>}
 */
export async function getMarketInfo() {
    const bd = await encrypt({id: [1, 2, 3]}, guestPwd);
    return axios.post(baseUrl, {
        hd: {
            pi: 10110,
            si: 1,
            sq: sq++,
        },
        bd,
    }).then(async (res) => {
        const item = await decrypt(res.data.bd, guestPwd, false);
        return item.qn;
    });
}

/**
 * 获取验证码10003
 * @returns {Promise<never | any>}
 */
export async function getImgCheckCode() {
    return axios.post(baseUrl, {
        hd: {
            pi: 10003,
            sq: sq++,
        },
    }).then(async (res) => {
        return JSON.parse(res.data.bd);
    });
}

/**
 * 登录10001
 * @param {string} password
 * @param {string} an
 * @param {string} vi
 * @param {string} vc
 * @returns {Promise<never | AxiosResponse>}
 */
export async function login(password: string, an: string, vi: string, vc: string) {
    const lt = Date.now();
    let cd = await encrypt(an + '|' + lt, md5(md5(md5(an+'_'+password))));
    return axios.post(baseUrl, {
        hd: {
            pi: 10001,
            sq: sq++,
        },
        bd: JSON.stringify(
            {
                ls: 2, //--- 登录源,必填字段,int类型
                lt,    //---- 登录时间,必填字段,long类型
                cd,    //---- cipherData,加密后的密文数据,必填字段,string类型
                an,    //---- accountName,账号,必填字段,string类型
                tt: 4, //---- 登录客户类型,必填字段,int类型
                vi,    //---- 验证码id,必填字段,string类型
                vc,    //---- 验证码,必填字段,string类型
                vn: 1,  // ---- 版本,必填字段,string类型 app
            }
        )
    }).then(async (res) => {
        const bd = JSON.parse(res.data.bd);
        si = bd.si;
        return {bd, hd: res.data.hd};
    });
}

/**
 * 退出登录10002
 * @param {string} si
 * @returns {Promise<{hd: ({pi; si; sq} | any | {pi; sq})}>}
 */
export async function logout() {
    return axios.post(baseUrl, {
        hd: {
            pi: 10002,
            si,
            sq: sq++,
        },
    }).then(async (res) => {
        return res.data.hd;
    });
}

/**
 * 注册前获取账号 10008
 * @param {string} regtype
 * @param {string} an
 * @param {string} qr
 * @returns {Promise<AxiosResponse>}
 */
export async function getAccount(regtype: number, an: string, qr: number) {
    return axios.post(baseUrl, {
        hd: {
            pi: 10008,
            si: 1,
            sq: sq++,
        },
        bd: JSON.stringify(
            {
                regtype, //----账号类型,必填字段,string类型 -1 获取新账号登录时写死2
                an,      //---- accountName,账号,必填字段,string类型
                qr,      //----邀请码,必填字段,string类型, 登录时写死111111
            }
        )
    }).then(async (res) => {
        return JSON.parse(res.data.bd);
    });
}

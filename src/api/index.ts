import axios from 'axios';
const baseUrl = 'http://122.144.131.206/apiCall';
const transitionUrl = 'http://122.144.131.206/decrypt';
let sq = 0;

async function transition(content: string){
    return axios.post(transitionUrl, {
        content,
        pwd: '11111111111111111111111111111111'
    }).then((res) => {
        console.log(res.data)
        return res.data;
    });
}

export async function getProducts(){
    return axios.post(baseUrl, {
        hd:{
            pi: 11029,
            si: 1,
            sq: sq++,
        }
    }).then(async (res) => {
        return await transition(res.data.bd);
    }).catch((ex) => {
        // throw new Error(ex.response.data);
    });
}
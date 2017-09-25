import {action, observable} from 'mobx';
import {getImgCheckCode, login, getAccount, logout} from '../api';

class User{
    @observable imgCheckCode: string = '点击获取';
    @observable imgCheckCodeId: string;
    @observable isLogin: boolean = false;
    @observable name: string = 'guest';

    @action
    getImgCheckCode(){
        getImgCheckCode().then((res) => {
            this.imgCheckCodeId = res.id;
            this.imgCheckCode = `data:image/gif;base64,${res.img}`;
        }).catch((ex) => {
            this.imgCheckCode = '获取失败';
        });
    }

    @action
    async login(password: string, an: string, imgCheckCode: string){
        if(an.length === 11){
            an = await getAccount(2, an, 111111).then((res) => {
                return res.account;
            });
        }

        return login(password, an, this.imgCheckCodeId, imgCheckCode).then((data) => {
            const {bd, hd} = data;
            if(hd.rid < 0){
                throw new Error(hd.rmsg);
            }else {
                const {name} = bd;
                this.name = name;
                this.isLogin = true;
            }
        });
    }

    @action
    async logout(){
        logout().then((res) =>{
            if(res.rid >= 0){
                this.isLogin = false;
            }else {
                throw new Error(res.rmsg);
            }
        });
    }
}

export default new User();
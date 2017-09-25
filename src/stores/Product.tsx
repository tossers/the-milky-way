import {action, observable, computed} from 'mobx';
import {getProducts, getMarketInfo} from '../api';
import {MarketInfoModel} from '../routes/App';

export class Product{
    @observable productList: {id: number, name: string}[] = [];
    @observable productInfoList: MarketInfoModel[] = [];
    @observable currProduct: MarketInfoModel;
    @observable newPrice: number;

    @action
    async getProducts(){
        return getProducts().then((list)=>{
            this.productList = list;
        });
    }

    @action
    async getMarketInfo(){
        return getMarketInfo().then((list) => {
            this.productInfoList = list;
        });
    }

    @action
    setCurrProduct(currProduct: MarketInfoModel){
        this.currProduct = currProduct;
    }

    // @computed
    // get getCurrProductId(){
    //     if(this.currProductId){
    //         return this.currProductId;
    //     }else {
    //         if(this.productInfoList.length > 0){
    //             return this.productInfoList[0].id;
    //         }else {
    //             return null;
    //         }
    //     }
    // }

    @computed
    get marketInfoList(){
        if(this.productInfoList.length > 0){
            return this.productInfoList.map((item, index) => {
                const {id, yrp, n} = item;
                const zdf = ((n - yrp) / yrp * 100).toFixed(3) + '%';
                const temp = this.productList.find((obj) => obj.id === id);
                return Object.assign(item,{key: index, name: temp ? temp.name: '', zdf, market: '陕'});
            });
        }else{
            return [];
        }

    }
}

export default new Product();
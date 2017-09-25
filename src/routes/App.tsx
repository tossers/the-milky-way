import * as React from 'react';
import {Row, Col, message} from 'antd';
import {UserInfo} from '../components/UserInfo';
import {Entrust} from '../components/Entrust';
import {Market} from '../components/Market';
import Header from '../components/Header';
import {inject} from 'mobx-react';
import MinChart from '../components/Chart/MinChart';
// import {getKLineData} from '../api';

export interface MarketInfoModel{
    //---自己组装的
    key:  number;
    name: string;
    zdf:  string;    //----涨跌幅
    market: string;  //'陕'
    //---10110协议
    id:   number;    //----合约id,必填字段,int类型
    yrp:  number;    //----昨结价,必填字段,double类型
    ycp:  number;    //----昨收价,必填字段,double类型
    o:    number;    //----开盘价,必填字段,double类型
    h:    number;    //----最高价,必填字段,double类型
    l:    number;    //----最低价,必填字段,double类型
    n:    number;    //----最新价,必填字段,double类型
    cv:   number;    //----现量,必填字段,double类型
    v:    number;    //----成交量(日累计),必填字段,double类型
    tr:   number;    //----成交额,必填字段,double类型
    hv:   number;    //----持仓量,必填字段,double类型
    qt:   number;    //----行情时间,必填字段,string类型,格式yyyy-mm-dd HH:MM:SS
}

// const initCurrProduct: MarketInfoModel = {
//     //---自己组装的
//     key:  0,
//     name: '没有数据',
//     zdf:  '0.00%',
//     market: '',
//     //---10110协议
//     id:   0,
//     yrp:  0,
//     ycp:  0,
//     o:    0,    //----开盘价,必填字段,double类型
//     h:    0,    //----最高价,必填字段,double类型
//     l:    0,    // ----最低价,必填字段,double类型
//     n:    9999,    // ----最新价,必填字段,double类型
//     cv:   0,    //----现量,必填字段,double类型
//     v:    0,    //----成交量(日累计),必填字段,double类型
//     tr:   0,    // ----成交额,必填字段,double类型
//     hv:   0,    // ----持仓量,必填字段,double类型
//     qt:   0,    //----行情时间,必填字段,string类型,格式yyyy-mm-dd HH:MM:SS
// };

interface Props{
    name: string;
    isLogin: boolean;
    currProduct: MarketInfoModel;
    onMessage: boolean;
    marketInfoList: MarketInfoModel[];
    getMarketInfo: () => Promise<void>;
    getProducts: () => Promise<void>;
    connectWS:() => void;
    setOnMessage: (flag: boolean) => void;
    setCurrProduct: (product: MarketInfoModel) => void;
    logout: () => Promise<void>;
}

class App extends React.Component< Props, {} >{
    componentWillMount() {
        // getKLineData(1, 'M', Date.now() - 10*60*1000, 'P' );
        this.props.getProducts().then(async () => {
            await this.props.getMarketInfo();
            this.props.connectWS();
        }).catch((ex) => {
            console.log(ex);
            message.error(ex.message);
        });
    }

    componentWillReceiveProps(nextProps: {onMessage: boolean, currProduct: MarketInfoModel, marketInfoList:MarketInfoModel[]}){
        const {onMessage, marketInfoList, currProduct} = nextProps;
        if(onMessage){
            this.props.setOnMessage(false);
            this.props.getMarketInfo();
        }

        if(marketInfoList.length> 0 && !currProduct){
            this.props.setCurrProduct(marketInfoList[0]);
        }else {
            let temp = marketInfoList.find((item) => item.id === currProduct.id);
            if(temp && temp.qt !== currProduct.qt){
                this.props.setCurrProduct(temp);
            }
        }
    }

    render() {
        const {marketInfoList, currProduct, setCurrProduct, name, isLogin, logout} = this.props;

        return (
            <Row style={{minWidth: '1300px', height: '100%'}}>
                <Col span={24}><Header logout={logout} name={name} isLogin={isLogin}/></Col>
                <Col span={6} style={{padding: '2px'}}><Market setCurrProduct={setCurrProduct} dataSource={marketInfoList}/></Col>
                <Col span={12} style={{padding: '2px'}}><MinChart setCurrProduct={setCurrProduct} currProduct={currProduct} marketInfoList={marketInfoList}/></Col>
                <Col span={6} style={{padding: '2px'}}><Entrust currProduct={currProduct}/></Col>
                <Col span={24} style={{height: 'calc(100% - 700px)', marginTop: '20px', padding: '2px'}}><UserInfo/></Col>
            </Row>
        );
    }
}

export default inject( (stores): Props => {
    return {
        name: stores.userStore.name,
        isLogin: stores.userStore.isLogin,
        currProduct: stores.productStore.currProduct,
        onMessage: stores.wsStore.onMessage,
        marketInfoList: stores.productStore.marketInfoList,
        getMarketInfo: async () => stores.productStore.getMarketInfo(),
        getProducts: async () => stores.productStore.getProducts(),
        setCurrProduct: (product: MarketInfoModel) => stores.productStore.setCurrProduct(product),
        connectWS: () => stores.wsStore.getInstance(),
        setOnMessage: (flag: boolean) => stores.wsStore.setOnMessage(flag),
        logout: async () => stores.userStore.logout(),
    };
})(App);
import * as React from 'react';
import {Card, Row, Col, message} from 'antd';
import {UserInfo} from '../components/UserInfo';
import {Entrust} from '../components/Entrust';
import {Market} from '../components/Market';
import {Header} from '../components/Header';
import {inject} from 'mobx-react';

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
    l:    number;    // ----最低价,必填字段,double类型
    n:    number;    // ----最新价,必填字段,double类型
    cv:   number;    //----现量,必填字段,double类型
    v:    number;    //----成交量(日累计),必填字段,double类型
    tr:   number;    // ----成交额,必填字段,double类型
    hv:   number;    // ----持仓量,必填字段,double类型
    qt:   number;    //----行情时间,必填字段,string类型,格式yyyy-mm-dd HH:MM:SS
}

const initCurrProduct: MarketInfoModel = {
    //---自己组装的
    key:  0,
    name: '没有数据',
    zdf:  '0',
    market: '',
    //---10110协议
    id:   0,
    yrp:  0,
    ycp:  0,
    o:    0,    //----开盘价,必填字段,double类型
    h:    0,    //----最高价,必填字段,double类型
    l:    0,    // ----最低价,必填字段,double类型
    n:    0,    // ----最新价,必填字段,double类型
    cv:   0,    //----现量,必填字段,double类型
    v:    0,    //----成交量(日累计),必填字段,double类型
    tr:   0,    // ----成交额,必填字段,double类型
    hv:   0,    // ----持仓量,必填字段,double类型
    qt:   0,    //----行情时间,必填字段,string类型,格式yyyy-mm-dd HH:MM:SS
};

class App extends React.Component<{
    currProductId: number;
    onMessage: boolean;
    marketInfoList: MarketInfoModel[];
    getMarketInfo: () => Promise<void>;
    getProducts: () => Promise<void>;
    connectWS:() => void;
    setOnMessage: (flag: boolean) => void;
    setCurrProductId: (id: number) => void;
}, {} >{
    componentWillMount() {
        this.props.getProducts().then(async () => {
            await this.props.getMarketInfo();
            this.props.connectWS();
        }).catch((ex) => {
            message.error(ex.message);
        });
    }

    componentWillReceiveProps(nextProps: {onMessage: boolean}){
        if(nextProps.onMessage){
            this.props.setOnMessage(false);
            this.props.getMarketInfo();
        }
    }

    render() {
        const {marketInfoList, currProductId, setCurrProductId} = this.props;
        let currProduct = marketInfoList.find(obj => obj.id === currProductId);
        if(!currProduct){
            currProduct = initCurrProduct;
        }

        return (
            <Row style={{minWidth: '1300px', height: '100%'}}>
                <Col span={24}><Header /></Col>
                <Col span={6} style={{padding: '2px'}}><Market setCurrProductId={setCurrProductId} dataSource={marketInfoList}/></Col>
                <Col span={12} style={{padding: '2px'}}><Card style={{height: '600px'}}>图表</Card></Col>
                <Col span={6} style={{padding: '2px'}}><Entrust currProduct={currProduct}/></Col>
                <Col span={24} style={{height: 'calc(100% - 700px)', marginTop: '20px', padding: '2px'}}><UserInfo/></Col>
            </Row>
        );
    }
}

export default inject( (stores) => {
    return {
        currProductId: stores.productStore.getCurrProductId,
        onMessage: stores.wsStore.onMessage,
        marketInfoList: stores.productStore.marketInfoList,
        getMarketInfo: async () => stores.productStore.getMarketInfo(),
        getProducts: async () => stores.productStore.getProducts(),
        setCurrProductId: (id: number) => stores.productStore.setCurrProductId(id),
        connectWS: () => stores.wsStore.getInstance(),
        setOnMessage: (flag: boolean) => stores.wsStore.setOnMessage(flag),
    };
})(App);
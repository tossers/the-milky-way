import * as React from 'react';
import {Row, Col, Button, Card} from 'antd';
import './Entrust.css';
import {MarketInfoModel} from '../routes/App';

// import * as upImg from '../image/涨.png';

export class Entrust extends React.Component<{
    currProduct: MarketInfoModel;
}, {}> {
    render() {
        const {currProduct} = this.props;
        return (
            <Card style={{height: '600px'}} bodyStyle={{padding: '0'}}>
                <h1 style={{
                    textAlign: 'center',
                    marginTop: '12px'
                }}>{`[${currProduct.market}]${currProduct.name}`}</h1>
                <Row justify="center">
                    <Col span={12} style={{textAlign: 'center'}}>
                        <span style={{fontSize: '30px', color: '#DD5B64'}}>{currProduct.n.toFixed(1)}<img
                            style={{height: '22px', marginLeft: '2px'}} alt="" src={'image/涨.png'}/></span>
                        <Button type="primary" className="entrustBtn" style={{background: '#DD5B64'}}>
                            <img alt="" src="image/订货.png"/>订货</Button>
                        <div className="underBtn"><span>最高</span><span style={{color: '#DD5B64'}}>{currProduct.h}</span></div>
                        <div className="underBtn"><span>最低</span><span style={{color: '#5BB677'}}>{currProduct.l}</span></div>
                    </Col>
                    <Col span={12} style={{textAlign: 'center'}}>
                        <span style={{fontSize: '30px', color: '#DD5B64'}}/>
                        <span style={{
                            fontSize: '18px',
                            marginRight: '20px',
                            color: '#DD5B64',
                        }}>{(currProduct.n - currProduct.yrp).toFixed(1)}</span>
                        <span style={{
                            fontSize: '18px',
                            color: '#DD5B64',
                        }}>{currProduct.zdf}</span>
                        <Button type="primary" className="entrustBtn" style={{background: '#5BB677'}}>
                            <img alt="" src="image/回购.png"/>回购</Button>
                        <div className="underBtn"><span>今开</span><span style={{color: '#5BB677'}}>{currProduct.o}</span></div>
                        <div className="underBtn"><span>昨收</span><span style={{color: '#9c9999'}}>{currProduct.ycp}</span></div>
                    </Col>
                </Row>
            </Card>
        );
    }
}
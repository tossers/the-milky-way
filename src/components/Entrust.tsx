import * as React from 'react';
import {Row, Col, Button, Card} from 'antd';
import './Entrust.css';
// import * as upImg from '../image/涨.png';

export class Entrust extends React.Component<{}, {}> {
    render() {
        return (
            <Card style={{height: '600px'}} bodyStyle={{padding: '0'}}>
                <h1 style={{textAlign: 'center', marginTop: '12px'}}>[陕]AG3000银制品</h1>
                <Row  justify="center">
                    <Col span={12} style={{textAlign: 'center'}}>
                        <span style={{fontSize: '30px', color: '#DD5B64'}}>13056.0<img style={{height: '22px', marginLeft: '2px'}} alt="" src={'image/涨.png'}/></span>
                        <Button type="primary" className="entrustBtn" style={{background: '#DD5B64'}}><img alt="" src="image/订货.png"/>订货</Button>
                        <div className="underBtn"><span>最高</span><span style={{color: '#DD5B64'}}>13067.0</span></div>
                        <div className="underBtn"><span>最低</span><span style={{color: '#5BB677'}}>13030.0</span></div>
                    </Col>
                    <Col span={12} style={{textAlign: 'center'}}>
                        <span style={{fontSize: '30px', color: '#DD5B64'}} />
                        <span style={{
                            fontSize: '18px',
                            marginRight: '20px',
                            color: '#DD5B64',
                        }}>-3.00</span>
                        <span style={{
                            fontSize: '18px',
                            color: '#DD5B64',
                        }}>-0.02%</span>
                        <Button type="primary" className="entrustBtn" style={{background: '#5BB677'}}><img alt="" src="image/回购.png"/>回购</Button>
                        <div className="underBtn"><span>今开</span><span style={{color: '#5BB677'}}>13046.0</span></div>
                        <div className="underBtn"><span>昨收</span><span style={{color: '#9c9999'}}>13055.0</span></div>
                    </Col>
                </Row>
            </Card>
        );
    }
}
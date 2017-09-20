import * as React from 'react';
import {Card, Row, Col, Table, Button} from 'antd';
import {positionDataSource} from '../mock/mock';
import './UserInfo.css';

export class UserInfo extends React.Component<{}, {}> {
    title(){
        return (
            <div>
                <Button type={'primary'} size={'large'} className="tableTitleBtn" style={{background: '#fff', color: '#DD5B64'}}>持仓(1)</Button>
                <Button type={'primary'} size={'large'} className="tableTitleBtn" style={{background: '#DDE3E6', color: 'rgba(0,0,0,.65)'}}>交易记录</Button>
            </div>
        );
    }
    render() {
        const columns = [{
            title: '产品',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '方向',
            dataIndex: 'direction',
            key: 'direction',
            render: (text) => (
                <span>
                    {
                        text.toLowerCase() === 'buy' ?
                            <span style={{padding: '2px 5px', borderRadius: '50%', background: 'rgb(221, 91, 100)', color: '#fff'}}>买</span>:
                            <span style={{padding: '2px 5px', borderRadius: '50%', background: 'rgb(91, 182, 119)', color: '#fff'}}>卖</span>
                    }
                </span>
            )
        }, {
            title: '手数',
            dataIndex: 'lot',
            key: 'lot',
        }, {
            title: '浮动盈亏',
            dataIndex: 'range',
            key: 'range',
        }, {
            title: '买入价',
            dataIndex: 'buyPrice',
            key: 'buyPrice',
        }, {
            title: '最新价',
            dataIndex: 'lastPrice',
            key: 'lastPrice',
        }, {
            title: '止盈',
            dataIndex: 'stopPro',
            key: 'stopPro',
        }, {
            title: '止损',
            dataIndex: 'stopLoss',
            key: 'stopLoss',
        }, {
            title: '开仓时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '持仓单号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '',
            dataIndex: 'operation',
            key: 'operation',
            width: '20%',
            render: () => (
                <div>
                    <Button className={'operationBtn'} style={{background: '#34659B'}} type={'primary'}>设置止盈/止损</Button>
                    <Button className={'operationBtn'} style={{background: '#e58c35'}} type={'primary'}>平仓</Button>
                </div>
            )

        }];

        return (
            <Card title={<span style={{background: 'background: rgb(235, 239, 241, 0.3)'}}>账户信息</span>} style={{padding: '0 2px', borderBottom: '0'}} bodyStyle={{padding: '0'}} noHovering={true}>
                <Row>
                    <Col span={4} style={{paddingRight: '5px'}}>
                        <Card className="assetsCard">
                            <ul>
                                <li><img alt="" src={'image/金三角.png'}/>黄河金三角账号：<span>360000000097</span></li>
                                <li>总资金：<span>797,888.00</span></li>
                                <li>浮动盈亏：<span>+1,763.00</span></li>
                                <li>占用资金：<span>3,200.00</span></li>
                                <li>可用资金：<span>794,688</span></li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card className="assetsCard">
                            <ul>
                                <li><img alt="" src={'image/南交所.png'}/>南交所账号：<span>360000000097</span></li>
                                <li>总资金：<span>797,888.00</span></li>
                                <li>浮动盈亏：<span>+1,763.00</span></li>
                                <li>占用资金：<span>3,200.00</span></li>
                                <li>可用资金：<span>794,688</span></li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card className="assetsCard" style={{background: '#fff'}} bodyStyle={{padding: '0'}}>
                            <Table
                                columns={columns}
                                dataSource={positionDataSource}
                                title={this.title}
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}
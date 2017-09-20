import * as React from 'react';
import {Table, Row, Col, Button, Card} from 'antd';
import {marketDataSource} from '../mock/mock';
import './Market.css';

export class Market extends React.Component<{}, {}> {
    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 0.4,
        }, {
            title: '最新价',
            dataIndex: 'lastPrice',
            key: 'lastPrice',
            width: 0.2,
            render: (text: string, record: { type: string }) => <span
                style={{color: record.type === 'buy' ? '#DD5B64' : '#5BB677'}}>{text}</span>
        }, {
            title: '涨跌幅',
            dataIndex: 'priceRange',
            key: 'priceRange',
            width: 0.2,
            render: (text: string, record: { type: string }) => (
                <span
                    style={{
                        background: record.type === 'buy' ? '#DD5B64' : '#5BB677',
                        color: '#fff',
                        padding: record.type === 'buy' ? '2px 5px' : '2px 8px',
                        borderRadius: '3px',
                    }}>
                {text}
                </span>
            )
        }, {
            title: '交易量',
            dataIndex: 'volume',
            key: 'volume',
            width: 0.2,
            render: (text: string) => <span style={{color: '#DD5B64'}}>{text}</span>
        }];

        return (
            <Card style={{position: 'relative', height: '600px'}} bodyStyle={{padding: 0}} noHovering={true}>
                <Table
                    columns={columns}
                    dataSource={marketDataSource}
                    pagination={false}/>
                <Row style={{width: '100%', position: 'absolute', bottom: '0'}}>
                    <Col span={8}><Button type={'primary'} className="marketBtn"
                                          style={{background: '#fff', color: '#DD5B64'}}>自选</Button></Col>
                    <Col span={8}><Button type={'primary'} className="marketBtn" style={{
                        background: 'rgb(235, 239, 241)',
                        color: 'rgba(0,0,0,.65)'
                    }}>黄河金三角</Button></Col>
                    <Col span={8}><Button type={'primary'} className="marketBtn" style={{
                        background: 'rgb(235, 239, 241)',
                        color: 'rgba(0,0,0,.65)'
                    }}>南交所</Button></Col>
                </Row>
            </Card>
        );
    }
}
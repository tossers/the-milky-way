import * as React from 'react';
import {Table, Row, Col, Button, Card} from 'antd';
import './Market.css';

export class Market extends React.Component<{
    dataSource: {}[];
    setCurrProductId: (id: number) => void;
}, {}> {
    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 0.4,
            render: (text, record) => `[${record.market}]${text}`,
        }, {
            title: '最新价',
            dataIndex: 'n',
            key: 'n',
            width: 0.2,
            render: (text: string, record: { type: string }) => (<span style={{color: record.type === 'buy' ? '#DD5B64' : '#5BB677'}}>{text}</span>)
        }, {
            title: '涨跌幅',
            dataIndex: 'zdf',
            key: 'zdf',
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
            dataIndex: 'v',
            key: 'v',
            width: 0.2,
            render: (text: string) => <span style={{color: '#DD5B64'}}>{text}</span>
        }];
        const {dataSource, setCurrProductId} = this.props;
        return (
            <Card style={{position: 'relative', height: '600px'}} bodyStyle={{padding: 0}} noHovering={true}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    onRowClick={(record: {id: number}, index, event) => setCurrProductId(record.id)}
                />
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
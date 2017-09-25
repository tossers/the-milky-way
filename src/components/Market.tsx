import * as React from 'react';
import {Table, Row, Col, Button, Card} from 'antd';
import './Market.css';
import {MarketInfoModel} from '../routes/App';

export class Market extends React.Component<{
    dataSource: {}[];
    setCurrProduct: (product: MarketInfoModel) => void;
}, {
    market: string;
}> {
    state = {
        market: '自选',
    };

    handleOnClick(market: string){
      this.setState({market});
    }

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
        const {dataSource, setCurrProduct} = this.props;
        const {market} = this.state;
        const chosenStyle = {background: '#fff', color: '#DD5B64'};
        const unChosenStyle = {background: 'rgb(235, 239, 241)', color: 'rgba(0,0,0,.65)'};
        return (
            <Card style={{position: 'relative', height: '600px'}} bodyStyle={{padding: 0}} noHovering={true}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    onRowClick={(record: MarketInfoModel, index, event) => setCurrProduct(record)}
                />
                <Row style={{width: '100%', position: 'absolute', bottom: '0'}}>
                    <Col span={8}>
                        <Button
                            type={'primary'}
                            className="marketBtn"
                            onClick={this.handleOnClick.bind(this, '自选')}
                            style={market === '自选'? chosenStyle: unChosenStyle}
                        >
                            自选
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            type={'primary'}
                            className="marketBtn"
                            onClick={this.handleOnClick.bind(this, '黄河金三角')}
                            style={market === '黄河金三角'? chosenStyle: unChosenStyle}>
                            黄河金三角
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            type={'primary'}
                            className="marketBtn"
                            onClick={this.handleOnClick.bind(this, '南交所')}
                            style={market === '南交所'? chosenStyle: unChosenStyle}>
                            南交所
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}
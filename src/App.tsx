import * as React from 'react';
import {Card, Row, Col} from 'antd';
import {UserInfo} from './components/UserInfo';
import {Entrust} from './components/Entrust';
import {Market} from './components/Market';

class App extends React.Component {
  render() {
    return (
        <Row style={{minWidth: '1300px'}}>
            <Col span={6} style={{padding: '2px'}}><Market /></Col>
            <Col span={12} style={{padding: '2px'}}><Card style={{height: '600px'}}>图表</Card></Col>
            <Col span={6} style={{padding: '2px'}}><Entrust /></Col>
            <Col span={24} style={{marginTop: '20px', padding: '2px'}}><UserInfo /></Col>
        </Row>
    );
  }
}

export default App;

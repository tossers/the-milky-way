import {action, observable} from 'mobx';
import {notification} from 'antd';
import {Throttle} from '../api/Throttle';
const webSocketUrl: string = `ws:122.144.131.205/tradeweb/tradeWebSocketServlet?hs_sid_t=1`;

// readyState
// 0        CONNECTING        连接尚未建立
// 1        OPEN              WebSocket的链接已经建立
// 2        CLOSING           连接正在关闭
// 3        CLOSED            连接已经关闭或不可用
const enum ReadyState{
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}
export class MyWebSocket{
    @observable onMessage: boolean = false;

    instance: WebSocket;

    lock: boolean = true;

    throttle = new Throttle(2000, 5000, () => this.setOnMessage(true));

    @action
    setOnMessage(flag: boolean){
        this.onMessage = flag;
    }

    @action
    getInstance(){
        if(!this.instance){
            this.connect();
        }
        return this.instance;
    }

    connect(){
        this.instance = new WebSocket(webSocketUrl);

        this.instance.onopen = () => {
            return;
        };

        this.instance.onmessage = () =>{
            this.throttle.run();
        };

        this.instance.onclose = () => {
            this.reconnect();
        };

        this.instance.onerror = () => {
            this.reconnect();
        };
    }

    reconnect(){
        if(this.lock){
            this.lock = false;
            notification.error({
                key: 'wsReconnecting',
                message: 'WebSocket',
                description: 'WebSocket重连中',
                placement: 'bottomRight',
                duration: 99999999,
            });
            let cycle = setInterval(() => {
                if(this.instance.readyState === ReadyState.CONNECTING || this.instance.readyState === ReadyState.OPEN){
                    clearInterval(cycle);
                    this.lock = true;
                    notification.close('wsReconnecting');
                    notification.success({
                        message: 'WebSocket',
                        description: 'WebSocket重连成功',
                        placement: 'bottomRight',
                        duration: 5
                    });
                }else{
                    this.connect();
                }
            }, 10000);
        }
    }
}

export default new MyWebSocket();
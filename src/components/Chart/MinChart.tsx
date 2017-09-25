import * as React from 'react';
import {Card, Select, message, Spin} from 'antd';
import {format} from 'd3-format';
import {scaleTime} from 'd3-scale';
import {timeFormat, /*timeParse*/} from 'd3-time-format';
import {ChartCanvas, Chart} from 'react-stockcharts';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {AreaSeries} from 'react-stockcharts/lib/series';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {
    CrossHairCursor,
    MouseCoordinateX,
    EdgeIndicator,
    MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import {MarketInfoModel} from '../../routes/App';
import {/*getMinData*/ getKLineData} from '../../api';
import './MinChart.css';

const Option = Select.Option;

class MinChart extends React.Component<{
    width: number;
    currProduct: MarketInfoModel;
    marketInfoList: MarketInfoModel[];
    setCurrProduct: (product: MarketInfoModel) => void;
}, {
    min: { date: Date | number, close: number }[];
    loading: boolean;
}> {
    state = {
        min: [],
        loading: false,
    };

    // interval;

    componentWillMount() {
        const {currProduct} = this.props;
        if (currProduct) {
            this.changeChartById(currProduct.id);
        }
    }

    componentWillReceiveProps(nextProps: { currProduct: MarketInfoModel }) {
        const {currProduct} = nextProps;
        if (currProduct) {
            if (!this.props.currProduct) {
                this.changeChartById(currProduct.id);
            } else if (this.props.currProduct.id !== currProduct.id) {
                this.changeChartById(currProduct.id);
            }

            // let min = this.state.min as { date: Date | number, close: number }[];
            // const {qt, n} = currProduct;
            // const next = timeParse('%Y-%m-%d %H:%M:%S')(qt);
            // if (min.length > 0) {
            //     const prev = min[length - 1].date as number;
            //     if (next - prev > 60000) {
            //         min.push({close: n, date: next});
            //     } else {
            //         min[length - 1].close = n;
            //     }
            // } else {
            //     min.push({close: n, date: next});
            // }
            // this.setState({min});
        }
    }

    changeChartById(id: number) {
        let c = Math.floor((Date.now() - new Date().setHours(8, 0, 0, 0)) / 60000);
        let falg = true;
        setTimeout(() => {
            if (falg) {
                this.setState({loading: true});
            }
        }, 2000);
        getKLineData(id, 'M', Date.now(), c - 1, 'N').then((min) => {
            this.setState({min});
        }).catch((ex) => {
            message.error(ex.message);
        }).then(() => {
            falg = false;
            this.setState({loading: false});
        });
    }

    title = () => {
        const {marketInfoList, currProduct, setCurrProduct} = this.props;
        return (
            <Select onSelect={(value, options) => {
                let temp = marketInfoList.find(item => item.name === value);
                if (temp) {
                    setCurrProduct(temp);
                }
            }} value={[currProduct && currProduct.name]}>
                {
                    marketInfoList.map((item) => {
                        const {id, name} = item;
                        return (
                            <Option key={id} value={name}>{name}</Option>
                        );
                    })
                }
            </Select>
        );
    };

    render() {
        const {min, loading} = this.state;
        if (loading) {
            return (
                <Spin spinning={loading}>
                    <Card title={this.title()} className={'chart'}/>
                </Spin>
            );
        }

        const {currProduct} = this.props;
        return (
            <Card title={this.title()} className={'chart'}>
                {
                    !min.length ? <div ref="chart">暂无数据</div> :
                        <ChartCanvas ref={'chart'}
                                     ratio={1}
                                     width={this.props.width}
                                     height={570}
                                     margin={{left: 45, right: 100, top: 5, bottom: 60}}
                                     seriesName="MSFT"
                                     data={this.state.min}
                                     type={'svg'}
                                     xAccessor={(d) => {
                                         if (d) {
                                             return d.date;
                                         }
                                     }}
                                     xScale={scaleTime()}
                                     xExtents={[new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()]}
                        >
                            <Chart id={0}
                                   yExtents={d => [Math.max(0, d.close - 9), Math.min(d.close * 1.3, d.close + 9)]}>
                                <XAxis axisAt="bottom" orient="bottom"/>
                                <YAxis axisAt="left" orient="left" percentScale={true}/>
                                <AreaSeries yAccessor={d => d.close}/>
                                <EdgeIndicator
                                    itemType="last"
                                    orient="right"
                                    edgeAt="right"
                                    yAccessor={d => currProduct ? currProduct.n : (min as { close: number }[])[length - 1].close}
                                />
                                <MouseCoordinateX
                                    at="bottom"
                                    orient="bottom"
                                    displayFormat={timeFormat('%m-%d %H:%M')}/>
                                <MouseCoordinateY
                                    at="right"
                                    orient="right"
                                    displayFormat={format('.2f')}/>
                            </Chart>
                            <CrossHairCursor/>
                        </ChartCanvas>
                }
            </Card>
        );
    }
}

export default fitWidth(MinChart);
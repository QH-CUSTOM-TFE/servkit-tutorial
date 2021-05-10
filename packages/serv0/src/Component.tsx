import * as React from 'react';
import './Component.scss';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style/css';

import { sappSDK } from 'servkit';
import { CommonService } from 'servkit-example-main-decl';

interface State {
    unlisten?: (() => void);
    timetick: number;
}

export class Component extends React.Component<{}> {
    state: State = {
        timetick: -1,
    }

    public render() {
        return (
            <Layout className="root">
                { this.renderOpertions() }
            </Layout>
        )
    }

    renderOpertions() {
        const state = this.state;
        const timetick = state.timetick;
        return (
            <div className="group-content">
                <Divider orientation="left">通知操作</Divider>
                <Button onClick={this.onClickMessage}>Message</Button>
                <Button onClick={this.onClickConfirm}>Confirm</Button>
                { !state.unlisten && <Button onClick={this.onClickListenTick}>监听变化</Button> }
                { !!state.unlisten && <Button onClick={this.onClickUnlistenTick}>取消监听</Button> }
                <Divider orientation="left">当前时间</Divider>
                <div className="group-data-row">{ timetick > 0 ? (new Date(timetick)).toString() : '未监听' }</div>
                <Divider orientation="left">跳转</Divider>
                <div><a href="serv1.html">跳转到子页面</a></div>
            </div>
        )
    }

    onClickMessage = () => {
        sappSDK.service(CommonService).then((service) => {
            service.message('Hello Servkit');
        });
    }

    onClickConfirm = () => {
        sappSDK.service(CommonService).then((service) => {
            service.confirm('Hello Servkit').then((yes) => {
                if (yes) {
                    service.message('Yes clicked');
                } else {
                    service.message('No clicked');
                }
            });
        });
    }

    onClickListenTick = () => {
        sappSDK.service(CommonService).then((service) => {
            const unlisten = service.onTimeTick.on((timetick) => {
                this.setState({
                    timetick,
                });
            });

            this.setState({
                unlisten,
            });
        });
    }

    onClickUnlistenTick = () => {
        if (this.state.unlisten) {
            this.state.unlisten();
            this.setState({
                unlisten: undefined,
                timetick: -1,
            });
        }
    }
};

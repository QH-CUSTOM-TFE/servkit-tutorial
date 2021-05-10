import * as React from 'react';
import './Component.scss';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style/css';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

const { Header, Footer, Sider, Content } = Layout;

import { SappInfo } from 'servkit';
import { App } from './component/app/App';
import { sappMGR, Sapp } from 'servkit';
import { getAppList } from './config/apps';

interface Props {

}

interface State {
    apps: Sapp[];
}
export class Component extends React.Component<Props, State> {
    state: State = {
        apps: [],
    };

    public render() {
        return (
            <Layout className="root">
                <Content className="content">
                    <Header className="content-header">主应用</Header>
                    {this.renderAppStore()}
                </Content>
                {this.renderApps()}
            </Layout>
        )
    }
    renderAppStore() {
        const apps = getAppList();
        return (
            <Content className="group-content store-content">
                <Divider orientation="left">应用商店</Divider>
                <div className="store-content-app-list">
                {
                    apps.map((item) => {
                        return (
                            <Button key={item.id} onClick={() => this.onClickApp(item) }>
                                {item.name}
                            </Button>
                        )
                    })
                }
                </div>
            </Content>
        );
    }

    renderApps() {
        const apps = this.state.apps;
        if (apps.length === 0) {
            return null;
        }
        
        return (
            <Sider theme="light" width="400px" className="side-container">
                {
                    apps.map((item) => {
                        return (
                            <App key={item.info.id} app={item}/>
                        );
                    })
                }
           </Sider>
        );
    }

    async onClickApp(info: SappInfo) {
        // 创建应用
        // const app = await sappMGR.create({
        //     id: 'baidu',
        //     name: '百度',
        //     version: '1.0.0',
        //     // 换成Viewer链接
        //     url: 'https://www.baidu.com',
        //     options: {
        //         // 纯网页
        //         isPlainPage: true,
        //     }
        // }, {
        //     layout: () => {
        //         const el = document.createElement('div');
        //         document.body.appendChild(el);
        //         el.style.position = 'absolute';
        //         el.style.right = '0';
        //         el.style.top = '0';
        //         el.style.width = '400px';
        //         el.style.height = '100%';
        //         el.style.zIndex = '1000';

        //         const elExit = document.createElement('div');
        //         elExit.innerText = '退出';
        //         elExit.style.position = 'absolute';
        //         elExit.style.right = '0';
        //         elExit.style.top = '0';
        //         elExit.style.width = '60px';
        //         elExit.style.height = '30px';
        //         elExit.style.zIndex = '100000';
        //         elExit.style.backgroundColor = '#EEE';
        //         elExit.addEventListener('click', () => {
        //             app.close().then(() => {
        //                 document.body.removeChild(el);
        //             });
        //         });

        //         el.appendChild(elExit);
                
        //         return {
        //             container: el,
        //         }
        //     }
        // }).catch(() => {
        //     return undefined;
        // });

        const app = await sappMGR.create(info.id, {
            dontStartOnCreate: true,
        }).catch(() => {
            return undefined;
        });
    
        if (!app) {
            message.error(`打开应用${info.name}失败`);
            return;
        }

        const apps = this.state.apps.slice();
        apps.push(app);
        this.setState({
            apps, 
        });
    
        app.closed.then(() => {
            let apps = this.state.apps;
            const i = apps.indexOf(app);
            if (i >= 0) {
                apps = apps.slice();
                apps.splice(i, 1);

                this.setState({
                    apps, 
                });
            }
            message.success(`${info.name}应用关闭`);
        }, () => {
            message.error(`${info.name}应用关闭失败`);
        });
    }
};

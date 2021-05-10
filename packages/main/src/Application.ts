import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from './Component';
import { sappMGR } from 'servkit';
import { getAppInfo } from './config/apps';
import { CommonService } from 'servkit-example-main-decl';
import { CommonServiceImpl } from './service/CommonServiceImpl';

let sInstance: Application;
export class Application {
    constructor() {
        if (sInstance) {
            throw new Error('Application instance has created');
        }

        sInstance = this;
    }

    public init() {
        // 配置应用管理
        sappMGR.setConfig({
            loadAppInfo: (mgr, id) => Promise.resolve(getAppInfo(id)),
        });

        // 添加全局服务到应用管理
        sappMGR.addServices([{
            decl: CommonService,
            impl: CommonServiceImpl
        }]);

        const commonService = sappMGR.getService(CommonService);
        setInterval(() => {
            // 在服务中触发
            commonService.onTimeTick.emit(Date.now());
        }, 1000)
    }

    public run() {
        this.render();
    }

    protected render() {
        let element = document.getElementById('root');
        if (!element) {
            element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.left = '0';
            element.style.top = '0';
            element.style.width = '800px';
            element.style.height = '600px';
            element.style.zIndex = '100000';
            
            document.body.appendChild(element);
        }
        ReactDOM.render(
            React.createElement(Component),
            element
        );
    }
};

export const app = (): Application => {
    return sInstance;
}
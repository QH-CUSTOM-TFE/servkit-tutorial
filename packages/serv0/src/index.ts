import './index.scss';
import { Application } from './Application';
import { sappSDK } from 'servkit';
import { CommonService } from 'servkit-example-main-decl';
import { mockConfig } from './mock/sdkmock';

// 小程序内通过sappSDK联通主环境
sappSDK
// 配置小程序SDK
.setConfig({
    // 唯一的通道ID
    useTerminalId: 'com.servkit.example.serv',
    // onCreate生命周期
    onCreate: async () => {
        const app = new Application();
        app.init();
        app.run();

        console.log('小程序生命周期 onCreate');
        const service = await sappSDK.service(CommonService);
        service.message('调用小程序生命周期 onCreate');
    },
    // onShow生命周期
    onShow: async (sdk, params) => {
        console.log('小程序生命周期 onShow');
        const service = await sappSDK.service(CommonService);
        service.message('调用小程序生命周期 onShow');

        if (!params.force) {
            const yes = await service.confirm('确认显示小程序?');
            return {
                dontShow: !yes,
            };
        }
    },
    // onHide生命周期
    onHide: async (sdk, params) => {
        console.log('小程序生命周期 onHide');
        const service = await sappSDK.service(CommonService);
        service.message('调用小程序生命周期 onHide');

        if (!params.force) {
            const yes = await service.confirm('确认隐藏小程序?');
            return {
                dontHide: !yes,
            };
        }
    },
    // onClose生命周期
    onClose: async () => {
        console.log('小程序生命周期 onClose');
        const services = await sappSDK.service({ common: CommonService });
        const yes = await services.common.confirm('确认关闭小程序?');
        if (!yes) {
            return {
                dontClose: !yes,
            };
        }
        
        await services.common.message('调用小程序生命周期 onClose');
    },
    // 打开mock配置，小程序可以不用依赖主环境而独立运行
    // mock: mockConfig,
})
// 启动SDK
.start();


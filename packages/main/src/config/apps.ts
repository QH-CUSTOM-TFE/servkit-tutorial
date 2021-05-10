import { SappInfo, ESappType } from 'servkit';

const infos: SappInfo[] = [
    {
        // 应用唯一ID
        id: 'serv0',
        // 应用名称
        name: '小程序',
        // 应用版本
        version: '1.0.0',
        // 应用URL
        url: 'serv0.html?version=${version}',
        options: {
            // 应用通讯唯一ID
            useTerminalId: 'com.servkit.example.serv',
        }
    },
    {
        id: 'baidu',
        name: '百度',
        version: '1.0.0',
        url: 'https://www.baidu.com',
        options: {
            // 纯网页
            isPlainPage: true,
        }
    },
];

export function getAppList() {
    return infos;
}

export function getAppInfo(id: string): SappInfo | undefined {
    return infos.filter((item) => item.id === id)[0];
}

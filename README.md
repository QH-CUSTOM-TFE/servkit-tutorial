## servkit-tutorial
展示如何使用servkit进行最小化对接。

## 运行
安装依赖: ```yarn install```

启动运行: ```yarn start```

##  目录说明

* packages
    * main：主环境应用，将通过sappMGR管理小程序和开放API注册
        * service：主应用的service实现
    * main-decl：主环境应用对外提供的service声明，主应用的实现和小程序的使用都将共享这个声明包
    * serv0：小程序应用，将通过sappSDK使用开放API和生命周期处理
    * serv1：小程序应用



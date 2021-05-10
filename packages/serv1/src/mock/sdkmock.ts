import { SappSDKMockConfig } from 'servkit';
import { CommonService } from 'servkit-example-main-decl';
import { CommonServiceImpl } from './service/CommonServiceImpl';

export const mockConfig: SappSDKMockConfig = {
    resolveServiceServerConfig: async () => {
        return {
            service: {
                services: [
                    {
                        decl: CommonService,
                        impl: CommonServiceImpl
                    },
                ]
            }
        };
    }
};

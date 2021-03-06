import { CloudFormationParseContext } from './types';
export declare type LambdaFunctionConfig = {
    name: string;
    handler: string;
    basePath?: string;
    environment?: object;
};
export declare function lambdaFunctionHandler(resourceName: any, resource: any, cfnContext: CloudFormationParseContext): LambdaFunctionConfig;
export declare function processResources(resources: {
    [key: string]: any;
}, transformResult: any, params?: {}): LambdaFunctionConfig | undefined;

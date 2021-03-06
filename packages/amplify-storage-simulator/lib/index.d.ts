import { StorageServer } from './server/S3server';
export interface StorageSimulatorDataSourceBaseConfig {
    name: string;
    type: string;
}
export declare type StorageSimulatorServerConfig = {
    port: number;
    route: string;
    localDirS3: string;
};
export declare class AmplifyStorageSimulator {
    private _server;
    private _serverConfig;
    constructor(serverConfig: StorageSimulatorServerConfig);
    start(): Promise<void>;
    stop(): void;
    readonly url: string;
    readonly getServer: StorageServer;
}

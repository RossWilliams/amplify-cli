export declare class APITest {
    private apiName;
    private transformerResult;
    private ddbClient;
    private appSyncSimulator;
    private resolverOverrideManager;
    private watcher;
    private ddbEmulator;
    private configOverrideManager;
    private projectRoot;
    start(context: any, port?: number, wsPort?: number): Promise<void>;
    stop(context: any): Promise<void>;
    private runTransformer;
    private generateCode;
    private reload;
    private generateTestFrontendExports;
    private ensureDDBTables;
    private configureLambdaDataSource;
    private watch;
    private configureDDBDataSource;
    private getAppSyncAPI;
    private startDynamoDBLocalServer;
    private getAPIBackendDirectory;
    private getResolverTemplateDirectory;
    private registerWatcher;
    private generateFrontendExports;
}

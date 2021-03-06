export declare class ResolverResourceIDs {
    static DynamoDBCreateResolverResourceID(typeName: string): string;
    static DynamoDBUpdateResolverResourceID(typeName: string): string;
    static DynamoDBDeleteResolverResourceID(typeName: string): string;
    static DynamoDBGetResolverResourceID(typeName: string): string;
    static DynamoDBListResolverResourceID(typeName: string): string;
    static ElasticsearchSearchResolverResourceID(typeName: string): string;
    static SyncResolverResourceID(typeName: string): string;
    static ResolverResourceID(typeName: string, fieldName: string): string;
}

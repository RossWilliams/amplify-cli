export declare type AuthStrategy = 'owner' | 'groups' | 'public' | 'private';
export declare type AuthProvider = 'apiKey' | 'iam' | 'oidc' | 'userPools';
export declare type ModelQuery = 'get' | 'list';
export declare type ModelMutation = 'create' | 'update' | 'delete';
export declare type ModelOperation = 'create' | 'update' | 'delete' | 'read';
export interface AuthRule {
    allow: AuthStrategy;
    provider?: AuthProvider;
    ownerField?: string;
    identityField?: string;
    identityClaim?: string;
    groupsField?: string;
    groupClaim?: string;
    groups?: string[];
    operations?: ModelOperation[];
    queries?: ModelQuery[];
    mutations?: ModelMutation[];
    and?: string;
}

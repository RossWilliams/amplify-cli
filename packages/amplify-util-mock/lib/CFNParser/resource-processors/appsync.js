"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_parser_1 = require("../field-parser");
function dynamoDBResourceHandler(resourceName, resource, cfnContext) {
    const tableName = resourceName;
    const gsis = (resource.Properties.GlobalSecondaryIndexes || []).map(gsi => {
        const p = Object.assign({}, gsi);
        delete p.ProvisionedThroughput;
        return p;
    });
    const processedResource = {
        cfnExposedAttributes: { Arn: 'Arn', StreamArn: 'StreamArn' },
        Arn: `arn:aws:dynamodb:us-east-2:123456789012:table/${tableName}`,
        Ref: tableName,
        StreamArn: `arn:aws:dynamodb:{aws-region}:{aws-account-number}:table/${tableName}/stream/${new Date().toISOString()}`,
        Properties: {
            TableName: tableName,
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: resource.Properties.KeySchema,
            AttributeDefinitions: resource.Properties.AttributeDefinitions,
        },
    };
    if (resource.Properties.LocalSecondaryIndexes) {
        processedResource.Properties.LocalSecondaryIndexes = resource.Properties.LocalSecondaryIndexes;
    }
    if (gsis.length) {
        processedResource.Properties.GlobalSecondaryIndexes = gsis;
    }
    return processedResource;
}
exports.dynamoDBResourceHandler = dynamoDBResourceHandler;
function appSyncDataSourceHandler(resourceName, resource, cfnContext) {
    const tableName = resource.Properties.Name;
    const typeName = resource.Properties.Type;
    const commonProps = {
        cfnExposedAttributes: { DataSourceArn: 'Arn', Name: 'name' },
        Arn: `arn:aws:appsync:us-east-1:123456789012:apis/graphqlapiid/datasources/${resource.Properties.Name}`,
    };
    if (typeName === 'AMAZON_DYNAMODB') {
        return Object.assign(Object.assign({}, commonProps), { name: tableName, type: 'AMAZON_DYNAMODB', config: {
                tableName,
            } });
    }
    if (typeName === 'NONE') {
        return Object.assign(Object.assign({}, commonProps), { name: resource.Properties.Name, type: 'NONE' });
    }
    if (typeName === 'AWS_LAMBDA') {
        const lambdaArn = field_parser_1.parseValue(resource.Properties.LambdaConfig.LambdaFunctionArn, cfnContext);
        return Object.assign(Object.assign({}, commonProps), { type: 'AWS_LAMBDA', name: resource.Properties.Name, LambdaFunctionArn: lambdaArn });
    }
    console.log(`Data source of type ${typeName} is not supported by local mocking. A NONE data source will be used.`);
    return Object.assign(Object.assign({}, commonProps), { name: resourceName, type: 'NONE' });
}
exports.appSyncDataSourceHandler = appSyncDataSourceHandler;
function appSyncAPIResourceHandler(resourceName, resource, cfnContext) {
    const apiId = 'amplify-test-api-id';
    const processedResource = Object.assign({ cfnExposedAttributes: { ApiId: 'ApiId', Arn: 'Arn', GraphQLUrl: 'GraphQLUrl' }, name: cfnContext.params.AppSyncApiName || 'AppSyncTransformer', defaultAuthenticationType: Object.assign(Object.assign({ authenticationType: resource.Properties.AuthenticationType }, (resource.Properties.OpenIDConnectConfig ? { openIDConnectConfig: resource.Properties.OpenIDConnectConfig } : {})), (resource.Properties.UserPoolConfig ? { cognitoUserPoolConfig: resource.Properties.UserPoolConfig } : {})), Ref: `arn:aws:appsync:us-east-1:123456789012:apis/${apiId}`, Arn: `arn:aws:appsync:us-east-1:123456789012:apis/${apiId}`, ApiId: apiId, GraphQLUrl: 'http://localhost:20002/' }, (resource.Properties.AdditionalAuthenticationProviders
        ? {
            additionalAuthenticationProviders: resource.Properties.AdditionalAuthenticationProviders.map(p => {
                return Object.assign(Object.assign({ authenticationType: p.AuthenticationType }, (p.OpenIDConnectConfig ? { openIDConnectConfig: p.OpenIDConnectConfig } : {})), (p.CognitoUserPoolConfig ? { cognitoUserPoolConfig: p.CognitoUserPoolConfig } : {}));
            }),
        }
        : {
            additionalAuthenticationProviders: [],
        }));
    return processedResource;
}
exports.appSyncAPIResourceHandler = appSyncAPIResourceHandler;
function appSyncAPIKeyResourceHandler(resourceName, resource, cfnContext) {
    const value = 'da2-fakeApiId123456'; // TODO: Generate
    const arn = `arn:aws:appsync:us-east-1:123456789012:apis/graphqlapiid/apikey/apikeya1bzhi${value}`;
    const processedResource = {
        cfnExposedAttributes: { ApiKey: 'ApiKey', Arn: 'ref' },
        ApiKey: value,
        Ref: arn,
        Arn: arn,
    };
    return processedResource;
}
exports.appSyncAPIKeyResourceHandler = appSyncAPIKeyResourceHandler;
function appSyncSchemaHandler(resourceName, resource, cfnContext) {
    const result = { cfnExposedAttributes: {} };
    if (resource && resource.Properties && resource.Properties.Definition) {
        result.definition = field_parser_1.parseValue(resource.Properties.Definition, cfnContext);
    }
    else if (resource && resource.Properties && resource.Properties.DefinitionS3Location) {
        result.definitionS3Location = field_parser_1.parseValue(resource.Properties.DefinitionS3Location, cfnContext);
    }
    else {
        throw new Error('Invalid configuration for AWS::AppSync::GraphQLSchema. Missing one of the required property (DefinitionS3Location or Definition)');
    }
    return result;
}
exports.appSyncSchemaHandler = appSyncSchemaHandler;
function appSyncResolverHandler(resourceName, resource, cfnContext) {
    const { Properties: properties } = resource;
    const requestMappingTemplate = field_parser_1.parseValue(properties.RequestMappingTemplateS3Location, cfnContext);
    const responseMappingTemplate = field_parser_1.parseValue(properties.ResponseMappingTemplateS3Location, cfnContext);
    let dataSourceName;
    let functions;
    if (properties.Kind === 'PIPELINE') {
        if (typeof properties.PipelineConfig === 'undefined') {
            throw new Error('Pipeline DataSource config is missing required property PipelineConfig');
        }
        functions = (properties.PipelineConfig.Functions || []).map(f => field_parser_1.parseValue(f, cfnContext));
    }
    else {
        dataSourceName = field_parser_1.parseValue(properties.DataSourceName, cfnContext);
    }
    return {
        cfnExposedAttributes: { FieldName: 'fieldName', ResolverArn: 'ResolverArn', TypeName: 'typeName' },
        dataSourceName,
        typeName: properties.TypeName,
        functions,
        fieldName: properties.FieldName,
        requestMappingTemplateLocation: requestMappingTemplate,
        responseMappingTemplateLocation: responseMappingTemplate,
        kind: properties.Kind || 'UNIT',
        ResolverArn: `arn:aws:appsync:us-east-1:123456789012:apis/graphqlapiid/types/${properties.TypeName}/resolvers/${properties.FieldName}`,
    };
}
exports.appSyncResolverHandler = appSyncResolverHandler;
function appSyncFunctionHandler(resourceName, resource, cfnContext) {
    const { Properties: properties } = resource;
    const requestMappingTemplate = field_parser_1.parseValue(properties.RequestMappingTemplateS3Location, cfnContext);
    const responseMappingTemplate = field_parser_1.parseValue(properties.ResponseMappingTemplateS3Location, cfnContext);
    const dataSourceName = field_parser_1.parseValue(properties.DataSourceName, cfnContext);
    return {
        ref: `arn:aws:appsync:us-east-1:123456789012:apis/graphqlapiid/functions/${resource.Properties.Name}`,
        cfnExposedAttributes: { DataSourceName: 'dataSourceName', FunctionArn: 'Ref', FunctionId: 'name', Name: 'name' },
        name: resource.Properties.Name,
        dataSourceName,
        requestMappingTemplateLocation: requestMappingTemplate,
        responseMappingTemplateLocation: responseMappingTemplate,
    };
}
exports.appSyncFunctionHandler = appSyncFunctionHandler;
//# sourceMappingURL=appsync.js.map
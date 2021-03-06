"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_parser_1 = require("./field-parser");
const CFN_DEFAULT_PARAMS = {
    'AWS::Region': 'us-east-1-fake',
    'AWS::AccountId': '12345678910',
    'AWS::StackId': 'fake-stackId',
    'AWS::StackName': 'local-testing',
};
const CFN_DEFAULT_CONDITIONS = {
    ShouldNotCreateEnvResources: true,
};
function lambdaFunctionHandler(resourceName, resource, cfnContext) {
    const name = field_parser_1.parseValue(resource.Properties.FunctionName, cfnContext);
    const handler = field_parser_1.parseValue(resource.Properties.Handler, cfnContext);
    const environment = resource.Properties.Environment && resource.Properties.Environment.Variables
        ? Object.entries(resource.Properties.Environment.Variables).reduce((acc, [varName, varValue]) => (Object.assign(Object.assign({}, acc), { [varName]: field_parser_1.parseValue(varValue, cfnContext) })), {})
        : {};
    return {
        name,
        handler,
        environment,
    };
}
exports.lambdaFunctionHandler = lambdaFunctionHandler;
function processResources(resources, transformResult, params = {}) {
    const definition = Object.entries(resources).find((entry) => entry[1].Type === 'AWS::Lambda::Function');
    if (definition) {
        return lambdaFunctionHandler(definition[0], definition[1], {
            conditions: CFN_DEFAULT_CONDITIONS,
            params: Object.assign(Object.assign({}, CFN_DEFAULT_PARAMS), params),
            exports: {},
            resources: {},
        });
    }
}
exports.processResources = processResources;
//# sourceMappingURL=lambda-resource-processor.js.map
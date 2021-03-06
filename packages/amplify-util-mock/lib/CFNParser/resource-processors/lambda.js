"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_parser_1 = require("../field-parser");
function lambdaFunctionHandler(resourceName, resource, cfnContext) {
    const name = field_parser_1.parseValue(resource.Properties.FunctionName, cfnContext);
    const handler = field_parser_1.parseValue(resource.Properties.Handler, cfnContext);
    const environment = resource.Properties.Environment && resource.Properties.Environment.Variables
        ? Object.entries(resource.Properties.Environment.Variables).reduce((acc, [varName, varValue]) => (Object.assign(Object.assign({}, acc), { [varName]: field_parser_1.parseValue(varValue, cfnContext) })), {})
        : {};
    return {
        cfnExposedAttributes: { Arn: 'arn' },
        arn: `arn:aws:lambda:{aws-region}:{aws-account-number}:function/${name}/LATEST`,
        ref: `arn:aws:lambda:{aws-region}:{aws-account-number}:function/${name}/LATEST`,
        name,
        handler,
        environment,
    };
}
exports.lambdaFunctionHandler = lambdaFunctionHandler;
//# sourceMappingURL=lambda.js.map
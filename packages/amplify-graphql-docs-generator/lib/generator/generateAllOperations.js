"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pascalCase = require('pascal-case');
const generateOperation_1 = require("./generateOperation");
const types_1 = require("./types");
function generateQueries(queries, schema, maxDepth, options) {
    if (queries) {
        const allQueries = queries.getFields();
        const processedQueries = Object.keys(allQueries).map(queryName => {
            const type = types_1.GQLOperationTypeEnum.QUERY;
            const op = generateOperation_1.default(allQueries[queryName], schema, maxDepth, options);
            const name = pascalCase(queryName);
            return Object.assign({ type, name }, op);
        });
        return processedQueries;
    }
}
exports.generateQueries = generateQueries;
function generateMutations(mutations, schema, maxDepth, options) {
    if (mutations) {
        const allMutations = mutations.getFields();
        const processedMutations = Object.keys(allMutations).map(mutationName => {
            const type = types_1.GQLOperationTypeEnum.MUTATION;
            const op = generateOperation_1.default(allMutations[mutationName], schema, maxDepth, options);
            const name = pascalCase(mutationName);
            return Object.assign({ type, name }, op);
        });
        return processedMutations;
    }
}
exports.generateMutations = generateMutations;
function generateSubscriptions(subscriptions, schema, maxDepth, options) {
    if (subscriptions) {
        const allSubscriptions = subscriptions.getFields();
        const processedMutations = Object.keys(allSubscriptions).map(subscriptionName => {
            const type = types_1.GQLOperationTypeEnum.SUBSCRIPTION;
            const op = generateOperation_1.default(allSubscriptions[subscriptionName], schema, maxDepth, options);
            const name = pascalCase(subscriptionName);
            return Object.assign({ type, name }, op);
        });
        return processedMutations;
    }
}
exports.generateSubscriptions = generateSubscriptions;
function collectExternalFragments(operations = []) {
    const fragments = {};
    operations.forEach(op => {
        getExternalFragment(op.body, fragments);
    });
    return Object.values(fragments);
}
exports.collectExternalFragments = collectExternalFragments;
function getExternalFragment(field, externalFragments = {}) {
    field.fragments
        .filter(fragment => fragment.external)
        .reduce((acc, val) => {
        acc[val.name] = val;
        return acc;
    }, externalFragments);
    field.fields.forEach(f => {
        getExternalFragment(f, externalFragments);
    });
    return externalFragments;
}
//# sourceMappingURL=generateAllOperations.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectFragmentsReferenced_1 = require("./collectFragmentsReferenced");
const crypto_1 = require("crypto");
function generateOperationId(operation, fragments, fragmentsReferenced) {
    if (!fragmentsReferenced) {
        fragmentsReferenced = collectFragmentsReferenced_1.collectFragmentsReferenced(operation.selectionSet, fragments);
    }
    const sourceWithFragments = [
        operation.source,
        ...Array.from(fragmentsReferenced).map(fragmentName => {
            const fragment = fragments[fragmentName];
            if (!fragment) {
                throw new Error(`Cannot find fragment "${fragmentName}"`);
            }
            return fragment.source;
        }),
    ].join('\n');
    const hash = crypto_1.createHash('sha256');
    hash.update(sourceWithFragments);
    const operationId = hash.digest('hex');
    return { operationId, sourceWithFragments };
}
exports.generateOperationId = generateOperationId;
//# sourceMappingURL=generateOperationId.js.map
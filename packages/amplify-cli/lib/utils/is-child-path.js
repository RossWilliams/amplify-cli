"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function isChildPath(child, parent) {
    if (child === parent) {
        return false;
    }
    const parentTokens = parent.split(path_1.default.sep).filter(i => i.length);
    const childTokens = child.split(path_1.default.sep).filter(i => i.length);
    return parentTokens.every((element, index) => childTokens[index] === element);
}
exports.default = isChildPath;
//# sourceMappingURL=../../src/lib/utils/is-child-path.js.map
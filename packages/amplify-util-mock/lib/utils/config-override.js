"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const cleanup_task_1 = require("./cleanup-task");
class ConfigOverrideManager {
    constructor(context) {
        this.overrides = {};
        cleanup_task_1.addCleanupTask(context, () => __awaiter(this, void 0, void 0, function* () {
            yield this.restoreFrontendExports(context);
        }));
    }
    addOverride(category, override) {
        this.overrides[category] = override;
    }
    generateOverriddenFrontendExports(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const meta = yield index_1.getAmplifyMeta(context);
            yield context.amplify.onCategoryOutputsChange(context, null, Object.assign(Object.assign({}, meta), this.overrides));
        });
    }
    restoreFrontendExports(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const meta = yield index_1.getAmplifyMeta(context);
            yield context.amplify.onCategoryOutputsChange(context, null, meta);
        });
    }
    static getInstance(context) {
        if (!ConfigOverrideManager.instance) {
            ConfigOverrideManager.instance = new ConfigOverrideManager(context);
        }
        return ConfigOverrideManager.instance;
    }
}
exports.ConfigOverrideManager = ConfigOverrideManager;
ConfigOverrideManager.instance = null;
//# sourceMappingURL=config-override.js.map
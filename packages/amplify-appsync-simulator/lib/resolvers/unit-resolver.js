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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppSyncUnitResolver = /** @class */ (function () {
    function AppSyncUnitResolver(config, simulatorContext) {
        this.simulatorContext = simulatorContext;
        try {
            simulatorContext.getMappingTemplate(config.requestMappingTemplateLocation);
            simulatorContext.getMappingTemplate(config.responseMappingTemplateLocation);
            simulatorContext.getDataLoader(config.dataSourceName);
        }
        catch (e) {
            throw new Error("Invalid config for UNIT_RESOLVER " + JSON.stringify(config) + " \n " + e.message);
        }
        var fieldName = config.fieldName, typeName = config.typeName;
        if (!fieldName || !typeName) {
            throw new Error("Invalid config for UNIT_RESOLVER " + JSON.stringify(config));
        }
        this.config = config;
    }
    AppSyncUnitResolver.prototype.resolve = function (source, args, context, info) {
        return __awaiter(this, void 0, void 0, function () {
            var requestMappingTemplate, responseMappingTemplate, dataLoader, _a, requestPayload, requestTemplateErrors, result, error, e_1, _b, responseTemplateResult, responseTemplateErrors;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestMappingTemplate = this.simulatorContext.getMappingTemplate(this.config.requestMappingTemplateLocation);
                        responseMappingTemplate = this.simulatorContext.getMappingTemplate(this.config.responseMappingTemplateLocation);
                        dataLoader = this.simulatorContext.getDataLoader(this.config.dataSourceName);
                        _a = requestMappingTemplate.render({ source: source, arguments: args }, context, info), requestPayload = _a.result, requestTemplateErrors = _a.errors;
                        context.appsyncErrors = __spreadArrays(context.appsyncErrors, requestTemplateErrors);
                        result = null;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dataLoader.load(requestPayload)];
                    case 2:
                        result = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        if (requestPayload && requestPayload.version === '2018-05-29') {
                            // https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-changelog.html#aws-appsync-resolver-mapping-template-version-2018-05-29
                            error = e_1;
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (requestPayload && requestPayload.version !== '2018-05-29' && result === null) {
                            return [2 /*return*/];
                        }
                        _b = responseMappingTemplate.render({ source: source, arguments: args, result: result, error: error }, context, info), responseTemplateResult = _b.result, responseTemplateErrors = _b.errors;
                        context.appsyncErrors = __spreadArrays(context.appsyncErrors, responseTemplateErrors);
                        return [2 /*return*/, responseTemplateResult];
                }
            });
        });
    };
    return AppSyncUnitResolver;
}());
exports.AppSyncUnitResolver = AppSyncUnitResolver;
//# sourceMappingURL=unit-resolver.js.map
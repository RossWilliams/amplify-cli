"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class AmplifyToolkit {
    constructor() {
        this._amplifyHelpersDirPath = path_1.default.normalize(path_1.default.join(__dirname, '../extensions/amplify-helpers'));
    }
    get buildResources() {
        this._buildResources = this._buildResources || require(path_1.default.join(this._amplifyHelpersDirPath, 'build-resources')).buildResources;
        return this._buildResources;
    }
    get confirmPrompt() {
        this._confirmPrompt = this._confirmPrompt || require(path_1.default.join(this._amplifyHelpersDirPath, 'confirm-prompt'));
        return this._confirmPrompt;
    }
    get constants() {
        this._constants = this._constants || require(path_1.default.join(this._amplifyHelpersDirPath, 'constants'));
        return this._constants;
    }
    get constructExeInfo() {
        this._constructExeInfo =
            this._constructExeInfo || require(path_1.default.join(this._amplifyHelpersDirPath, 'construct-exeInfo')).constructExeInfo;
        return this._constructExeInfo;
    }
    get copyBatch() {
        this._copyBatch = this._copyBatch || require(path_1.default.join(this._amplifyHelpersDirPath, 'copy-batch')).copyBatch;
        return this._copyBatch;
    }
    get crudFlow() {
        this._crudFlow = this._crudFlow || require(path_1.default.join(this._amplifyHelpersDirPath, 'permission-flow')).crudFlow;
        return this._crudFlow;
    }
    get deleteProject() {
        this._deleteProject = this._deleteProject || require(path_1.default.join(this._amplifyHelpersDirPath, 'delete-project')).deleteProject;
        return this._deleteProject;
    }
    get executeProviderUtils() {
        this._executeProviderUtils =
            this._executeProviderUtils || require(path_1.default.join(this._amplifyHelpersDirPath, 'execute-provider-utils')).executeProviderUtils;
        return this._executeProviderUtils;
    }
    get getAllEnvs() {
        this._getAllEnvs = this._getAllEnvs || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-all-envs')).getAllEnvs;
        return this._getAllEnvs;
    }
    get getPlugin() {
        this._getPlugin = this._getPlugin || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-plugin')).getPlugin;
        return this._getPlugin;
    }
    get getCategoryPlugins() {
        this._getCategoryPlugins =
            this._getCategoryPlugins || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-category-plugins')).getCategoryPlugins;
        return this._getCategoryPlugins;
    }
    get getFrontendPlugins() {
        this._getFrontendPlugins =
            this._getFrontendPlugins || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-frontend-plugins')).getFrontendPlugins;
        return this._getFrontendPlugins;
    }
    get getProviderPlugins() {
        this._getProviderPlugins =
            this._getProviderPlugins || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-provider-plugins')).getProviderPlugins;
        return this._getProviderPlugins;
    }
    get getEnvDetails() {
        this._getEnvDetails = this._getEnvDetails || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-env-details')).getEnvDetails;
        return this._getEnvDetails;
    }
    get getEnvInfo() {
        this._getEnvInfo = this._getEnvInfo || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-env-info')).getEnvInfo;
        return this._getEnvInfo;
    }
    get getPluginInstance() {
        this._getPluginInstance =
            this._getPluginInstance || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-plugin-instance')).getPluginInstance;
        return this._getPluginInstance;
    }
    get getProjectConfig() {
        this._getProjectConfig =
            this._getProjectConfig || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-project-config')).getProjectConfig;
        return this._getProjectConfig;
    }
    get getProjectDetails() {
        this._getProjectDetails =
            this._getProjectDetails || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-project-details')).getProjectDetails;
        return this._getProjectDetails;
    }
    get getProjectMeta() {
        this._getProjectMeta = this._getProjectMeta || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-project-meta')).getProjectMeta;
        return this._getProjectMeta;
    }
    get getResourceStatus() {
        this._getResourceStatus =
            this._getResourceStatus || require(path_1.default.join(this._amplifyHelpersDirPath, 'resource-status')).getResourceStatus;
        return this._getResourceStatus;
    }
    get getResourceOutputs() {
        this._getResourceOutputs =
            this._getResourceOutputs || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-resource-outputs')).getResourceOutputs;
        return this._getResourceOutputs;
    }
    get getWhen() {
        this._getWhen = this._getWhen || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-when-function')).getWhen;
        return this._getWhen;
    }
    get inputValidation() {
        this._inputValidation = this._inputValidation || require(path_1.default.join(this._amplifyHelpersDirPath, 'input-validation')).inputValidation;
        return this._inputValidation;
    }
    get isRunningOnEC2() {
        this._isRunningOnEC2 = this._isRunningOnEC2 || require(path_1.default.join(this._amplifyHelpersDirPath, 'is-running-on-EC2')).isRunningOnEC2;
        return this._isRunningOnEC2;
    }
    get listCategories() {
        this._listCategories = this._listCategories || require(path_1.default.join(this._amplifyHelpersDirPath, 'list-categories')).listCategories;
        return this._listCategories;
    }
    get makeId() {
        this._makeId = this._makeId || require(path_1.default.join(this._amplifyHelpersDirPath, 'make-id')).makeId;
        return this._makeId;
    }
    get openEditor() {
        this._openEditor = this._openEditor || require(path_1.default.join(this._amplifyHelpersDirPath, 'open-editor')).openEditor;
        return this._openEditor;
    }
    get onCategoryOutputsChange() {
        this._onCategoryOutputsChange =
            this._onCategoryOutputsChange ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'on-category-outputs-change')).onCategoryOutputsChange;
        return this._onCategoryOutputsChange;
    }
    get pathManager() {
        this._pathManager = this._pathManager || require(path_1.default.join(this._amplifyHelpersDirPath, 'path-manager'));
        return this._pathManager;
    }
    get pressEnterToContinue() {
        this._pressEnterToContinue = this._pressEnterToContinue || require(path_1.default.join(this._amplifyHelpersDirPath, 'press-enter-to-continue'));
        return this._pressEnterToContinue;
    }
    get pushResources() {
        this._pushResources = this._pushResources || require(path_1.default.join(this._amplifyHelpersDirPath, 'push-resources')).pushResources;
        return this._pushResources;
    }
    get storeCurrentCloudBackend() {
        this._storeCurrentCloudBackend =
            this._storeCurrentCloudBackend || require(path_1.default.join(this._amplifyHelpersDirPath, 'push-resources')).storeCurrentCloudBackend;
        return this._storeCurrentCloudBackend;
    }
    get readJsonFile() {
        this._readJsonFile = this._readJsonFile || require(path_1.default.join(this._amplifyHelpersDirPath, 'read-json-file')).readJsonFile;
        return this._readJsonFile;
    }
    get removeEnvFromCloud() {
        this._removeEnvFromCloud =
            this._removeEnvFromCloud || require(path_1.default.join(this._amplifyHelpersDirPath, 'remove-env-from-cloud')).removeEnvFromCloud;
        return this._removeEnvFromCloud;
    }
    get removeResource() {
        this._removeResource = this._removeResource || require(path_1.default.join(this._amplifyHelpersDirPath, 'remove-resource')).removeResource;
        return this._removeResource;
    }
    get sharedQuestions() {
        this._sharedQuestions = this._sharedQuestions || require(path_1.default.join(this._amplifyHelpersDirPath, 'shared-questions')).sharedQuestions;
        return this._sharedQuestions;
    }
    get showHelp() {
        this._showHelp = this._showHelp || require(path_1.default.join(this._amplifyHelpersDirPath, 'show-help')).showHelp;
        return this._showHelp;
    }
    get showAllHelp() {
        this._showAllHelp = this._showAllHelp || require(path_1.default.join(this._amplifyHelpersDirPath, 'show-all-help')).showAllHelp;
        return this._showAllHelp;
    }
    get showHelpfulProviderLinks() {
        this._showHelpfulProviderLinks =
            this._showHelpfulProviderLinks ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'show-helpful-provider-links')).showHelpfulProviderLinks;
        return this._showHelpfulProviderLinks;
    }
    get showResourceTable() {
        this._showResourceTable =
            this._showResourceTable || require(path_1.default.join(this._amplifyHelpersDirPath, 'resource-status')).showResourceTable;
        return this._showResourceTable;
    }
    get serviceSelectionPrompt() {
        this._serviceSelectionPrompt =
            this._serviceSelectionPrompt || require(path_1.default.join(this._amplifyHelpersDirPath, 'service-select-prompt')).serviceSelectionPrompt;
        return this._serviceSelectionPrompt;
    }
    get updateProjectConfig() {
        this._updateProjectConfig =
            this._updateProjectConfig || require(path_1.default.join(this._amplifyHelpersDirPath, 'update-project-config')).updateProjectConfig;
        return this._updateProjectConfig;
    }
    get updateamplifyMetaAfterResourceUpdate() {
        this._updateamplifyMetaAfterResourceUpdate =
            this._updateamplifyMetaAfterResourceUpdate ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateamplifyMetaAfterResourceUpdate;
        return this._updateamplifyMetaAfterResourceUpdate;
    }
    get updateamplifyMetaAfterResourceAdd() {
        this._updateamplifyMetaAfterResourceAdd =
            this._updateamplifyMetaAfterResourceAdd ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateamplifyMetaAfterResourceAdd;
        return this._updateamplifyMetaAfterResourceAdd;
    }
    get updateamplifyMetaAfterResourceDelete() {
        this._updateamplifyMetaAfterResourceDelete =
            this._updateamplifyMetaAfterResourceDelete ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateamplifyMetaAfterResourceDelete;
        return this._updateamplifyMetaAfterResourceDelete;
    }
    get updateProvideramplifyMeta() {
        this._updateProvideramplifyMeta =
            this._updateProvideramplifyMeta || require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateProvideramplifyMeta;
        return this._updateProvideramplifyMeta;
    }
    get updateamplifyMetaAfterPush() {
        this._updateamplifyMetaAfterPush =
            this._updateamplifyMetaAfterPush || require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateamplifyMetaAfterPush;
        return this._updateamplifyMetaAfterPush;
    }
    get updateamplifyMetaAfterBuild() {
        this._updateamplifyMetaAfterBuild =
            this._updateamplifyMetaAfterBuild ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateamplifyMetaAfterBuild;
        return this._updateamplifyMetaAfterBuild;
    }
    get updateAmplifyMetaAfterPackage() {
        this._updateAmplifyMetaAfterPackage =
            this._updateAmplifyMetaAfterPackage ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-amplify-meta')).updateAmplifyMetaAfterPackage;
        return this._updateAmplifyMetaAfterPackage;
    }
    get updateBackendConfigAfterResourceAdd() {
        this._updateBackendConfigAfterResourceAdd =
            this._updateBackendConfigAfterResourceAdd ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-backend-config')).updateBackendConfigAfterResourceAdd;
        return this._updateBackendConfigAfterResourceAdd;
    }
    get updateBackendConfigAfterResourceRemove() {
        this._updateBackendConfigAfterResourceRemove =
            this._updateBackendConfigAfterResourceRemove ||
                require(path_1.default.join(this._amplifyHelpersDirPath, 'update-backend-config')).updateBackendConfigAfterResourceRemove;
        return this._updateBackendConfigAfterResourceRemove;
    }
    get loadEnvResourceParameters() {
        this._loadEnvResourceParameters =
            this._loadEnvResourceParameters || require(path_1.default.join(this._amplifyHelpersDirPath, 'envResourceParams')).loadEnvResourceParameters;
        return this._loadEnvResourceParameters;
    }
    get saveEnvResourceParameters() {
        this._saveEnvResourceParameters =
            this._saveEnvResourceParameters || require(path_1.default.join(this._amplifyHelpersDirPath, 'envResourceParams')).saveEnvResourceParameters;
        return this._saveEnvResourceParameters;
    }
    get removeResourceParameters() {
        this._removeResourceParameters =
            this._removeResourceParameters || require(path_1.default.join(this._amplifyHelpersDirPath, 'envResourceParams')).removeResourceParameters;
        return this._removeResourceParameters;
    }
    get triggerFlow() {
        this._triggerFlow = this._triggerFlow || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).triggerFlow;
        return this._triggerFlow;
    }
    get addTrigger() {
        this._addTrigger = this._addTrigger || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).addTrigger;
        return this._addTrigger;
    }
    get updateTrigger() {
        this._updateTrigger = this._updateTrigger || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).updateTrigger;
        return this._updateTrigger;
    }
    get deleteTrigger() {
        this._deleteTrigger = this._deleteTrigger || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).deleteTrigger;
        return this._deleteTrigger;
    }
    get deleteAllTriggers() {
        this._deleteAllTriggers = this._deleteAllTriggers || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).deleteAllTriggers;
        return this._deleteAllTriggers;
    }
    get deleteDeselectedTriggers() {
        this._deleteDeselectedTriggers =
            this._deleteDeselectedTriggers || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).deleteDeselectedTriggers;
        return this._deleteDeselectedTriggers;
    }
    get dependsOnBlock() {
        this._dependsOnBlock = this._dependsOnBlock || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).dependsOnBlock;
        return this._dependsOnBlock;
    }
    get getTriggerMetadata() {
        this._getTriggerMetadata =
            this._getTriggerMetadata || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).getTriggerMetadata;
        return this._getTriggerMetadata;
    }
    get getTriggerPermissions() {
        this._getTriggerPermissions =
            this._getTriggerPermissions || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).getTriggerPermissions;
        return this._getTriggerPermissions;
    }
    get getTriggerEnvVariables() {
        this._getTriggerEnvVariables =
            this._getTriggerEnvVariables || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).getTriggerEnvVariables;
        return this._getTriggerEnvVariables;
    }
    get getTriggerEnvInputs() {
        this._getTriggerEnvInputs =
            this._getTriggerEnvInputs || require(path_1.default.join(this._amplifyHelpersDirPath, 'trigger-flow')).getTriggerEnvInputs;
        return this._getTriggerEnvInputs;
    }
    get getUserPoolGroupList() {
        this._getUserPoolGroupList =
            this._getUserPoolGroupList || require(path_1.default.join(this._amplifyHelpersDirPath, 'get-userpoolgroup-list')).getUserPoolGroupList;
        return this._getUserPoolGroupList;
    }
    get forceRemoveResource() {
        this._forceRemoveResource =
            this._forceRemoveResource || require(path_1.default.join(this._amplifyHelpersDirPath, 'remove-resource')).forceRemoveResource;
        return this._forceRemoveResource;
    }
}
exports.AmplifyToolkit = AmplifyToolkit;
//# sourceMappingURL=../../src/lib/domain/amplify-toolkit.js.map
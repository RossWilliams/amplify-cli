"use strict";
function getPlugin(context, pluginName) {
    let result;
    const { plugins } = context.runtime;
    for (let i = 0; i < plugins.length; i++) {
        if (plugins[i].name === pluginName) {
            result = plugins[i].directory;
            break;
        }
    }
    return result;
}
module.exports = {
    getPlugin,
};
//# sourceMappingURL=../../../src/lib/extensions/amplify-helpers/get-plugin.js.map
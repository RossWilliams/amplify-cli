"use strict";
const path = require('path');
function getUserPoolGroupList(context) {
    let userPoolGroupList = [];
    let existingGroups;
    const userGroupParamsPath = path.join(context.amplify.pathManager.getBackendDirPath(), 'auth', 'userPoolGroups', 'user-pool-group-precedence.json');
    try {
        existingGroups = context.amplify.readJsonFile(userGroupParamsPath);
        userPoolGroupList = existingGroups.map(e => e.groupName);
    }
    catch (e) {
        existingGroups = null;
    }
    return userPoolGroupList;
}
module.exports = {
    getUserPoolGroupList,
};
//# sourceMappingURL=../../../src/lib/extensions/amplify-helpers/get-userpoolgroup-list.js.map
"use strict";
function makeId(n) {
    if (!n) {
        n = 5;
    }
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < n; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
module.exports = {
    makeId,
};
//# sourceMappingURL=../../../src/lib/extensions/amplify-helpers/make-id.js.map
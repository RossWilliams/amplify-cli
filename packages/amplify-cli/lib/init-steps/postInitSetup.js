"use strict";
const { execSync } = require('child_process');
const { getPackageManager } = require('../packageManagerHelpers');
const { normalizePackageManagerForOS } = require('../packageManagerHelpers');
async function run(context) {
    if (context.parameters.options.app) {
        try {
            context.parameters.options.app = true;
            context.parameters.options.y = true;
            context.amplify.constructExeInfo(context);
            await context.amplify.pushResources(context);
            await runPackage();
        }
        catch (e) {
            if (e.name !== 'InvalidDirectiveError') {
                context.print.error(`An error occured during the push operation: ${e.message}`);
            }
            process.exit(1);
        }
    }
}
async function runPackage() {
    const packageManager = await getPackageManager();
    const normalizedPackageManager = await normalizePackageManagerForOS(packageManager);
    if (normalizedPackageManager) {
        execSync(`${normalizedPackageManager} start`, { stdio: 'inherit' });
    }
}
module.exports = {
    run,
};
//# sourceMappingURL=postInitSetup.js.map
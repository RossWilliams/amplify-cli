"use strict";
const { execSync } = require('child_process');
const { getPackageManager } = require('../packageManagerHelpers');
const { normalizePackageManagerForOS } = require('../packageManagerHelpers');
const { generateLocalEnvInfoFile } = require('./s9-onSuccess');
const url = require('url');
const fs = require('fs-extra');
const path = require('path');
async function run(context) {
    if (context.parameters.options.app) {
        context.print.warning('Note: Amplify does not have knowledge of the url provided');
        const repoUrl = context.parameters.options.app;
        await validateGithubRepo(context, repoUrl);
        await cloneRepo(context, repoUrl);
        await installPackage();
        await setLocalEnvDefaults(context);
    }
    if (context.parameters.options.quickstart) {
        await createAmplifySkeleton();
        process.exit(0);
    }
    return context;
}
async function validateGithubRepo(context, repoUrl) {
    try {
        url.parse(repoUrl);
        execSync(`git ls-remote ${repoUrl}`, { stdio: 'ignore' });
    }
    catch (e) {
        context.print.error('Invalid remote github url');
        process.exit(1);
    }
}
async function cloneRepo(context, repoUrl) {
    const files = fs.readdirSync(process.cwd());
    if (files.length > 0) {
        context.print.error('Please ensure you run this command in an empty directory');
        process.exit(1);
    }
    try {
        execSync(`git clone ${repoUrl} .`, { stdio: 'inherit' });
    }
    catch (e) {
        process.exit(1);
    }
}
async function installPackage() {
    const packageManager = await getPackageManager();
    const normalizedPackageManager = await normalizePackageManagerForOS(packageManager);
    if (normalizedPackageManager) {
        execSync(`${normalizedPackageManager} install`, { stdio: 'inherit' });
    }
}
async function setLocalEnvDefaults(context) {
    const projectPath = process.cwd();
    const defaultEditor = 'vscode';
    const envName = 'sampledev';
    context.print.warning(`Setting default editor to ${defaultEditor}`);
    context.print.warning(`Setting environment to ${envName}`);
    context.print.warning('Run amplify configure project to change the default configuration later');
    context.exeInfo.localEnvInfo = {
        projectPath,
        defaultEditor,
        envName,
    };
    context.exeInfo.inputParams.amplify.envName = envName;
    await generateLocalEnvInfoFile(context);
}
async function createAmplifySkeleton() {
    const skeletonLocalDir = path.join(__dirname, '../../templates/amplify-skeleton');
    const skeletonProjectDir = path.join(process.cwd(), '/amplify');
    await fs.copySync(skeletonLocalDir, skeletonProjectDir);
}
module.exports = {
    run,
};
//# sourceMappingURL=preInitSetup.js.map
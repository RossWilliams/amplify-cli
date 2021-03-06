"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const mock_data_directory_1 = require("./mock-data-directory");
function addMockDataToGitIgnore(context) {
    const gitIgnoreFilePath = context.amplify.pathManager.getGitIgnoreFilePath();
    if (fs.existsSync(gitIgnoreFilePath)) {
        const gitRoot = path.dirname(gitIgnoreFilePath);
        const mockDataDirectory = path.relative(gitRoot, mock_data_directory_1.getMockDataDirectory(context)).replace(/\\/g, "/");
        let gitIgnoreContent = fs.readFileSync(gitIgnoreFilePath).toString();
        if (gitIgnoreContent.search(RegExp(`^\s*${mockDataDirectory}\w*$`, 'gm')) === -1) {
            gitIgnoreContent += '\n' + mockDataDirectory;
            fs.writeFileSync(gitIgnoreFilePath, gitIgnoreContent);
        }
    }
}
exports.addMockDataToGitIgnore = addMockDataToGitIgnore;
//# sourceMappingURL=git-ignore.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// normalize command line arguments, allow verb / noun place switch
const input_1 = require("./domain/input");
const constants_1 = require("./domain/constants");
const plugin_manager_1 = require("./plugin-manager");
const input_verification_result_1 = require("./domain/input-verification-result");
function getCommandLineInput(pluginPlatform) {
    const result = new input_1.Input(process.argv);
    /* tslint:disable */
    if (result.argv && result.argv.length > 2) {
        let index = 2;
        // pick up plugin name, allow plugin name to be in the 2nd or 3rd position
        const pluginNames = plugin_manager_1.getAllPluginNames(pluginPlatform);
        if (pluginNames.has(result.argv[2])) {
            result.plugin = result.argv[2];
            index = 3;
        }
        else if (result.argv.length > 3 && pluginNames.has(result.argv[3])) {
            result.plugin = result.argv[3];
            result.argv[3] = result.argv[2];
            result.argv[2] = result.plugin;
            index = 3;
        }
        // pick up command
        if (result.argv.length > index && !/^-/.test(result.argv[index])) {
            result.command = result.argv[index];
            index += 1;
        }
        // pick up subcommands
        while (result.argv.length > index && !/^-/.test(result.argv[index])) {
            result.subCommands = result.subCommands || new Array();
            result.subCommands.push(result.argv[index]);
            index += 1;
        }
        // pick up options
        while (result.argv.length > index) {
            result.options = result.options || {};
            if (/^-/.test(result.argv[index])) {
                const key = result.argv[index].replace(/^-+/, '');
                index += 1;
                if (result.argv.length > index && !/^-/.test(result.argv[index])) {
                    result.options[key] = result.argv[index];
                    index += 1;
                }
                else {
                    result.options[key] = true;
                }
            }
            else {
                const key = result.argv[index];
                index += 1;
                result.options[key] = true;
            }
        }
    }
    /* tslint:enable */
    return result;
}
exports.getCommandLineInput = getCommandLineInput;
function normailizeInput(input) {
    // -v --version => version command
    // -h --help => help command
    // -y --yes => yes option
    if (input.options) {
        if (input.options[constants_1.constants.VERSION] || input.options[constants_1.constants.VERSION_SHORT]) {
            input.options[constants_1.constants.VERSION] = true;
            delete input.options[constants_1.constants.VERSION_SHORT];
        }
        if (input.options[constants_1.constants.HELP] || input.options[constants_1.constants.HELP_SHORT]) {
            input.options[constants_1.constants.HELP] = true;
            delete input.options[constants_1.constants.HELP_SHORT];
        }
        if (input.options[constants_1.constants.YES] || input.options[constants_1.constants.YES_SHORT]) {
            input.options[constants_1.constants.YES] = true;
            delete input.options[constants_1.constants.YES_SHORT];
        }
    }
    input.command = input.command || constants_1.constants.PLUGIN_DEFAULT_COMMAND;
    return input;
}
function verifyInput(pluginPlatform, input) {
    const result = new input_verification_result_1.InputVerificationResult();
    input.plugin = input.plugin || constants_1.constants.CORE;
    normailizeInput(input);
    const pluginCandidates = plugin_manager_1.getPluginsWithName(pluginPlatform, input.plugin);
    if (pluginCandidates.length > 0) {
        for (let i = 0; i < pluginCandidates.length; i++) {
            const { name, commands, commandAliases } = pluginCandidates[i].manifest;
            if ((commands && commands.includes(constants_1.constants.HELP)) || (commandAliases && Object.keys(commandAliases).includes(constants_1.constants.HELP))) {
                result.helpCommandAvailable = true;
            }
            if (commands && commands.includes(input.command)) {
                result.verified = true;
                break;
            }
            if (commandAliases && Object.keys(commandAliases).includes(input.command)) {
                input.command = commandAliases[input.command];
                result.verified = true;
                break;
            }
            if (input.command === constants_1.constants.PLUGIN_DEFAULT_COMMAND) {
                if (commands && commands.includes(name)) {
                    input.command = name;
                    result.verified = true;
                    break;
                }
                if (input.options && input.options[constants_1.constants.VERSION] && commands && commands.includes(constants_1.constants.VERSION)) {
                    input.command = constants_1.constants.VERSION;
                    result.verified = true;
                    break;
                }
                if (input.options && input.options[constants_1.constants.HELP] && commands && commands.includes(constants_1.constants.HELP)) {
                    input.command = constants_1.constants.HELP;
                    result.verified = true;
                    break;
                }
                // as a fall back, use the help command
                if (commands && commands.includes(constants_1.constants.HELP)) {
                    input.command = constants_1.constants.HELP;
                    result.verified = true;
                    break;
                }
            }
        }
        if (!result.verified) {
            let commandString = input.plugin === constants_1.constants.CORE ? '' : input.plugin;
            if (input.command !== constants_1.constants.PLUGIN_DEFAULT_COMMAND) {
                commandString += ' ' + input.command;
            }
            if (input.subCommands) {
                commandString += ' ' + input.subCommands.join(' ');
            }
            result.message = `The Amplify CLI can NOT find command: ${commandString}`;
        }
    }
    else {
        result.verified = false;
        result.message = `The Amplify CLI can NOT find any plugin with name: ${input.plugin}`;
    }
    return result;
}
exports.verifyInput = verifyInput;
//# sourceMappingURL=../src/lib/input-manager.js.map
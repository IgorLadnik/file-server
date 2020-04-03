/*
This template to crete new commands.

In the command signature:
    args    - command's arguments provided by calller.
    p       - processor. Its actual type is IProcessor.
    message - contains info of message if command was creted on some message erceived (from message queue or other sources)
              Usually is not used.
*/
exports.command = async (args, p, message) => {
    const thisCommandName = 'cmdTemplate'; // Replace with actual command name
    let logger = p.getLogger();

    logger.log(`Command ${thisCommandName} started  args: ${JSON.stringify(args)} ${!message.isEmpty ? `, message: ${message}` : ''}`);
    
    // Currently available local dependencies. Please remove not used.
    const Utils = require(`${p.workingDir}/infrastructure/utils`).Utils;
    const Config = require(`${p.workingDir}/config`).Config;
	const Command = require(`${p.workingDir}/models/command`).Command;
    const HttpServerProvider = require(`${p.workingDir}/infrastructure/httpServerProvider`).HttpServerProvider;
    const HttpOpenApiServerProvider = require(`${p.workingDir}/infrastructure/httpOpenApiServerProvider`).HttpOpenApiServerProvider;
    const SqlServerProvider = require(`${p.workingDir}/infrastructure/SqlServerProvider`).SqlServerProvider;
    
    // Provide business logic here

    logger.log(`Command ${thisCommandName} ended`);
    
    return true;
}

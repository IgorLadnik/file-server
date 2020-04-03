exports.command = async (args, p, message) => {
    const thisCommandName = 'cmdTestP';
    let logger = p.getLogger();

    const Utils = require(`${p.workingDir}/infrastructure/utils`).Utils;

    logger.log(`${thisCommandName}: Started`);
    let str = !message.isEmpty ? `| message: ${message}` : '';
    await Utils.delay(100, logger);
    logger.log(`${thisCommandName}: Ended. args: ${JSON.stringify(args)} ${str}`);
    return true;
}

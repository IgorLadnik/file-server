exports.command = async (args, p) => {
    const thisCommandName = 'cmdRest';
    let logger = p.getLogger();

    const Command = require(`${p.workingDir}/models/command`).Command;
    const Utils = require(`${p.workingDir}/infrastructure/utils`).Utils;

    let httpServer = args;
    if (!Utils.isValid(httpServer)) {
        logger.log(`Error in command \"${thisCommandName}\" http server is not available`);
        return false;
    }

    logger.log(`Command \"${thisCommandName}\" http GET on root created`);
    httpServer.get('/', async (req, res) => {
        await p.execute(new Command('cmdGetSample', {select: '*', from: 'Pets'}));

        let recordset = p.getResource('recordset');
        if (recordset) {
            p.deleteResource('recordset');
            try {
                res.send(`Hello World! ${JSON.stringify(recordset)}`);
            } catch (err) {
                logger.log(err);
            }
        }
    });

    return true;
}

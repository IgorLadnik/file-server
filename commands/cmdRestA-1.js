exports.command = async (args, p) => {
    const thisCommandName = 'cmdRestA';
    let logger = p.getLogger();

    const Command = require(`${p.workingDir}/models/command`).Command;
    const Utils = require(`${p.workingDir}/infrastructure/utils`).Utils;

    let httpServer = args;
    if (!Utils.isValid(httpServer)) {
        logger.log(`Error in command \"${thisCommandName}\" http server is not available`);
        return false;
    }

    logger.log(`Command \"${thisCommandName}\" http GET on root/a created`);
    httpServer.get('/a', async (req, res) => {
        p.setResource('res', res);
        setTimeout(async () => {
            await p.execute(new Command('cmdGetSample', {select: '*', from: 'Pets'}));

            let recordset = p.getResource('recordset');
            if (recordset) {
                p.deleteResource('recordset');
                try {
                    p.getResource('res').send(`Hello World! ${JSON.stringify(recordset)}`);
                    p.deleteResource('res');
                } catch (err) {
                    logger.log(err);
                }
            }
        }, 1);
    });

    return true;
}

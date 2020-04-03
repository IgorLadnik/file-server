exports.command = async (args, p) => {
    const thisCommandName = 'cmdCreateHttpServer';
    let logger = p.getLogger();

	const Command = require(`${p.workingDir}/models/command`).Command;
    const HttpServerProvider = require(`${p.workingDir}/infrastructure/httpServerProvider`).HttpServerProvider;
    const Utils = require(`${p.workingDir}/infrastructure/utils`).Utils;
    
    const port = args;
    const httpServer = new HttpServerProvider(port, logger).server;
    if (Utils.isValid(httpServer)) {
        logger.log(`${thisCommandName}: http server created and is listening on port = ${port}`);

        //return await p.execute(new Command('cmdRest*', httpServer));
        return await p.execute(new Command('cmdRest', httpServer),
                               new Command('cmdRestA', httpServer));
    }

    return false;
}

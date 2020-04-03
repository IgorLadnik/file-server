exports.command = async (args, p) => {
    let logger = p.getLogger();
    logger.log(`cmdSqlConnect: args: ${JSON.stringify(args)}`);

    const SqlServerProvider = require(`${p.workingDir}/infrastructure/SqlServerProvider`).SqlServerProvider;
    const Config = require(`${p.workingDir}/config`).Config;

    let server = Config.sqlServer.host;
    let database = Config.sqlServer.databases[0];
    let sql = new SqlServerProvider({server, database}, logger);
    try {
        await sql.connect();
        p.setResource('sql', sql);
        return true;
    }
    catch (err) {
        logger.log(err);
        return false;
    }
}


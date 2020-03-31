"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function command(args, p) {
    return __awaiter(this, void 0, void 0, function* () {
        let logger = p.getLogger();
        logger.log(`cmdSqlConnect: args: ${JSON.stringify(args)}`);
        const SqlServerProvider = (yield Promise.resolve().then(() => require(`${p.workingDir}/infrastructure/SqlServerProvider`))).SqlServerProvider;
        const Config = (yield Promise.resolve().then(() => require(`${p.workingDir}/config`))).Config;
        let server = Config.sqlServer.host;
        let database = Config.sqlServer.databases[0];
        let sql = new SqlServerProvider({ server, database }, logger);
        try {
            yield sql.connect();
            p.setResource('sql', sql);
            return true;
        }
        catch (err) {
            logger.log(err);
            return false;
        }
    });
}
exports.command = command;
//# sourceMappingURL=cmdSqlConnect-1.js.map
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
function command(args, p, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdFirstFetch';
        let logger = p.getLogger();
        const Utils = (yield Promise.resolve().then(() => require(`${p.workingDir}/infrastructure/utils`))).Utils;
        let sql = p.getResource('sql');
        if (!Utils.isValid(sql))
            return false;
        const dbTable = 'Pets';
        let recordset = new Array();
        try {
            recordset = yield sql.simpleQuery('*', dbTable);
        }
        catch (err) {
            logger.log(`Error in command \"${thisCommandName}\": failed to execute query to table \"${dbTable}\"`);
            return false;
        }
        p.setResource('recordset', recordset);
        let str = !message.isEmpty ? `| message: ${message}` : '';
        logger.log(`${thisCommandName}: args: ${JSON.stringify(args)} ${str}`);
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdFirstFetch-1.js.map
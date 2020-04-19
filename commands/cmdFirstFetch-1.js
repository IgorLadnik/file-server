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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
function command(args, p, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdFirstFetch';
        let logger = p.getLogger();
        const _ = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/lodash`)));
        let sql = p.getResource('sql');
        if (_.isNil(sql))
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
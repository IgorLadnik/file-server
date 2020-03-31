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
        const thisCommandName = 'cmdRestA';
        let logger = p.getLogger();
        const Command = (yield Promise.resolve().then(() => require(`${p.workingDir}/models/command`))).Command;
        const Utils = (yield Promise.resolve().then(() => require(`${p.workingDir}/infrastructure/utils`))).Utils;
        let httpServer = args;
        if (!Utils.isValid(httpServer)) {
            logger.log(`Error in command \"${thisCommandName}\" http server is not available`);
            return false;
        }
        logger.log(`Command \"${thisCommandName}\" http GET on root/a created`);
        httpServer.get('/a', (req, res) => __awaiter(this, void 0, void 0, function* () {
            p.setResource('res', res);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield p.execute(new Command('cmdGetSample', { select: '*', from: 'Pets' }));
                let recordset = p.getResource('recordset');
                if (recordset) {
                    p.deleteResource('recordset');
                    try {
                        p.getResource('res').send(`Hello World! ${JSON.stringify(recordset)}`);
                        p.deleteResource('res');
                    }
                    catch (err) {
                        logger.log(err);
                    }
                }
            }), 1);
        }));
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdRestA-1.js.map
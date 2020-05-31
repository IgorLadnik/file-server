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
function command(args, p) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdRest';
        let logger = p.getLogger();
        const _ = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/lodash`)));
        const Command = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/models/command`)))).Command;
        let httpServer = args;
        if (_.isNil(httpServer)) {
            logger.log(`Error in command \"${thisCommandName}\" http server is not available`);
            return false;
        }
        logger.log(`Command \"${thisCommandName}\" http GET on root created`);
        httpServer.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield p.execute(new Command('cmdGetSample', { select: '*', from: 'Pets' }));
            let recordset = p.getResource('recordset');
            if (recordset) {
                p.deleteResource('recordset');
                try {
                    res.send(`Hello World! ${JSON.stringify(recordset)}`);
                }
                catch (err) {
                    yield logger.log(err);
                }
            }
        }));
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdRest-1.js.map
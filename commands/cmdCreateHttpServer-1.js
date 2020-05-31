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
        const thisCommandName = 'cmdCreateHttpServer';
        let logger = p.getLogger();
        const _ = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/lodash`)));
        const Command = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/models/command`)))).Command;
        const HttpServerProvider = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/infrastructure/httpServerProvider`)))).HttpServerProvider;
        const port = args;
        const httpServer = yield new HttpServerProvider(port, logger).start();
        if (!_.isNil(httpServer)) {
            yield logger.log(`${thisCommandName}: http server created and is listening on port = ${port}`);
            return yield p.execute(new Command('cmdRest', httpServer), new Command('cmdRestA', httpServer), new Command('cmdRestPost', httpServer));
        }
        return false;
    });
}
exports.command = command;
//# sourceMappingURL=cmdCreateHttpServer-1.js.map
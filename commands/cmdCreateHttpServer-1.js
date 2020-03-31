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
        const thisCommandName = 'cmdCreateHttpServer';
        let logger = p.getLogger();
        const Command = (yield Promise.resolve().then(() => require(`${p.workingDir}/models/command`))).Command;
        const HttpServerProvider = (yield Promise.resolve().then(() => require(`${p.workingDir}/infrastructure/httpServerProvider`))).HttpServerProvider;
        const Utils = (yield Promise.resolve().then(() => require(`${p.workingDir}/infrastructure/utils`))).Utils;
        const port = args;
        const httpServer = new HttpServerProvider(port, logger).server;
        if (Utils.isValid(httpServer)) {
            logger.log(`${thisCommandName}: http server created and is listening on port = ${port}`);
            return yield p.execute(new Command('cmdRest', httpServer), new Command('cmdRestA', httpServer));
        }
        return false;
    });
}
exports.command = command;
//# sourceMappingURL=cmdCreateHttpServer-1.js.map
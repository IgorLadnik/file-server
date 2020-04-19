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
        const thisCommandName = 'cmdBootstrap';
        let logger = p.getLogger();
        logger.log(thisCommandName);
        const Command = require(`${p.workingDir}/models/command`).Command;
        const Config = require(`${p.workingDir}/config`).Config;
        let br = yield p.execute(new Command('cmdCreateHttpServer', Config.httpServer.ports[0]));
        if (br)
            br = yield p.execute(new Command('cmdCreateHttpOpenApiServer', Config.httpServer.ports[1]));
        logger.log('before fork cmdTestP 1001');
        p.executeFork(1000, new Command('cmdTestP', { order: 1001 }), new Command('cmdTestP', { order: 1002 }));
        logger.log('after fork cmdTestP 1001');
        logger.log('before fork parallel cmdTestP 2001');
        p.executeForkParallel(1000, new Command('cmdTestP', { order: 2001 }), new Command('cmdTestP', { order: 2002 }));
        logger.log('after fork parallel cmdTestP 2002');
        if (br) {
            br = false;
            let commandFirstFetch = new Command('cmdFirstFetch', { a: 'aaa', n: 1 });
            if (!(yield p.execute(commandFirstFetch)))
                if (yield p.execute(new Command('cmdSqlConnect')))
                    br = yield p.execute(commandFirstFetch);
        }
        if (br)
            br = yield p.executeParallel(new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
        if (br)
            br = yield p.execute(new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
        if (br && p.isMessageBrokerSupported()) {
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                return yield p.publish(p.getQueueNames()[0], new Command('cmdFirstFetch', { a: 'aaa', n: 1 }), new Command('cmdFirstFetch', { a: 'qqq', n: 1 }));
            }), 3000);
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                return yield p.publishParallel(p.getQueueNames()[0], new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
            }), 1370);
        }
        return br;
    });
}
exports.command = command;
//# sourceMappingURL=cmdBootstrap-1.js.map
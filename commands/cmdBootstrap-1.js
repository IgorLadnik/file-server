"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.command = void 0;
function command(args, p) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdBootstrap';
        let logger = p.getLogger();
        logger.log(thisCommandName);
        const Command = require(`${p.workingDir}/models/command`).Command;
        const Config = require(`${p.workingDir}/config`).Config;
        const _ = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/lodash`)));
        let br0 = yield p.execute(new Command('cmdCreateHttpServer', Config.httpServer.ports[0]));
        let br = yield p.execute(new Command('cmdCreateHttpOpenApiServer', Config.httpServer.ports[1]));
        logger.log('before fork cmdTestP 1001');
        p.executeFork(1000, new Command('cmdTestP', { order: 1001 }), new Command('cmdTestP', { order: 1002 }));
        logger.log('after fork cmdTestP 1001');
        logger.log('before fork parallel cmdTestP 2001');
        p.executeForkParallel(1000, new Command('cmdTestP', { order: 2001 }), new Command('cmdTestP', { order: 2002 }));
        logger.log('after fork parallel cmdTestP 2002');
        if (br) {
            let commandFirstFetch = new Command('cmdFirstFetch', { a: 'aaa', n: 1 });
            if (!(yield p.execute(commandFirstFetch)))
                if (yield p.execute(new Command('cmdSqlConnect')))
                    yield p.execute(commandFirstFetch);
        }
        if (br)
            br = yield p.executeParallel(new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
        if (br)
            br = yield p.execute(new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
        if (br && !_.isNil(Config.messageBroker))
            if (br = yield p.execute(new Command('cmdRabbitMQCommandConsumer')))
                br = yield p.execute(new Command('cmdRabbitMQCommandPublisher'));
        setInterval(() => __awaiter(this, void 0, void 0, function* () { return yield p.execute(new Command('cmdHttpClientSample')); }), 5000);
        return br;
    });
}
exports.command = command;
//# sourceMappingURL=cmdBootstrap-1.js.map
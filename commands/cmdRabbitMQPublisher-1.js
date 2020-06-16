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
function command(args, p, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdRabbitMQPublisher';
        let logger = p.getLogger();
        logger.log(`Command ${thisCommandName} started  args: ${JSON.stringify(args)} ${!message.isEmpty ? `, message: ${message}` : ''}`);
        const Command = require(`${p.workingDir}/models/command`).Command;
        const Config = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/config`)))).Config;
        const _ = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/lodash`)));
        const Publisher = (yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/rabbitmq-provider/publisher`)))).Publisher;
        const publisher = yield Publisher.createPublisher(Config.messageBroker, logger);
        p.setResource('publisher', publisher);
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            return yield publisher.publishAsync(new Command('cmdFirstFetch', { a: 'aaa', n: 1 }), new Command('cmdFirstFetch', { a: 'qqq', n: 1 }));
        }), 3000);
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            return yield publisher.publishAsync(new Command('cmdTestP', { order: 1 }), new Command('cmdTestP', { order: 2 }), new Command('cmdTestP', { order: 3 }));
        }), 1370);
        logger.log(`Command ${thisCommandName} ended`);
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdRabbitMQPublisher-1.js.map
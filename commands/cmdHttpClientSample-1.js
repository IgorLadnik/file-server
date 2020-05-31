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
        const thisCommandName = 'cmdHttpClientSample';
        let logger = p.getLogger();
        yield logger.log(`Command ${thisCommandName} started  args: ${JSON.stringify(args)} ${!message.isEmpty ? `, message: ${message}` : ''}`);
        const request = yield Promise.resolve().then(() => __importStar(require(`${p.stdImportDir}/request`)));
        request.get('http://localhost:19020/v1/pets/55', { json: true }, (err, resp, body) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                yield logger.log(`Error in command \"${thisCommandName}\": ${err}`);
            else
                logger.log(`Command ${thisCommandName}: ${JSON.stringify(body)}`);
        }));
        request.post('http://localhost:19020/v1/pets?name=Murka', { json: true }, (err, resp, body) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                yield logger.log(`Error in command \"${thisCommandName}\": ${err}`);
            else
                logger.log(`Command ${thisCommandName}: ${JSON.stringify(body)}`);
        }));
        yield logger.log(`Command ${thisCommandName} ended`);
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdHttpClientSample-1.js.map
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
        const thisCommandName = 'cmdCreateHttpOpenApiServer';
        let logger = p.getLogger();
        const Command = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/models/command`)))).Command;
        const HttpOpenApiServerProvider = (yield Promise.resolve().then(() => __importStar(require(`${p.workingDir}/infrastructure/httpOpenApiServerProvider`)))).HttpOpenApiServerProvider;
        const port = args;
        const rootDir = '/v1';
        let apiDoc = {
            openapi: '3.0.0',
            info: {
                title: 'Swagger',
                description: 'bla-bla',
                version: '1.0.0',
            },
            tags: [{ name: 'pet' }],
            paths: {},
            components: {
                schemas: {
                    Pet: {
                        required: ['name'],
                        properties: {
                            'name': { type: 'string' }
                        }
                    },
                    Error: {
                        required: ['code', 'message'],
                        properties: {
                            code: {
                                type: 'integer',
                                format: 'int64'
                            },
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        };
        const httpOpenApiServerProvider = new HttpOpenApiServerProvider(apiDoc, rootDir, port, logger);
        let br = yield p.executeParallel(new Command('cmdOpenApiGetById', httpOpenApiServerProvider), new Command('cmdOpenApiPostByName', httpOpenApiServerProvider));
        if (br)
            br = yield httpOpenApiServerProvider.start();
        return br;
    });
}
exports.command = command;
//# sourceMappingURL=cmdCreateHttpOpenApiServer-1.js.map
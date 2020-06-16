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
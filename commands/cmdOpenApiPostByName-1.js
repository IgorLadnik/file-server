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
exports.command = void 0;
function command(args, p) {
    return __awaiter(this, void 0, void 0, function* () {
        const thisCommandName = 'cmdOpenApiPostByName';
        let logger = p.getLogger();
        let httpOpenApiServerProvider = args;
        const dir = `${httpOpenApiServerProvider.rootDir}/pets`;
        httpOpenApiServerProvider.apiDoc.paths[`${dir}`] = {
            post: {
                operationId: 'postPetByName',
                parameters: [
                    {
                        name: 'name',
                        in: 'query',
                        description: 'Name of pet to fetch',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    200: {
                        description: 'pet response',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pet'
                                }
                            }
                        }
                    },
                    default: {
                        description: 'unexpected error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        };
        httpOpenApiServerProvider.server.post(`${dir}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({ id: 139, name: req.query.name });
            yield logger.log(`${thisCommandName}:`);
        }));
        return true;
    });
}
exports.command = command;
//# sourceMappingURL=cmdOpenApiPostByName-1.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = exports.AffiliationResolver = exports.OrganizationResolver = exports.PersonResolver = exports.BaseResolver = void 0;
__dirname = '';
process.chdir(__dirname);
const path_1 = require("path");
const common_1 = require("../node_modules/@nestjs/common");
const graphql_1 = require("../node_modules/@nestjs/graphql");
const sql_person_service_1 = require("./services/sql-person.service");
const neo_person_service_1 = require("./services/neo-person.service");
const utils_1 = require("./common/utils");
class BaseResolver {
    constructor(sqlFetchService, neoFetchService) {
        this.sqlFetchService = sqlFetchService;
        this.neoFetchService = neoFetchService;
        this.service = utils_1.isSQLServerDb() ? sqlFetchService : neoFetchService;
    }
}
exports.BaseResolver = BaseResolver;
let PersonResolver = class PersonResolver extends BaseResolver {
    constructor(sqlPersonService, neoPersonService) {
        super(sqlPersonService, neoPersonService);
    }
    async allPersons() {
        return await this.service.allPersons();
    }
    async affiliations(person) {
        return await this.service.affiliations(person);
    }
    async createPersons(persons) {
        return await this.service.createPersons(persons);
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "allPersons", null);
__decorate([
    graphql_1.ResolveField('affiliations'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "affiliations", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "createPersons", null);
PersonResolver = __decorate([
    graphql_1.Resolver('Person'),
    __metadata("design:paramtypes", [sql_person_service_1.SqlPersonService,
        neo_person_service_1.NeoPersonService])
], PersonResolver);
exports.PersonResolver = PersonResolver;
let OrganizationResolver = class OrganizationResolver extends BaseResolver {
    constructor(sqlFetchService, neoFetchService) {
        super(sqlFetchService, neoFetchService);
    }
    async parent(parent) {
        return await this.service.parent(parent);
    }
};
__decorate([
    graphql_1.ResolveField('parent'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "parent", null);
OrganizationResolver = __decorate([
    graphql_1.Resolver('Organization'),
    __metadata("design:paramtypes", [sql_person_service_1.SqlPersonService,
        neo_person_service_1.NeoPersonService])
], OrganizationResolver);
exports.OrganizationResolver = OrganizationResolver;
let AffiliationResolver = class AffiliationResolver extends BaseResolver {
    constructor(sqlFetchService, neoFetchService) {
        super(sqlFetchService, neoFetchService);
    }
    async organization(affiliation) {
        return await this.service.organization(affiliation);
    }
    async role(affiliation) {
        return await this.service.role(affiliation);
    }
};
__decorate([
    graphql_1.ResolveField('organization'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliationResolver.prototype, "organization", null);
__decorate([
    graphql_1.ResolveField('role'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliationResolver.prototype, "role", null);
AffiliationResolver = __decorate([
    graphql_1.Resolver('Affiliation'),
    __metadata("design:paramtypes", [sql_person_service_1.SqlPersonService,
        neo_person_service_1.NeoPersonService])
], AffiliationResolver);
exports.AffiliationResolver = AffiliationResolver;
let GqlModule = class GqlModule {
};
GqlModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                debug: false,
                playground: true,
                typePaths: [path_1.join(process.cwd(), '../schema.gql')],
                path: '/gql',
            })
        ],
        providers: [
            sql_person_service_1.SqlPersonService,
            neo_person_service_1.NeoPersonService,
            PersonResolver,
            AffiliationResolver,
            OrganizationResolver,
        ]
    })
], GqlModule);
function getModule() { return GqlModule; }
exports.getModule = getModule;
//# sourceMappingURL=gql.module.js.map
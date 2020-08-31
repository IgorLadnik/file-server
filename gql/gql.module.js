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
exports.getModule = exports.RelationResolver = exports.AffiliationResolver = exports.OrganizationResolver = exports.PersonResolver = void 0;
const typePaths = [];
const path = '';
__dirname = '';
process.chdir(__dirname);
const utils_1 = require("./common/utils");
const common_1 = require("../node_modules/@nestjs/common");
const typeorm_1 = require("../node_modules/@nestjs/typeorm");
const graphql_1 = require("../node_modules/@nestjs/graphql");
const base_resolver_1 = require("./graphQL/resolvers/base.resolver");
const sql_service_1 = require("./services/sql/sql.service");
const neo_service_1 = require("./services/neo/neo.service");
process.chdir(utils_1.goOneDirUp(__dirname));
let PersonResolver = class PersonResolver extends base_resolver_1.BaseResolver {
    constructor(sqlService, neoService) {
        super(sqlService, neoService);
    }
    async allPersons() {
        return await this.service.allPersons();
    }
    async personById(id) {
        return await this.service.personById(id);
    }
    async personBySurname(surname) {
        return await this.service.personBySurname(surname);
    }
    async personsByRelation(relationQueryArg) {
        return [];
    }
    async createPersons(personsInput) {
        return this.modifyDb(personsInput, this.sqlService.createPersons, this.neoService.createPersons);
    }
    async affiliations(parent, organization, role) {
        this.testFunc(parent, organization, role);
        return await this.service.affiliations(parent);
    }
    async relations(parent) {
        return await this.service.relations(parent);
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "allPersons", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "personById", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('surname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "personBySurname", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('relationQueryArg')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "personsByRelation", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('personsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "createPersons", null);
__decorate([
    graphql_1.ResolveField('affiliations'),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args('organization')),
    __param(2, graphql_1.Args('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "affiliations", null);
__decorate([
    graphql_1.ResolveField('relations'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "relations", null);
PersonResolver = __decorate([
    graphql_1.Resolver('Person'),
    __metadata("design:paramtypes", [sql_service_1.SqlService, neo_service_1.NeoService])
], PersonResolver);
exports.PersonResolver = PersonResolver;
let OrganizationResolver = class OrganizationResolver extends base_resolver_1.BaseResolver {
    constructor(sqlService, neoService) {
        super(sqlService, neoService);
    }
    async allOrganizations() {
        return await this.service.allOrganizations();
    }
    async parent(parent) {
        return await this.service.parent(parent);
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "allOrganizations", null);
__decorate([
    graphql_1.ResolveField('parent'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "parent", null);
OrganizationResolver = __decorate([
    graphql_1.Resolver('Organization'),
    __metadata("design:paramtypes", [sql_service_1.SqlService, neo_service_1.NeoService])
], OrganizationResolver);
exports.OrganizationResolver = OrganizationResolver;
let AffiliationResolver = class AffiliationResolver extends base_resolver_1.BaseResolver {
    constructor(sqlService, neoService) {
        super(sqlService, neoService);
    }
    async organization(parent) {
        return await this.service.organization(parent);
    }
    async role(parent) {
        return await this.service.role(parent);
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
    __metadata("design:paramtypes", [sql_service_1.SqlService, neo_service_1.NeoService])
], AffiliationResolver);
exports.AffiliationResolver = AffiliationResolver;
let RelationResolver = class RelationResolver extends base_resolver_1.BaseResolver {
    constructor(sqlService, neoService) {
        super(sqlService, neoService);
    }
    async p1(parent) {
        return [];
    }
    async p2(parent) {
        return await this.service.personById(parent);
    }
};
__decorate([
    graphql_1.ResolveField('p1'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "p1", null);
__decorate([
    graphql_1.ResolveField('p2'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "p2", null);
RelationResolver = __decorate([
    graphql_1.Resolver('Relation'),
    __metadata("design:paramtypes", [sql_service_1.SqlService, neo_service_1.NeoService])
], RelationResolver);
exports.RelationResolver = RelationResolver;
let GqlModule = class GqlModule {
};
GqlModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                debug: false,
                playground: true,
                typePaths,
                path,
            }),
            typeorm_1.TypeOrmModule.forRoot(),
        ],
        providers: [
            PersonResolver,
            OrganizationResolver,
            AffiliationResolver,
            RelationResolver,
            sql_service_1.SqlService,
            neo_service_1.NeoService
        ]
    })
], GqlModule);
function getModule() { return GqlModule; }
exports.getModule = getModule;
//# sourceMappingURL=gql.module.js.map
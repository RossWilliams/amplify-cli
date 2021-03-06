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
const graphql_auth_transformer_1 = require("graphql-auth-transformer");
const graphql_connection_transformer_1 = require("graphql-connection-transformer");
const graphql_key_transformer_1 = require("graphql-key-transformer");
const graphql_dynamodb_transformer_1 = require("graphql-dynamodb-transformer");
const graphql_transformer_core_1 = require("graphql-transformer-core");
const graphql_client_1 = require("./utils/graphql-client");
const index_1 = require("./utils/index");
let GRAPHQL_CLIENT = undefined;
let GRAPHQL_ENDPOINT = undefined;
let ddbEmulator = null;
let dbPath = null;
let server;
jest.setTimeout(20000);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const validSchema = `
    type AProject
    @model(subscriptions: null)
    @key(fields: ["projectId"])
    {
        projectId: String!
        name: String
        team: ATeam @connection
    }

    type ATeam
    @model(subscriptions: null)
    @key(fields: ["teamId"])
    {
        teamId: String!
        name: String
    }

    type BProject
    @model(subscriptions: null)
    @key(fields: ["projectId"])
    {
        projectId: String!
        name: String
        teams: [BTeam] @connection
    }

    type BTeam
    @model(subscriptions: null)
    @key(fields: ["teamId"])
    {
        teamId: String!
        name: String
    }

    type CProject
    @model(subscriptions: null)
    @key(fields: ["projectId"])
    {
        projectId: ID!
        name: String
        team: CTeam @connection(name: "CProjectCTeam")
    }

    type CTeam
    @model(subscriptions: null)
    @key(fields: ["teamId"])
    {
        teamId: ID!
        name: String
        project: CProject @connection(name: "CProjectCTeam")
    }

    type DProject
    @model(subscriptions: null)
    @key(fields: ["projectId"])
    {
        projectId: ID!
        name: String
        teams: [DTeam] @connection(name: "DProjectDTeam")
    }

    type DTeam
    @model(subscriptions: null)
    @key(fields: ["teamId"])
    {
        teamId: ID!
        name: String
        project: DProject @connection(name: "DProjectDTeam")
    }

    type Model1 @model(subscriptions: null) @key(fields: ["id", "sort" ])
    {
        id: ID!
        sort: Int!
        name: String!
    }
    type Model2 @model(subscriptions: null)
    {
        id: ID!
        connection: Model1 @connection(sortField: "modelOneSort")
        modelOneSort: Int!
    }
    `;
    try {
        const transformer = new graphql_transformer_core_1.GraphQLTransform({
            transformers: [
                new graphql_dynamodb_transformer_1.DynamoDBModelTransformer(),
                new graphql_connection_transformer_1.ModelConnectionTransformer(),
                new graphql_key_transformer_1.KeyTransformer(),
                new graphql_auth_transformer_1.ModelAuthTransformer({
                    authConfig: {
                        defaultAuthentication: {
                            authenticationType: 'API_KEY',
                        },
                        additionalAuthenticationProviders: [],
                    },
                }),
            ],
        });
        const out = transformer.transform(validSchema);
        let ddbClient;
        ({ dbPath, emulator: ddbEmulator, client: ddbClient } = yield index_1.launchDDBLocal());
        const result = yield index_1.deploy(out, ddbClient);
        server = result.simulator;
        GRAPHQL_ENDPOINT = server.url + '/graphql';
        index_1.logDebug(`Using graphql url: ${GRAPHQL_ENDPOINT}`);
        const apiKey = result.config.appSync.apiKey;
        index_1.logDebug(apiKey);
        GRAPHQL_CLIENT = new graphql_client_1.GraphQLClient(GRAPHQL_ENDPOINT, {
            'x-api-key': apiKey,
        });
    }
    catch (e) {
        console.error(e);
        expect(true).toEqual(false);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (server) {
            yield server.stop();
        }
        yield index_1.terminateDDB(ddbEmulator, dbPath);
    }
    catch (e) {
        index_1.logDebug(e);
        expect(true).toEqual(false);
    }
}));
/**
 * Test queries below
 */
test('Unnamed connection 1 way navigation, with primary @key directive 1:1', () => __awaiter(void 0, void 0, void 0, function* () {
    yield GRAPHQL_CLIENT.query(`
    mutation CreateATeam {
        createATeam(input: {teamId: "T1", name: "Team 1"}) {
            teamId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateAProject {
        createAProject(input: {projectId: "P1", name: "P1", aProjectTeamId: "T1"}) {
            projectId
            name
        }
    }
    `, {});
    const queryResponse = yield GRAPHQL_CLIENT.query(`
    query ListAProjects {
        listAProjects {
            items {
                projectId
                name
                team {
                    teamId
                    name
                }
            }
        }
    }
    `, {});
    expect(queryResponse.data.listAProjects).toBeDefined();
    const items = queryResponse.data.listAProjects.items;
    expect(items.length).toEqual(1);
    expect(items[0].projectId).toEqual('P1');
    expect(items[0].team).toBeDefined();
    expect(items[0].team.teamId).toEqual('T1');
}));
test('Unnamed connection 1 way navigation, with primary @key directive 1:M', () => __awaiter(void 0, void 0, void 0, function* () {
    yield GRAPHQL_CLIENT.query(`
    mutation CreateBProject {
        createBProject(input: {projectId: "P1", name: "P1"}) {
            projectId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateBTeam {
        createBTeam(input: {teamId: "T1", name: "Team 1", bProjectTeamsId: "P1"}) {
            teamId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateBTeam {
        createBTeam(input: {teamId: "T2", name: "Team 2", bProjectTeamsId: "P1"}) {
            teamId
            name
        }
    }
    `, {});
    const queryResponse = yield GRAPHQL_CLIENT.query(`
    query ListBProjects {
        listBProjects {
            items {
                projectId
                name
                teams {
                    items {
                        teamId
                        name
                    }
                }
            }
        }
    }
    `, {});
    expect(queryResponse.data.listBProjects).toBeDefined();
    const items = queryResponse.data.listBProjects.items;
    expect(items.length).toEqual(1);
    expect(items[0].projectId).toEqual('P1');
    expect(items[0].teams).toBeDefined();
    expect(items[0].teams.items).toBeDefined();
    expect(items[0].teams.items.length).toEqual(2);
    expect(items[0].teams.items[0].teamId).toEqual('T1');
    expect(items[0].teams.items[1].teamId).toEqual('T2');
}));
test('Named connection 2 way navigation, with with custom @key fields 1:1', () => __awaiter(void 0, void 0, void 0, function* () {
    yield GRAPHQL_CLIENT.query(`
    mutation CreateCTeam {
        createCTeam(input: {teamId: "T1", name: "Team 1", cTeamProjectId: "P1"}) {
            teamId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateCProject {
        createCProject(input: {projectId: "P1", name: "P1", cProjectTeamId: "T1"}) {
            projectId
            name
        }
    }
    `, {});
    const queryResponse = yield GRAPHQL_CLIENT.query(`
    query ListCProjects {
        listCProjects {
            items {
                projectId
                name
                team {
                    teamId
                    name
                    project {
                        projectId
                        name
                    }
                }
            }
        }
    }
    `, {});
    expect(queryResponse.data.listCProjects).toBeDefined();
    const items = queryResponse.data.listCProjects.items;
    expect(items.length).toEqual(1);
    expect(items[0].projectId).toEqual('P1');
    expect(items[0].team).toBeDefined();
    expect(items[0].team.teamId).toEqual('T1');
    expect(items[0].team.project).toBeDefined();
    expect(items[0].team.project.projectId).toEqual('P1');
}));
test('Named connection 2 way navigation, with with custom @key fields 1:M', () => __awaiter(void 0, void 0, void 0, function* () {
    yield GRAPHQL_CLIENT.query(`
    mutation CreateDProject {
        createDProject(input: {projectId: "P1", name: "P1"}) {
            projectId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateDTeam {
        createDTeam(input: {teamId: "T1", name: "Team 1", dTeamProjectId: "P1"}) {
            teamId
            name
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation CreateDTeam {
        createDTeam(input: {teamId: "T2", name: "Team 2", dTeamProjectId: "P1"}) {
            teamId
            name
        }
    }
    `, {});
    const queryResponse = yield GRAPHQL_CLIENT.query(`
    query ListDProjects {
        listDProjects {
            items {
                projectId
                name
                teams {
                    items {
                        teamId
                        name
                        project {
                            projectId
                            name
                        }
                    }
                }
            }
        }
    }
    `, {});
    expect(queryResponse.data.listDProjects).toBeDefined();
    const items = queryResponse.data.listDProjects.items;
    expect(items.length).toEqual(1);
    expect(items[0].projectId).toEqual('P1');
    expect(items[0].teams).toBeDefined();
    expect(items[0].teams.items).toBeDefined();
    expect(items[0].teams.items.length).toEqual(2);
    expect(items[0].teams.items[0].teamId).toEqual('T1');
    expect(items[0].teams.items[0].project).toBeDefined();
    expect(items[0].teams.items[0].project.projectId).toEqual('P1');
    expect(items[0].teams.items[1].teamId).toEqual('T2');
    expect(items[0].teams.items[1].project).toBeDefined();
    expect(items[0].teams.items[1].project.projectId).toEqual('P1');
}));
test('Unnamed connection with sortField parameter only #2100', () => __awaiter(void 0, void 0, void 0, function* () {
    yield GRAPHQL_CLIENT.query(`
    mutation M11 {
        createModel1(input: {id: "M11", sort: 10, name: "M1-1"}) {
            id
            name
            sort
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation M12 {
        createModel1(input: {id: "M12", sort: 10, name: "M1-2"}) {
            id
            name
            sort
        }
    }
    `, {});
    yield GRAPHQL_CLIENT.query(`
    mutation M21 {
        createModel2(input: {id: "M21", modelOneSort: 10, model2ConnectionId: "M11"}) {
            id
            modelOneSort
        }
    }
    `, {});
    const queryResponse = yield GRAPHQL_CLIENT.query(`
    query Query {
        getModel2(id: "M21") {
            id
            connection {
                id
                sort
                name
            }
        }
    }
    `, {});
    expect(queryResponse.data.getModel2).toBeDefined();
    const item = queryResponse.data.getModel2;
    expect(item.id).toEqual('M21');
    expect(item.connection).toBeDefined();
    expect(item.connection.id).toEqual('M11');
    expect(item.connection.sort).toEqual(10);
}));
//# sourceMappingURL=model-connection-with-key-transformer.e2e.test.js.map
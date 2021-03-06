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
const graphql_dynamodb_transformer_1 = require("graphql-dynamodb-transformer");
const graphql_transformer_core_1 = require("graphql-transformer-core");
const graphql_versioned_transformer_1 = require("graphql-versioned-transformer");
const graphql_client_1 = require("./utils/graphql-client");
const index_1 = require("./utils/index");
jest.setTimeout(20000);
let GRAPHQL_CLIENT = undefined;
let ddbEmulator = null;
let dbPath = null;
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const validSchema = `
    type Post @model @versioned {
        id: ID!
        title: String!
        version: Int!
        createdAt: String
        updatedAt: String
    }
    `;
    try {
        const transformer = new graphql_transformer_core_1.GraphQLTransform({
            transformers: [new graphql_dynamodb_transformer_1.DynamoDBModelTransformer(), new graphql_versioned_transformer_1.VersionedModelTransformer()],
        });
        const out = transformer.transform(validSchema);
        let ddbClient;
        ({ dbPath, emulator: ddbEmulator, client: ddbClient } = yield index_1.launchDDBLocal());
        const result = yield index_1.deploy(out, ddbClient);
        server = result.simulator;
        const endpoint = server.url + '/graphql';
        index_1.logDebug(`Using graphql url: ${endpoint}`);
        const apiKey = result.config.appSync.apiKey;
        expect(apiKey).toBeDefined();
        expect(endpoint).toBeDefined();
        GRAPHQL_CLIENT = new graphql_client_1.GraphQLClient(endpoint, { 'x-api-key': apiKey });
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
        console.error(e);
        expect(true).toEqual(false);
    }
}));
/**
 * Test queries below
 */
test('Test createPost mutation', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield GRAPHQL_CLIENT.query(`mutation {
        createPost(input: { title: "Hello, World!" }) {
            id
            title
            createdAt
            updatedAt
            version
        }
    }`, {});
    expect(response.data.createPost.id).toBeDefined();
    expect(response.data.createPost.title).toEqual('Hello, World!');
    expect(response.data.createPost.createdAt).toBeDefined();
    expect(response.data.createPost.updatedAt).toBeDefined();
    expect(response.data.createPost.version).toEqual(1);
}));
test('Test updatePost mutation', () => __awaiter(void 0, void 0, void 0, function* () {
    const createResponse = yield GRAPHQL_CLIENT.query(`mutation {
        createPost(input: { title: "Test Update" }) {
            id
            title
            createdAt
            updatedAt
            version
        }
    }`, {});
    expect(createResponse.data.createPost.id).toBeDefined();
    expect(createResponse.data.createPost.title).toEqual('Test Update');
    expect(createResponse.data.createPost.version).toEqual(1);
    const updateResponse = yield GRAPHQL_CLIENT.query(`mutation {
        updatePost(input: {
            id: "${createResponse.data.createPost.id}",
            title: "Bye, World!",
            expectedVersion: ${createResponse.data.createPost.version}
        }) {
            id
            title
            version
        }
    }`, {});
    expect(updateResponse.data.updatePost.title).toEqual('Bye, World!');
    expect(updateResponse.data.updatePost.version).toEqual(2);
}));
test('Test failed updatePost mutation with wrong version', () => __awaiter(void 0, void 0, void 0, function* () {
    const createResponse = yield GRAPHQL_CLIENT.query(`mutation {
        createPost(input: { title: "Test Update" }) {
            id
            title
            createdAt
            updatedAt
            version
        }
    }`, {});
    expect(createResponse.data.createPost.id).toBeDefined();
    expect(createResponse.data.createPost.title).toEqual('Test Update');
    expect(createResponse.data.createPost.version).toEqual(1);
    const updateResponse = yield GRAPHQL_CLIENT.query(`mutation {
        updatePost(input: {
            id: "${createResponse.data.createPost.id}",
            title: "Bye, World!",
            expectedVersion: 3
        }) {
            id
            title
            version
        }
    }`, {});
    expect(updateResponse.errors.length).toEqual(1);
    expect(updateResponse.errors[0].errorType).toEqual('DynamoDB:ConditionalCheckFailedException');
}));
test('Test deletePost mutation', () => __awaiter(void 0, void 0, void 0, function* () {
    const createResponse = yield GRAPHQL_CLIENT.query(`mutation {
        createPost(input: { title: "Test Delete" }) {
            id
            title
            version
            createdAt
            updatedAt
        }
    }`, {});
    expect(createResponse.data.createPost.id).toBeDefined();
    expect(createResponse.data.createPost.title).toEqual('Test Delete');
    expect(createResponse.data.createPost.version).toBeDefined();
    const deleteResponse = yield GRAPHQL_CLIENT.query(`mutation {
        deletePost(input: { id: "${createResponse.data.createPost.id}", expectedVersion: ${createResponse.data.createPost.version} }) {
            id
            title
            version
        }
    }`, {});
    expect(deleteResponse.data.deletePost.title).toEqual('Test Delete');
    expect(deleteResponse.data.deletePost.version).toEqual(createResponse.data.createPost.version);
}));
test('Test deletePost mutation with wrong version', () => __awaiter(void 0, void 0, void 0, function* () {
    const createResponse = yield GRAPHQL_CLIENT.query(`mutation {
        createPost(input: { title: "Test Delete" }) {
            id
            title
            version
            createdAt
            updatedAt
        }
    }`, {});
    expect(createResponse.data.createPost.id).toBeDefined();
    expect(createResponse.data.createPost.title).toEqual('Test Delete');
    expect(createResponse.data.createPost.version).toBeDefined();
    const deleteResponse = yield GRAPHQL_CLIENT.query(`mutation {
        deletePost(input: { id: "${createResponse.data.createPost.id}", expectedVersion: 3 }) {
            id
            title
            version
        }
    }`, {});
    expect(deleteResponse.errors.length).toEqual(1);
    expect(deleteResponse.errors[0].errorType).toEqual('DynamoDB:ConditionalCheckFailedException');
}));
//# sourceMappingURL=versioned-model-transformer.e2e.test.js.map
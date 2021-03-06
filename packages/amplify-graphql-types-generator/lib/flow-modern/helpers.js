"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const t = require("babel-types");
const builtInScalarMap = {
    [graphql_1.GraphQLString.name]: t.stringTypeAnnotation(),
    [graphql_1.GraphQLInt.name]: t.numberTypeAnnotation(),
    [graphql_1.GraphQLFloat.name]: t.numberTypeAnnotation(),
    [graphql_1.GraphQLBoolean.name]: t.booleanTypeAnnotation(),
    [graphql_1.GraphQLID.name]: t.stringTypeAnnotation(),
};
function createTypeAnnotationFromGraphQLTypeFunction(compilerOptions) {
    return function typeAnnotationFromGraphQLType(type, { nullable } = {
        nullable: true,
    }) {
        if (graphql_1.isNonNullType(type)) {
            return typeAnnotationFromGraphQLType(type.ofType, { nullable: false });
        }
        if (graphql_1.isListType(type)) {
            const typeAnnotation = t.arrayTypeAnnotation(typeAnnotationFromGraphQLType(type.ofType));
            if (nullable) {
                return t.nullableTypeAnnotation(typeAnnotation);
            }
            else {
                return typeAnnotation;
            }
        }
        let typeAnnotation;
        if (type instanceof graphql_1.GraphQLScalarType) {
            const builtIn = builtInScalarMap[type.name];
            if (builtIn) {
                typeAnnotation = builtIn;
            }
            else {
                if (compilerOptions.passthroughCustomScalars) {
                    typeAnnotation = t.anyTypeAnnotation();
                }
                else {
                    typeAnnotation = t.genericTypeAnnotation(t.identifier(type.name));
                }
            }
        }
        else {
            typeAnnotation = t.genericTypeAnnotation(t.identifier(type.name));
        }
        if (nullable) {
            return t.nullableTypeAnnotation(typeAnnotation);
        }
        else {
            return typeAnnotation;
        }
    };
}
exports.createTypeAnnotationFromGraphQLTypeFunction = createTypeAnnotationFromGraphQLTypeFunction;
//# sourceMappingURL=helpers.js.map
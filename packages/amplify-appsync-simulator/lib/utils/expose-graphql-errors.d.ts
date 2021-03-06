/**
 * GraphQL Allows to show custom errors properties in errors using a property called extensions.
 * AppSync doesn't use extensions in error instead it puts the error at the objects root level.
 * For instance, UnAuthorized has errorType field with value Unauthorized.
 *
 * This utility method takes all the properties exposed through extensions and exposes them at root
 * level of the Error object
 * @param errors GraphQLError object
 *
 */
export declare function exposeGraphQLErrors(errors?: any[]): any[];

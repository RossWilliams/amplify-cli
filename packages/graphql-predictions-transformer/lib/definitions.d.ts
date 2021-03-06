import { InputValueDefinitionNode, InputObjectTypeDefinitionNode, FieldDefinitionNode } from 'graphql';
export declare function capitalizeFirstLetter(str: string): string;
export declare function getActionInputName(action: string, fieldName: string): string;
export declare function makeActionInputObject(fieldName: string, fields: InputValueDefinitionNode[]): InputObjectTypeDefinitionNode;
export declare function getActionInputType(action: string, fieldName: string, isFirst?: boolean): InputObjectTypeDefinitionNode;
export declare function addInputArgument(field: FieldDefinitionNode, fieldName: string, isList: boolean): FieldDefinitionNode;
export declare function createInputValueAction(action: string, fieldName: string): InputValueDefinitionNode;

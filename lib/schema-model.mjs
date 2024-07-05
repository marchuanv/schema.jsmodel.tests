import { Schema } from '@hyperjump/json-schema-core';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const dialectId = 'https://json-schema.org/draft/2020-12/schema';
Schema.setConfig(dialectId, "jrefToken", "$ref");
const privateBag = new WeakMap();
export class SchemaModel {
    /**
     * @param { SchemaLoader }
    */
    constructor(schemaLoader) {
        const targetType = new.target;
        if (schemaLoader === null || schemaLoader === undefined || !(schemaLoader instanceof SchemaLoader)) {
            throw new Error(`The schemaLoader argument is null, undefined or not an instance of ${SchemaLoader.name}`);
        }
        if (!schemaLoader.isLoaded) {
            throw new Error('schema is not loaded.');
        }
        for (const reqProperty of schemaLoader.schema.required) {
            const desc = Reflect.getOwnPropertyDescriptor(targetType.prototype, reqProperty);
            if (desc === undefined || desc === null) {
                throw new Error(`${reqProperty} property is required.`);
            }
            if (desc.get === undefined || desc.get === null) {
                throw new Error(`${reqProperty} get property is required.`);
            }
        }
    }
}
export class SchemaLoader {
    /**
     * @param { String } jsonSchemaFilePath 
    */
    constructor(jsonSchemaFilePath) {
        jsonSchemaFilePath = resolve(jsonSchemaFilePath);
        if (!existsSync(jsonSchemaFilePath)) {
            throw new Error(`${jsonSchemaFilePath} not found.`);
        }
        privateBag.set(this, { jsonSchemaFilePath, isLoaded: false, schema: null });
    }
    /**
     * @returns { Boolean }
    */
    get isLoaded() {
        const { isLoaded } = privateBag.get(this);
        return isLoaded;
    }
    /**
     * @returns { import('@hyperjump/json-schema/experimental').SchemaDocument }
    */
    get schema() {
        const { schema: { schema } } = privateBag.get(this);
        return schema;
    }
    async load() {
        const bag = privateBag.get(this);
        const { jsonSchemaFilePath } = bag;
        const { default: schemaObj } = await import(pathToFileURL(jsonSchemaFilePath), { assert: { type: 'json' } });
        const { $id, $schema } = schemaObj;
        if ($schema && dialectId !== $schema) {
            throw new Error(`no support for the ${$schema} dialect.`);
        }
        Schema.add(schemaObj, $id, dialectId);
        bag.schema = await Schema.get($id);
        bag.isLoaded = true;
    }
}
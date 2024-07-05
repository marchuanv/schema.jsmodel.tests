import { SchemaLoader } from '../lib/schema-model.mjs';
describe('SchemaLoader', () => {
    describe('when importing the person schema example', () => {
        it('should return a schema object', async () => {
            const schemaLoader = new SchemaLoader('./spec/schemas/person.schema.json');
            await schemaLoader.load();
            expect(schemaLoader.schema).toBeDefined();
            expect(schemaLoader.schema).not.toBeNull();
        });
    });
});


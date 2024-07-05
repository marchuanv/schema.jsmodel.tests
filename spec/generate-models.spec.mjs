import { SchemaLoader } from "../lib/schema-model.mjs";
import { ComplexObject } from "./models/complex-object.mjs";
describe('GenerateModels', () => {
    describe('when generating models from a schema', () => {
        it('should create model class files', async () => {
            const schemaLoader = new SchemaLoader('./spec/schemas/person.schema.json');
            await schemaLoader.load();
            const complexObject = new ComplexObject(schemaLoader);
            expect(complexObject).toBeDefined();
            expect(complexObject).not.toBeNull();
        });
    });
});


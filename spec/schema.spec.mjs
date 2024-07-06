import { getModels, SchemaLoader } from 'schema.jsmodel';
describe(('Schemas'), () => {
    describe(('given a schema'), () => {
        it('should', async () => {
            const schemaLoader = new SchemaLoader('./spec/schemas/complex.schema.json');
            const models = await getModels(schemaLoader);
            expect(models.length).toBe(2);
        });
    });
});
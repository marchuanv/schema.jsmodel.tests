import { getModels } from 'schema.jsmodel';
describe(('Schemas'), () => {
    describe(('given a schema'), () => {
        it('should', async () => {
            const models = await getModels('./spec/schemas/complex.schema.json');
            expect(models).toBeDefined();
        });
    });
});
import { getModels } from 'schema.jsmodel';
describe(('Schemas'), () => {
    describe(('given a schema'), () => {
        it('should export models', async () => {
            const { AddressModel, ComplexObjectModel } = await getModels('./spec/schemas/complex.schema.json');
            expect(AddressModel).toBeDefined();
            expect(ComplexObjectModel).toBeDefined();
        });
    });
});
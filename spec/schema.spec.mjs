import { getModels, SchemaLoader } from 'schema.jsmodel';
describe(('Schemas'), () => {
    describe(('given a schema'), () => {
        it('should', async () => {
            const schemaLoader = new SchemaLoader('./spec/schemas/complex.schema.json');
            const models = await getModels(schemaLoader);
            const { instance } = models.find(x => x.type.name === 'AddressModel');
            instance.postalCode = 1232134;
            instance.Id = 'awdawdawd';
            const id = instance.Id;
            const postalCode = instance.postalCode;
            expect(models.length).toBe(2);
        });
    });
});
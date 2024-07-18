import { generate } from 'schema.jsmodel';
describe(('Schemas'), () => {
    describe(('given a schema'), () => {
        it('should export models', async () => {
            await generate();
        });
    });
});
import { ModelClasses } from "./lib/model-classes.mjs";
import { SchemaLoader } from "./lib/schema-loader.mjs";
const schemaLoader = new SchemaLoader('./spec/schemas/person.schema.json');
await schemaLoader.load();
ModelClasses.create(schemaLoader);
import { SchemaModel } from '../../lib/schema-model.mjs';

export class AddressModel extends SchemaModel {
    get Id() {
        return super.get({ Id: String.prototype });
    }
    get street() {
        return super.get({ street: String.prototype });
    }
    set street(value) {
        super.set({ street: value });
    }
    get city() {
        return super.get({ city: String.prototype });
    }
    set city(value) {
        super.set({ city: value });
    }
    get state() {
        return super.get({ state: String.prototype });
    }
    set state(value) {
        super.set({ state: value });
    }
    get postalCode() {
        return super.get({ postalCode: Number.prototype });
    }
    set postalCode(value) {
        super.set({ postalCode: value });
    }

}
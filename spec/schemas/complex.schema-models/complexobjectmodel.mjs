import { SchemaModel } from '../../lib/schema-model.mjs';
import { AddressModel } from './addressmodel.mjs';

export class ComplexObjectModel extends SchemaModel {
    get Id() {
        return super.get({ Id: String.prototype });
    }
    get name() {
        return super.get({ name: String.prototype });
    }
    set name(value) {
        super.set({ name: value });
    }
    get age() {
        return super.get({ age: Number.prototype });
    }
    set age(value) {
        super.set({ age: value });
    }
    get address() {
        return super.get({ address: AddressModel.prototype });
    }
    set address(value) {
        super.set({ address: value });
    }
    get hobbies() {
        return super.get({ hobbies: Array.prototype });
    }
    set hobbies(value) {
        super.set({ hobbies: value });
    }

}
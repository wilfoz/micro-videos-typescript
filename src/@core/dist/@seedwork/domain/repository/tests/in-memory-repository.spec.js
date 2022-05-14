"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("#seedwork/domain/entity/entity");
const in_memory_repository_1 = require("../in-memory-repository");
const not_found_error_1 = require("#seedwork/domain/errors/not-found.error");
const unique_entity_id_vo_1 = require("#seedwork/domain/value-objects/unique-entity-id.vo");
class StubEntity extends entity_1.default {
}
class StubInMemoryRepository extends in_memory_repository_1.InMemoryRepository {
}
describe("InMemoryRepository Unit Tests", () => {
    let repository;
    beforeEach(() => (repository = new StubInMemoryRepository()));
    it("should inserts a new entity", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it("should throws error when entity not found", async () => {
        expect(repository.findById("fake id")).rejects.toThrow(new not_found_error_1.default('Entity with id fake id not found'));
    });
    it("should throws error when entity not found", async () => {
        expect(repository.findById(new unique_entity_id_vo_1.default("2e569136-03f3-47d0-acb8-65fc30d5c1ac"))).rejects.toThrow(new not_found_error_1.default("Entity with id 2e569136-03f3-47d0-acb8-65fc30d5c1ac not found"));
    });
    it("should finds a entity by id", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        await repository.insert(entity);
        let foundEntity = await repository.findById(entity.id);
        expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
        foundEntity = await repository.findById(entity.uniqueEntityId);
        expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
    });
    it("should returns all entities", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toStrictEqual([entity]);
    });
    it("should throws error on update when entity not found", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        expect(repository.update(entity)).rejects.toThrow(new not_found_error_1.default(`Entity with id ${entity.id} not found`));
    });
    it("should update an entity", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        await repository.insert(entity);
        const updatedEntity = new StubEntity({ name: "test2", price: 2 }, entity.uniqueEntityId);
        await repository.update(updatedEntity);
        expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it("should throws error on delete when entity not found", async () => {
        expect(repository.delete("fake id")).rejects.toThrow(new not_found_error_1.default('Entity with id fake id not found'));
    });
    it("should throws error on delete when entity not found", async () => {
        expect(repository.delete(new unique_entity_id_vo_1.default("2e569136-03f3-47d0-acb8-65fc30d5c1ac"))).rejects.toThrow(new not_found_error_1.default("Entity with id 2e569136-03f3-47d0-acb8-65fc30d5c1ac not found"));
    });
    it("should delete an entity", async () => {
        const entity = new StubEntity({ name: "test", price: 1 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);
        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});

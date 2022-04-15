import Entity from '../entity/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export interface RepositoryInterface<E extends Entity> {
    insert(entity: E): Promise<void>;
    update(entity: E): Promise<void>;
    findAll(): Promise<E[]>;
    findById(id: string | UniqueEntityId): Promise<E>;
    delete(id: string | UniqueEntityId): Promise<void>;
}
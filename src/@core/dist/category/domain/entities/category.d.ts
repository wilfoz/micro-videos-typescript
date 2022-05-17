import UniqueEntityId from '#shared/domain/value-objects/unique-entity-id.vo';
import { Entity } from '#shared/domain/entity/entity';
export declare type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
};
export declare class Category extends Entity<CategoryProperties> {
    readonly props: CategoryProperties;
    constructor(props: CategoryProperties, id?: UniqueEntityId);
    update(name: string, description: string): void;
    static validate(props: CategoryProperties): void;
    activate(): void;
    deactivate(): void;
    get name(): string;
    private set name(value);
    get description(): string | null;
    private set description(value);
    get is_active(): boolean;
    private set is_active(value);
    get created_at(): Date;
}

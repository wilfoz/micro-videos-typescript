import UniqueEntityId from '../../../@seedwork/domain/unique-entity-id.vo';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category {
    public readonly id: UniqueEntityId;

    constructor(readonly props: CategoryProperties, id?: UniqueEntityId) {
        this.props.description = this.description ?? null;
        this.props.is_active = this.is_active ?? true;
        this.props.created_at = this.created_at ?? new Date();
        this.id = id || new UniqueEntityId();
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value;
    }

    get is_active() {
        return this.props.is_active;
    }

    private set is_active(value: boolean) { 
        this.props.is_active = value;
    }

    get created_at() {
        return this.props.created_at;
    }
}
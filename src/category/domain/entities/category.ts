export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category {
    constructor(readonly props: CategoryProperties) {}

    get name(): string {
        return this.props.name;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    get isActive(): boolean | undefined {
        return this.props.is_active;
    }

    get createdAt(): Date | undefined {
        return this.props.created_at;
    }
}
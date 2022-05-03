import CategoryRepository from '../../repository/category.repository';
import { Category } from '../../domain/entities/category';
import { CategoryOutput } from '../dto/category.output.dto';
import { UseCase } from '../../../@seedwork/application/use-case';

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }
    async execute(input: Input): Promise<Output> {
        const entity = new Category(input);
        await this.categoryRepo.insert(entity);
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
        }
    }
}

//DTO - Data transfer Object

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
}

export type Output = CategoryOutput;
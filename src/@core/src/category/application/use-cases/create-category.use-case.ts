import { CategoryRepository } from '#category/repository/category.repository';
import { Category } from '../../domain/entities/category';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category.output';
import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';

export namespace CreateCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }
        async execute(input: Input): Promise<Output> {
            const entity = new Category(input);
            await this.categoryRepo.insert(entity);
            return CategoryOutputMapper.toOutput(entity);
        }
    }

    export type Input = {
        name: string;
        description?: string;
        is_active?: boolean;
    }
    
    export type Output = CategoryOutput;
}


//DTO - Data transfer Object


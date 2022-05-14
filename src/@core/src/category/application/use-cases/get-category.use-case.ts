import { CategoryRepository } from '#category/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category.output';
import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';

export namespace GetCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const entity = await this.categoryRepo.findById(input.id);
            return CategoryOutputMapper.toOutput(entity);
        }
    }

    //DTO - Data transfer Object || Boundary

    export type Input = {
        id: string;
    }

    export type Output = CategoryOutput;
}

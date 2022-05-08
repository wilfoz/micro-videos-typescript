import { CategoryRepository } from '#category/repository/category.repository';
import { CategoryOutput } from '../dto/category.output';
import { UseCase } from '#seedwork/application/use-case';
export default class CreateCategoryUseCase implements UseCase<Input, Output> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<Output>;
}
export declare type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
};
export declare type Output = CategoryOutput;

import { RepositoryInterface, SearchableRepositoryInterface } from '../../@seedwork/domain/repository/repository-contracts';
import { Category } from '../domain/entities/category';

export interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any> { }
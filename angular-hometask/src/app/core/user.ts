import { UserEntity } from './user-entity.model';

export class User implements UserEntity {
    id: number;
    firstName: string;
    lastName: string;
}

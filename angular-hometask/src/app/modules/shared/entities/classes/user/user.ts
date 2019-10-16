import { IUserEntity } from '../../../../../interfaces/user-entity.model';

export class User implements IUserEntity {
    id: number;
    firstName: string;
    lastName: string;
}

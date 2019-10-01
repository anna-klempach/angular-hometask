import { User } from './user';
import { UserEntity } from './user-entity.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
  it('should implement User Entity Interface', () => {
    expect(new User() as UserEntity).toBeTruthy();
  });
});

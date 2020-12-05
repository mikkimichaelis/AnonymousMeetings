import { IUser, IGroup } from 'src/models';

export interface IUserBLLService {
  isHomeGroup(user: IUser, group: IGroup): boolean;
  setName(user: IUser);
  makeHomeGroup(user: IUser, group: IGroup);
}

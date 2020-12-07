import { IUser, IGroup } from 'src/models';

export interface IUserBLLService {
  isHomeGroup(user: IUser, group: IGroup): boolean;
}

import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';
import { User, UserType } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string = '';

  @prop({ required: true, unique: true })
  public email: string = '';

  @prop({ required: true })
  public password?: string = '';

  @prop({ required: true })
  public userType: UserType = UserType.Basic;

  @prop({ required: false, default: null })
  public avatar?: string = '';

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatarUrl;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

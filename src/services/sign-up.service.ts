import { User } from "@models/user.entity";
import { GetConnection } from '@config/database';
import { genSaltSync, hashSync } from 'bcrypt';
import { saltRounds } from '@utilities/constants';

const user = GetConnection(User);

export function UserAll() {
  return user.find();
}

export function GetUserName(userName: string) {
  return user.find({
    where: {
      userName
    }
  });
}

export function AddUserLogin(userName: string, password: string, idUser: string) {
  const salt = genSaltSync(saltRounds)

  return user.insert({
    userName,
    password: hashSync(password, salt),
    idUser,
    salt
  })
}

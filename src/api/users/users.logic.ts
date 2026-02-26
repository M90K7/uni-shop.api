import { context } from "@app/db";
import { IUserDocument, UserBankAccount } from "@app/models";


export async function login(params: { username: string; password: string; }) {

  // TODO: Implement login logic
  const user = await context.user.findOne({ username: params.username });
  if (!user) {
    return null;
  }

  // const isPasswordValid = await bcrypt.compare(params.password, user.password);
  const isPasswordValid = params.password === user.password;
  if (!isPasswordValid) {
    return null;
  }

  return user as IUserDocument;
}

export function getUserById(id: string): Promise<IUserDocument | null> {
  return context.user.findOne({ _id: id });
}

export function addUserBankAccount(userId: string, account: UserBankAccount): Promise<IUserDocument | null> {
  return context.user.findOneAndUpdate(
    { _id: userId },
    { $push: { userBankAccounts: account } },
    { new: true }
  );
}

export function removeUserBankAccount(userId: string, shabaNumber: string): Promise<IUserDocument | null> {
  return context.user.findOneAndUpdate(
    { _id: userId },
    { $pull: { userBankAccounts: { shabaNumber } } },
    { new: true }
  );
}

export function getAllUsers() {
  return context.user.find({}).select("-carts").exec();
}

export function createUser(data: IUserDocument): Promise<IUserDocument> {
  data.createdAt = new Date();
  data.updatedAt = new Date();

  const newUser = new context.user(data);
  return newUser.save();
}

// update user information
export function updateUser(id: string, data: Partial<IUserDocument>): Promise<IUserDocument | null> {
  data.updatedAt = new Date();

  return context.user.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
}

export function deleteUser(id: string): Promise<IUserDocument | null> {
  return context.user.findOneAndDelete({ _id: id });
}
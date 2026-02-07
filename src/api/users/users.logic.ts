import { context } from "@app/db";
import { IUserDocument } from "@app/models";


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

export function getUserById(id: string) {
  return context.user.findOne({ _id: id });
}


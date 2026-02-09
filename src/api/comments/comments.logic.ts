import { context } from "@app/db";
import { ICommentDocument, IUser } from "@app/models";

// add comment
export function addComment(user: IUser, comment: string): Promise<ICommentDocument> {
  const newComment = new context.comment({
    userAvatar: user.avatarPath,
    userFullName: user.fullName,
    userScore: 0,
    comment,
    createdAt: new Date(),
    createdAtFa: new Date(),
    approved: true
  });
  return newComment.save();
}

// get comments
export function getProductComments(productId: string, page: number): Promise<ICommentDocument[]> {
  return context.comment.find({ productId })
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ createdAt: -1 })
    .exec();
}
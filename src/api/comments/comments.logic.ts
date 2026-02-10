import { context } from "@app/db";
import { ICommentDocument, IUser } from "@app/models";

// add comment
export function addComment(user: IUser, productId: string, comment: string, replyToId?: string): Promise<ICommentDocument> {
  const newComment = new context.comment({
    userId: user._id,
    productId,
    replyToId,
    userFullName: user.fullName,
    comment,
    createdAt: new Date(),
    createdAtFa: new Date(),
    approved: true,
    userScore: 0,
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
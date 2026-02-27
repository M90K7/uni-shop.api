import { context } from "@app/db";
import { ICommentDocument, IUser } from "@app/models";

// add comment
export function addComment(user: IUser, productId: string, comment: string, replyToId?: string): Promise<ICommentDocument> {
  const newComment = new context.comment({
    user: user._id,
    product: productId,
    replyToId,
    userFullName: `${user.firstName} ${user.lastName}`,
    comment,
    createdAt: new Date(),
    modifiedAt: new Date(),
    approved: true,
    userScore: 0,
  });
  return newComment.save();
}

// get comments
export function getProductComments(productId: string, page: number): Promise<ICommentDocument[]> {
  return context.comment.find({ product: productId, approved: true })
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ createdAt: -1 })
    .exec();
}

export function getUserComments(userId: string): Promise<ICommentDocument[]> {
  return context.comment.find({ user: userId }).populate("product").exec();
}

export function getAllComments(): Promise<ICommentDocument[]> {
  return context.comment.find({}).sort({ createdAt: -1 }).populate("product").populate("user").exec();
}

export function updateComment(id: string, data: Partial<ICommentDocument>): Promise<ICommentDocument | null> {
  data.modifiedAt = new Date();

  return context.comment.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  ).populate("user").populate("product");
}

export function deleteComment(id: string): Promise<ICommentDocument | null> {
  return context.comment.findOneAndDelete({ _id: id });
}
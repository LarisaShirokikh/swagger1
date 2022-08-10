import {CommentType, PostType} from "../types/types";
import {commentCollection, postsCollection} from "../settings";

export const commentRepository = {


    async isComment(commentId: string) {

        const comment: CommentType | null = await commentCollection
            .findOne({id: commentId}, {projection: {_id: 0}})
        return comment;

        if (comment) {
            return true;
        } else {
            return false;
        }
    },

    async updateComment(commentId: string, content: string): Promise<CommentType | undefined> {
        const result = await commentCollection.updateOne({id: commentId}, {
            $set: { content }
        })
        return

    },

    async getCommentById(commentId: string): Promise<CommentType | null> {
        const comment = await commentCollection.findOne({id: commentId}, {projection: {_id: 0}})
        return comment;
    },

    async deleteComment(commentId: string): Promise<boolean> {
        const result = await commentCollection
            .deleteOne({id: commentId})
        return result.deletedCount === 1;
    }
}
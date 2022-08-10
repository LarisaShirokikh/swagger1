import {commentRepository} from "../repositories/comment-repository";
import {CommentType, PostType} from "../types/types";
import {postDbRepository} from "../repositories/post-db-repository";


export const commentsService = {
    async updateComment(commentId: string, content: string): Promise<boolean> {
        return commentRepository.updateComment(commentId, content)
    },

    async getCommentById (commentId: string): Promise<CommentType | null> {

        return commentRepository.getCommentById(commentId)
    },

    async deleteComment(commentId: string): Promise<boolean> {
        return commentRepository.deleteComment(commentId)
    }
}
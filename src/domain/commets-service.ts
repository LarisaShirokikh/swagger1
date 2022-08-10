import {commentRepository} from "../repositories/comment-repository";
import {CommentType, PostType} from "../types/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {usersRepository} from "../repositories/users-repository";


export const commentsService = {
    async updateComment(commentId: string, content: string): Promise<CommentType | undefined> {
        return commentRepository.updateComment(commentId, content)
    },

    async getCommentById (commentId: string): Promise<CommentType | null> {

        return commentRepository.getCommentById(commentId)
    },

    async deleteComment(commentId: string): Promise<boolean> {
        return commentRepository.deleteComment(commentId)
    },

    async creatCommentsByPostId(postId: string,
                              content: string,
                              userId: string,
                              userLogin: string,
                              addedAt: "2022-08-10T12:21:32.209Z") {
        const user = await usersRepository.getUserById(userId)
        if (user) {
            const newComment: CommentType = {
                id: (new Date()).toString(),
                content: content,
                userId: userId,
                userLogin: user.login,
                addedAt: addedAt
            }
            const createdCommentDb = await commentRepository
                .createComment(newComment)
            return createdCommentDb
        }
    }
}
import {bloggers, bloggersRepository} from "./bloggers-repository";

let posts = [
    {id: 1, title: 'About JS - 01', bloggerName: "string", shortDescription: 'shortDescription', content: "string", bloggerId: 1},
    {id: 2, title: 'About JS - 02', bloggerName: "string", shortDescription: 'shortDescription', content: "string", bloggerId: 2},
    {id: 3, title: 'About JS - 03', bloggerName: "string", shortDescription: 'shortDescription', content: "string", bloggerId: 3},
    {id: 4, title: 'About JS - 04', bloggerName: "string", shortDescription: 'shortDescription', content: "string", bloggerId: 4},
    {id: 5, title: 'About JS - 05', bloggerName: "string", shortDescription: 'shortDescription', content: "string", bloggerId: 5},
]

export const postRepository = {
    getPosts() {
        return posts
    },


    createPost(title: string,
               shortDescription: string,
               content: string, id: number) {
        let blogger = bloggersRepository.getBloggerById(id)
        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title: title,
                bloggerName: blogger.name!,
                shortDescription: shortDescription,
                content: content,
                bloggerId: id
            }
            posts.push(newPost)
            return newPost
        }
    },

    getPostById(id: string) {
        return posts.find(p => p.id === +id)

    },

    updatePostTitle(title: string,
                    shortDescription: string,
                    content: string, id: number) {
        let post = posts.find(p => p.id === +id)
        if (post) {
            post.title = title
            return post
        } else {
            return false
        }
    },

    deletePost(id: string) {
        const newVideo = posts.filter(p => p.id !== +id)
        if (newVideo.length < posts.length) {
            posts = newVideo
            return true
        } else {
            return false
        }
    },

    findPost(title: string | null | undefined) {
        if (title) {

            let filteredPosts = posts.filter(v => v.title.indexOf(title) > -1)
            return filteredPosts
        } else {
            return posts
        }
    }
}

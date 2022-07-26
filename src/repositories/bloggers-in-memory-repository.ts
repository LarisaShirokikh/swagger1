import {bloggers, BloggersType} from "./db";





export const bloggersInMemoryRepository = {
    async getBloggers(): Promise<BloggersType[]> {
        return bloggers
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },

    async getBloggerById(id: number) {
        return bloggers.find(b => b.id === id)
    },

    async deleteBlogger(id: string) {
        const delBlogger = bloggers.filter(b => b.id !== +id)
        let blogger;
        if (delBlogger.length < bloggers.length) {
            blogger = delBlogger
            return true
        } else {
            return false
        }
    },

    async updateBloggerByInputModel(id: string, name: string, shortDescription: string,
                              content: string) {
        let blogger = bloggers.find(b => b.id === +id)
        if (blogger) {
            blogger.name = name
            return blogger
        } else {
            return false
        }

    },

    async findBlogger(name: string | null | undefined) {
        if (name) {
            let filteredBlogger = bloggers.filter(v => v.name.indexOf(name) > -1)
            return filteredBlogger
        } else {
            return bloggers
        }
    }

}








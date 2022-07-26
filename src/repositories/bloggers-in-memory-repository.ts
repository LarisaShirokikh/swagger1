export let bloggers: BloggersType[] = [
    {id: 1, name: 'Blogger - 01', youtubeUrl: "https://someurl.com"},
    {id: 2, name: 'Blogger - 02', youtubeUrl: "https://someurl.com"},
    {id: 3, name: 'Blogger - 03', youtubeUrl: "https://someurl.com"},
    {id: 4, name: 'Blogger - 04', youtubeUrl: "https://someurl.com"},
    {id: 5, name: 'Blogger - 05', youtubeUrl: "https://someurl.com"},
]
export type BloggersType  = {
        id: number,
        name: string,
        youtubeUrl: string,
    }



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
        if (delBlogger.length < bloggers.length) {
            bloggers = delBlogger
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








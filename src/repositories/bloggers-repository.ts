let bloggers = [
    {id: 1, name: 'Blogger - 01', youtubeUrl: "https://someurl.com"},
    {id: 2, name: 'Blogger - 02', youtubeUrl: "https://someurl.com"},
    {id: 3, name: 'Blogger - 03', youtubeUrl: "https://someurl.com"},
    {id: 4, name: 'Blogger - 04', youtubeUrl: "https://someurl.com"},
    {id: 5, name: 'Blogger - 05', youtubeUrl: "https://someurl.com"},
]

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },

    createBlogger(name: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: "https://someurl.com"
        }
        bloggers.push(newBlogger)
        return newBlogger
    },

    getBloggerById(id: string) {
        return bloggers.find(b => b.id === +id)
    },

    deleteBlogger(id: string) {
        const delBlogger = bloggers.filter(b => b.id !== +id)
        if (delBlogger.length < bloggers.length) {
            bloggers = delBlogger
            return true
        } else {
            return false
        }
    },

    updateBloggerByInputModel(id: string, name: string) {
        let blogger = bloggers.find(b => b.id === +id)
        if (blogger) {
            blogger.name = name
            return blogger
        } else {
            return false
        }

    },

    findBlogger(name: string | null | undefined) {
        if (name) {
            let filteredBlogger = bloggers.filter(v => v.name.indexOf(name) > -1)
            return filteredBlogger
        } else {
            return bloggers
        }
    }

}








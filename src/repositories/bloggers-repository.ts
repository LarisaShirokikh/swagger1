let bloggers = [
    {id: 1, name: 'Blogger - 01', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'Blogger - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'Blogger - 03', youtubeUrl: 'it-incubator.eu'},
    {id: 4, name: 'Blogger - 04', youtubeUrl: 'it-incubator.eu'},
    {id: 5, name: 'Blogger - 05', youtubeUrl: 'it-incubator.eu'},
]

export const bloggersRepository = {
   getBloggers() {
      return bloggers
   },

   createBlogger(name: string) {
       const newBlogger = {
           id: +(new Date()),
           name: name,
           youtubeUrl: 'it-incubator.eu'
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
    }
}








let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
    findVideo(title: string | null | undefined) {
        if (title) {

            let filteredVideos = videos.filter(v => v.title.indexOf(title) > -1)
            return filteredVideos
        } else {
            return videos
        }
    },

    getVideos(){
        return videos
    },

    findVideoById(id: string) {
        const video = videos.find(v => v.id === +id)
        return video
    },

    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'author'
        }
        videos.push(newVideo)
        return newVideo
    },

    getVideoById(id: string) {
        return  videos.find(v => v.id === +id)

    },


    updateVideoTitle(id: string, title: string) {
        let video = videos.find(v => v.id === +id)
        if (video) {
            video.title = title
            return video
        }
    },

    deleteVideo(id: string) {
        const newVideo = videos.filter(v => v.id !== +id)
        if (newVideo.length < videos.length) {
            videos = newVideo
            return true
        } else {
            return false
        }
    }
}
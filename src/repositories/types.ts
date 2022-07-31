import {ObjectId} from "mongodb";


export const bloggersCollection: BloggerType[] = [
    {
        id: 1,
        name: 'Blogger - 01',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: 2,
        name: 'Blogger - 02',
        youtubeUrl: "https://someurl.com",

    },
    {
        id: 3,
        name: 'Blogger - 03',
        youtubeUrl: "https://someurl.com"
    },
    {
        id: 4,
        name: 'Blogger - 04',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: 5,
        name: 'Blogger - 05',
        youtubeUrl: "https://someurl.com",
    },
]

export type BloggerType = {
    id: number,
    name: string
    youtubeUrl: string,
}





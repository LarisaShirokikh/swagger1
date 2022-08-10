import {ObjectId} from "mongodb";


export const bloggersCollection: BloggerType[] = [
    {
        id: "1",
        name: 'Blogger - 01',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: "2",
        name: 'Blogger - 02',
        youtubeUrl: "https://someurl.com",

    },
    {
        id: "3",
        name: 'Blogger - 03',
        youtubeUrl: "https://someurl.com"
    },
    {
        id: "4",
        name: 'Blogger - 04',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: "5",
        name: 'Blogger - 05',
        youtubeUrl: "https://someurl.com",
    },
]


export let postsCollection: PostType[] | null = [
    {
        id: "1",
        title: 'About JS - 01',
        bloggerName: "string",
        shortDescription: 'shortDescription',
        content: "string",
        bloggerId: "1"
    },
    {
        id: "2",
        title: 'About JS - 02',
        bloggerName: "string",
        shortDescription: 'shortDescription',
        content: "string",
        bloggerId: "2"
    },
    {
        id: "3",
        title: 'About JS - 03',
        bloggerName: "string",
        shortDescription: 'shortDescription',
        content: "string",
        bloggerId: "3"
    },
    {
        id: "4",
        title: 'About JS - 04',
        bloggerName: "string",
        shortDescription: 'shortDescription',
        content: "string",
        bloggerId: "4"
    },
    {
        id: "5",
        title: 'About JS - 05',
        bloggerName: "string",
        shortDescription: 'shortDescription',
        content: "string",
        bloggerId: "5"
    },
]

export type BloggerType = {
    id: string,
    name: string
    youtubeUrl: string,
};

export type Pagination<T> = {
    page: number
    pageSize: number
    totalCount: number
    pagesCount: number
    items: T
};

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: string,
    bloggerName: string
};


export type UserRegType = {
    id: string,
    login: string,

};

export type CommentType = {
    id: string;
    content: string;
    userId: string;
    userLogin: string;
    addedAt: "2022-08-10T12:21:32.209Z"
};


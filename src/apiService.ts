export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

/**
 * Service class to fetch posts and comments for the API end point
 */
export class ApiService {
    private static instance: ApiService;
    private comments: Comment[] = [];
    private posts: Post[] = [];

    private constructor () {}

    public static getInstance() : ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }


    /**
     * Fetches the posts from the api end point. If the posts are already fetched, it will returned the 
     * fetched values
     * @returns Post
     */
    public async getPosts (): Promise<Post[]> {
        if (!this.posts || this.posts.length === 0) {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const postData = await response.json();
            this.posts = postData;
        }

        return this.posts;
    }


    /**
     * Returns the comments given a post id. The method first fetches the posts from the api end point if it was not already
     * fetched previously.
     * @param postId 
     * @returns 
     */
    public async getComments (postId: number): Promise<Comment[]> {
        if (postId === undefined || postId === null) {
            throw new Error ("Error occured in getComments: Provide a valid postId.");
        }

        if (!this.comments || this.comments.length === 0) {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments");
            const commentsData = (await response.json()) as Comment[];
            this.comments = commentsData;
        }

        return this.comments.filter(comment => comment.postId === postId);
    }
}
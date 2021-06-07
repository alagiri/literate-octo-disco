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


    public async getPosts (): Promise<Post[]> {
        if (!this.posts || this.posts.length === 0) {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const postData = await response.json();
            this.posts = postData;
        }

        return this.posts;
    }

    public async getComments (postId: number): Promise<Comment[]> {
        if (!this.comments || this.comments.length === 0) {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments");
            const commentsData = (await response.json()) as Comment[];
            this.comments = commentsData;
        }

        return this.comments.filter(comment => comment.postId === postId);
    }
}
import React, { useState, useEffect } from "react";

import { ApiService } from "../apiService";
import Comments from "./Comment";
import "./Post.css";


interface Post {
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

const PostComp: React.FunctionComponent= () => {

    // Get api service instance
    const apiService = ApiService.getInstance();
    const [posts, setPosts]  = useState<Post[]>([])

    useEffect(() => {

        async function fetchPosts () {
            const posts = await apiService.getPosts();
            setPosts(posts);
        }

        fetchPosts();

    }, [])

    return (
        <div style={{"margin": "auto"}}>
        {
            posts.map(post => {
                return (
                    <div key={post.id} className="post">
                        <div className="section">
                            <div className="title">{post.title}</div>
                            <div className="body">{post.body}</div>
                            <Comments postId={post.id}></Comments>
                        </div>
                    </div>
                );
            }) 
        }
        </div>
    );

}

export default PostComp;
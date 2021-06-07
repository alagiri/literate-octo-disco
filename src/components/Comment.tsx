import React, { useState, useEffect } from "react";
import { ApiService } from "../apiService";
import "./Comment.css";
import { Comment } from "./Post";


interface CommentUIProps {
    name: string;
    email: string;
    body: string;
}

const CommentUI: React.FunctionComponent<CommentUIProps> = (props) => {
    return (
        <div className="comment">
            <div className="title">
                <span className="name">{props.name}</span>
                <span className="email">({props.email})</span>  
            </div>
            <div>{props.body}</div>
        </div>
    );
}


interface CommentsProps {
    postId: number
}

/**
 * A comments components that shows comments for a post
 * @param props 
 * @returns 
 */
const Comments: React.FunctionComponent<CommentsProps> = (props) => {

    // Get api service instance
    const apiService = ApiService.getInstance();

    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState<boolean>(false);

    /**
     * fetch the comments and set state
     */
    useEffect(()=> {
        async function fetchComments () {
            const comments = await apiService.getComments(props.postId);
            setComments(comments);
        }

        fetchComments();

    }, [props.postId, apiService]);

    return (
        <div className="comments">
            <div className="viewcomment"
                onClick={()=> {
                    setShowComments(!showComments);
                }}
            >
               {showComments ? "Hide comments" : "View comments"}
            </div>
            { showComments &&
                comments.map(comment => {
                    return (
                        <CommentUI key={comment.id} body={comment.body} name={comment.name} email={comment.email} />
                    );
                })
            }
        </div>
    )
}

export default Comments;
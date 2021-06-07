import React, { useState, useEffect } from "react";
import { ApiService } from "../apiService";
import "./Comment.css";
import { Comment } from "./Post";

interface CommentsProps {
    postId: number
}

const Comments: React.FunctionComponent<CommentsProps> = (props) => {

    // Get api service instance
    const apiService = ApiService.getInstance();

    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState<boolean>(false);

    useEffect(()=> {
        async function fetchComments () {
            const comments = await apiService.getComments(props.postId);
            setComments(comments);
        }

        fetchComments();

    }, []);

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
                        <div className="comment">
                            <div className="title" style={{borderBottom: "1px solid #c2c2c2"}}>
                                <span className="name">{comment.name}</span>
                                { 
                                    <span className="email">({comment.email})</span>  
                                }
                            </div>
                            <div>{comment.body}</div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Comments;
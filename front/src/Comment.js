import React, {useState} from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const boardId = props.postId;
    const [commentValue, setcommentValue] = useState('');
    const marginBottom = {
        marginBottom: 5
      };

    const handleChange = (event) => {
        setcommentValue(event.currentTarget.value);
    };

    const onsubmit = (event) => {
        event.preventDefault();
        const send_param = {
            content: commentValue,
            postId: boardId,
        };

        axios
            .post('http://localhost:8080/board/detail', send_param)
            .then((response) => {
                if(response.data.success) {
                    setcommentValue('');
                    props.refreshFunction(response.data.result);
                } else {
                    alert('댓글 저장 실패');
                }
            });
    };

    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />

            {/* Comment Lists */}
            {props.commentList &&
                 props.commentList.map(
                 (comment, index) =>
                 !comment.responseTo && ( //대댓글은 우선 숨기겠다는 의미
                  <React.Fragment>
                    <SingleComment
                     refreshFunction={props.refreshFunction}
                     comment={comment}
                     postId={props.postId}
                     key={index}
                    />
                    <ReplyComment
                      refreshFunction={props.refreshFunction}
                      commentList={props.commentList}
                     parentCommentId={comment._id}
                     postId={props.postId}
                    key={index}
                   />
                  </React.Fragment>
            )
        )}

            {/* Root Comment Form */}

            <form style={{ display: 'flex', marginBottom: '30px' }} onSubmit={onsubmit}>
                <textarea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={commentValue}
                placeholder="댓글을 작성해 주세요"
                />
                <br />
                <Button block style={{marginBottom, width: '20%'}} onClick={onsubmit}>
                    댓글 달기
                  </Button>
            </form>
        </div>
    );
}

export default Comment;
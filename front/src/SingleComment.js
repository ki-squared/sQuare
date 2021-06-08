import React, { useState } from 'react';
import { Comment } from 'antd';
import axios from 'axios';
import { Button } from "react-bootstrap";


function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onsubmit = (event) => {
    event.preventDefault();
    const send_param = {
      content: CommentValue,
      postId: props.postId,
      responseTo: props.comment._id,
    };
    axios.post('http://localhost:8080/board/detail', send_param).then((response) => {
      if (response.data.success) {
        setCommentValue('');
        props.refreshFunction(response.data.result);
        setOpenReply(false);
      } else {
        alert('댓글을 저장하지 못했습니다.');
      }
    });
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && (
          
          <form style={{ display: 'flex', marginBottom: '30px' }} onSubmit={onsubmit}>
          <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={onHandleChange}
          value={CommentValue}
          placeholder="댓글을 작성해 주세요"
          />
          <br />
          <Button block style={{ width: '20%'}} onClick={onsubmit}>
              댓글 달기
            </Button>
      </form>
      )}
    </div>
  );
}

export default SingleComment;

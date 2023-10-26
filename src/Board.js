import React, { useState } from 'react';

function Board() {
  const [posts, setPosts] = useState([]); // 게시글 목록을 저장하는 상태

  const [newPost, setNewPost] = useState(''); // 새로운 게시글 내용을 저장하는 상태

  // 게시글 추가 함수
  const addPost = () => {
    if (newPost.trim() === '') return; // 빈 내용의 게시글은 추가하지 않음
    setPosts([...posts, newPost]);
    setNewPost('');
  };

  return (
    <div>
      <h1>게시판</h1>
      <div>
        <input
          type="text"
          placeholder="게시글 작성"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={addPost}>게시</button>
      </div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
}

export default Board;

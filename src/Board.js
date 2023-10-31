import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Board() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/posts'); // 서버에서 게시글 목록을 가져오는 엔드포인트
      setPosts(response.data);
    } catch (error) {
      console.error('게시글 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (newPost.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:3002/api/posts', { content: newPost }); // 서버에 새 게시글 추가 요청
      if (response.status === 200) {
        fetchPosts(); // 게시글 추가 후 목록 다시 가져오기
        setNewPost('');
      }
    } catch (error) {
      console.error('게시글 추가 오류:', error);
    }
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
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Board;

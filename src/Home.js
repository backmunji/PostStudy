import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [id, setId] = useState('');
  const [password, setpassword] = useState('');

  // 로그인 버튼을 클릭할 때 실행되는 함수
  const handleLogin = async (event) => {
    event.preventDefault();

    // 서버로 로그인 요청을 보내는 부분
    try {
      const response = await axios.post('http://localhost:3002/api/login', { id, password });

      if (response.status === 200) {
        // 로그인 성공한 경우
        // 서버에서 성공 여부를 확인할 수도 있으므로 그에 맞게 처리
        // 로그인 성공 시 페이지 이동
        window.location.href = '/1'; // 이동할 경로
      } else {
        // 로그인 실패 처리
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
    }
  };

  return (
    <div>
      <h2>Welcome</h2>
      <form onSubmit={handleLogin}>
        <div>
          ID: <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          PW: <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div>
        {/* 회원가입 버튼을 클릭하면 페이지 이동 */}
        <button onClick={() => (window.location.href = '/2')}>회원가입</button>
      </div>
    </div>
  );
};

export default Home;

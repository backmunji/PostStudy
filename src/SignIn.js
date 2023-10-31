import React, { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('회원가입 성공');
        // 다음 동작을 추가하세요 (예: 리디렉션)
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          ID: 
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          PW: 
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          NICKNAME: 
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignIn;

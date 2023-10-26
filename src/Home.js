import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <div>
        ID: <input></input><br></br>
        PW: <input type="password"></input>
      </div>
        <button>로그인</button>
      <div>
        <Link to="/2"> 
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors'); // cors 패키지 추가
const bodyParser = require('body-parser');

app.use(cors()); // CORS 미들웨어 추가
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost', // MySQL 호스트 주소
  user: 'root', // MySQL 사용자 이름
  password: '1234', // MySQL 비밀번호
  database: 'post', // 사용할 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/api/signup', (req, res) => {
  const { id, password, nickname } = req.body;

  const query = 'INSERT INTO users (id, password, nickname) VALUES (?, ?, ?)';
  db.query(query, [id, password, nickname], (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ error: 'An error occurred while signing up' });
      return;
    }
    res.json({ message: 'Signup successful' });
  });
});

// 로그인 API 엔드포인트
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;

  // 데이터베이스에서 ID와 비밀번호 확인
  const query = 'SELECT * FROM users WHERE id = ? AND password = ?';
  db.query(query, [id, password], (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'An error occurred while logging in' });
      return;
    }

    if (results.length === 1) {
      // 로그인 성공
      res.json({ message: 'Login successful' });
    } else {
      // 로그인 실패
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});


app.post('/api/posts', (req, res) => {
  const { content } = req.body;

  const query = 'INSERT INTO posts (content) VALUES (?)';
  db.query(query, [content], (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ error: 'An error occurred while adding a post' });
      return;
    }
    res.json({ message: 'Post added successfully' });
  });
});

// 게시글 목록 조회 API 엔드포인트
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'An error occurred while fetching posts' });
      return;
    }
    res.json(results);
  });
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setError('Email และ Password ไม่สามารถเว้นว่างได้');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Login successful', response.data);
      // จัดเก็บ Token
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (name === '' || email === '' || password === '' || passwordConfirm === '') { 
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (password !== passwordConfirm) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', { name, email, password }); 
      setIsRegistered(true); // เปลี่ยนกลับไปที่หน้า Login
    } catch (err) {
      setError('การสมัครสมาชิกล้มเหลว');
    }
  };

  // กำหนดสไตล์สำหรับฟอร์ม
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    },
    form: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
    },
    toggle: {
      marginTop: '10px',
    },
    toggleLink: {
      color: '#007bff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={isRegistered ? handleLoginSubmit : handleRegisterSubmit} style={styles.form}>
        <h2>{isRegistered ? 'Login' : 'Sign Up'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        {!isRegistered && ( // แสดงฟิลด์ name เฉพาะในหน้า Sign Up
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        {!isRegistered && (
          <div>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}

        <button type="submit" style={styles.button}>
          {isRegistered ? 'Login' : 'Sign Up'}
        </button>
        
        <p style={styles.toggle}>
          {isRegistered ? 'ยังไม่มีบัญชี? ' : 'มีบัญชีอยู่แล้ว? '}
          <span onClick={() => setIsRegistered(!isRegistered)} style={styles.toggleLink}>
            {isRegistered ? 'ลงทะเบียน' : 'เข้าสู่ระบบ'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Base URL configuration
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://mern-app-zafran.azurewebsites.net' 
    : '';

  useEffect(() => {
    // Test backend connection
    fetch(`${API_BASE_URL}/api/hello`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to connect to backend');
        setLoading(false);
      });

    // Load users
    fetchUsers();
  }, [API_BASE_URL]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        setNewUser({ name: '', email: '' });
        fetchUsers(); // Refresh users list
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>MERN App on Azure</h1>
        <p>
          {loading ? 'Loading...' : message}
        </p>
        
        {/* Add User Form */}
        <div style={{ margin: '20px 0' }}>
          <h3>Add New User</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <button type="submit">Add User</button>
          </form>
        </div>

        {/* Users List */}
        <div style={{ margin: '20px 0' }}>
          <h3>Users ({users.length})</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {users.map((user) => (
              <div key={user._id} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
                <strong>{user.name}</strong> - {user.email}
                <br />
                <small>Created: {new Date(user.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

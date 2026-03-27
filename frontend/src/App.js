import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import ErrorAlert from './components/ErrorAlert';
import { useUsers } from './hooks/useUsers';

const App = () => {
  const { users, loading, error, success, createUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  const handleCreate = (userData) => createUser(userData);
  const handleUpdate = (userData) => {
    updateUser(editingUser.id, userData);
    setEditingUser(null);
  };
  const handleDelete = (id) => deleteUser(id);

  if (loading && users.length === 0) {
    return (
        <Layout>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Загрузка пользователей...</p>
          </div>
        </Layout>
    );
  }

  if (error) {
    return (
        <Layout>
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>❌</div>
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
          </div>
        </Layout>
    );
  }

  return (
      <Layout>
        {success && (
            <div style={styles.successToast}>
              {success}
            </div>
        )}
        <ErrorAlert message={error} onClose={() => {}} />
        <div style={styles.appContent}>
          <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdate : handleCreate}
              onCancel={() => setEditingUser(null)}
              loading={loading}
          />
          <UserList
              users={users}
              onEdit={setEditingUser}
              onDelete={handleDelete}
              loading={loading}
          />
        </div>
      </Layout>
  );
};

const styles = {
  appContent: {
    padding: '32px',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '60px',
    color: 'white',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 1s linear infinite',
    margin: '0 auto 20px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px',
    color: 'white',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  successToast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
  },
};

export default App;
import React, { useState } from 'react';
import Layout from './components/Layout/Layout.jsx';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';
import OrderForm from './components/OrderForm/OrderForm';
import OrderList from './components/OrderList/OrderList';
import ErrorAlert from './components/ErrorAlert';
import { useUsers } from './hooks/useUsers';
import { useProducts } from './hooks/useProducts';
import { useOrders } from './hooks/useOrders';

const App = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Пользователи
  const { users, loading: usersLoading, error: usersError, success: usersSuccess, createUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  // Товары
  const { products, loading: productsLoading, error: productsError, success: productsSuccess, createProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  // Заказы
  const { orders, loading: ordersLoading, error: ordersError, success: ordersSuccess, createOrder, updateOrderStatus, deleteOrder } = useOrders();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const loading = activeTab === 'users' ? usersLoading : activeTab === 'products' ? productsLoading : ordersLoading;
  const error = activeTab === 'users' ? usersError : activeTab === 'products' ? productsError : ordersError;
  const success = activeTab === 'users' ? usersSuccess : activeTab === 'products' ? productsSuccess : ordersSuccess;

  const handleUserCreate = (data) => createUser(data);
  const handleUserUpdate = (data) => {
    updateUser(editingUser.id, data);
    setEditingUser(null);
  };
  const handleUserDelete = (id) => deleteUser(id);

  const handleProductCreate = (data) => createProduct(data);
  const handleProductUpdate = (data) => {
    updateProduct(editingProduct.id, data);
    setEditingProduct(null);
  };
  const handleProductDelete = (id) => deleteProduct(id);

  const handleOrderCreate = (data) => {
    createOrder(data);
    setShowOrderForm(false);
  };
  const handleOrderStatusUpdate = (id, input) => updateOrderStatus(id, input);
  const handleOrderDelete = (id) => deleteOrder(id);

  // Исправленное условие загрузки
  const isLoading = (activeTab === 'users' && users.length === 0 && usersLoading) ||
      (activeTab === 'products' && products.length === 0 && productsLoading) ||
      (activeTab === 'orders' && orders.length === 0 && ordersLoading);

  if (isLoading) {
    return (
        <Layout>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Загрузка...</p>
          </div>
        </Layout>
    );
  }

  const hasError = (activeTab === 'users' && usersError) ||
      (activeTab === 'products' && productsError) ||
      (activeTab === 'orders' && ordersError);

  if (hasError) {
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

        <div style={styles.tabs}>
          <button
              onClick={() => { setActiveTab('users'); setEditingUser(null); setEditingProduct(null); setShowOrderForm(false); }}
              style={{ ...styles.tab, ...(activeTab === 'users' ? styles.activeTab : {}) }}
          >
            Пользователи
          </button>
          <button
              onClick={() => { setActiveTab('products'); setEditingUser(null); setEditingProduct(null); setShowOrderForm(false); }}
              style={{ ...styles.tab, ...(activeTab === 'products' ? styles.activeTab : {}) }}
          >
            Товары
          </button>
          <button
              onClick={() => { setActiveTab('orders'); setEditingUser(null); setEditingProduct(null); setShowOrderForm(false); }}
              style={{ ...styles.tab, ...(activeTab === 'orders' ? styles.activeTab : {}) }}
          >
            Заказы
          </button>
        </div>

        <div style={styles.appContent}>
          {activeTab === 'users' && (
              <>
                <UserForm
                    user={editingUser}
                    onSubmit={editingUser ? handleUserUpdate : handleUserCreate}
                    onCancel={() => setEditingUser(null)}
                    loading={loading}
                />
                <UserList
                    users={users}
                    onEdit={setEditingUser}
                    onDelete={handleUserDelete}
                    loading={loading}
                />
              </>
          )}

          {activeTab === 'products' && (
              <>
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleProductUpdate : handleProductCreate}
                    onCancel={() => setEditingProduct(null)}
                    loading={loading}
                />
                <ProductList
                    products={products}
                    onEdit={setEditingProduct}
                    onDelete={handleProductDelete}
                    loading={loading}
                />
              </>
          )}

          {activeTab === 'orders' && (
              <>
                <button
                    onClick={() => setShowOrderForm(!showOrderForm)}
                    style={styles.toggleFormBtn}
                >
                  {showOrderForm ? 'Скрыть форму' : 'Создать заказ'}
                </button>
                {showOrderForm && (
                    <OrderForm
                        users={users}
                        products={products}
                        onSubmit={handleOrderCreate}
                        onCancel={() => setShowOrderForm(false)}
                        loading={loading}
                    />
                )}
                <OrderList
                    orders={orders}
                    onUpdateStatus={handleOrderStatusUpdate}
                    onDelete={handleOrderDelete}
                    loading={loading}
                />
              </>
          )}
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
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'white',
    padding: '0 24px',
  },
  tab: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    color: '#667eea',
    borderBottomColor: '#667eea',
  },
  toggleFormBtn: {
    marginBottom: '24px',
    padding: '10px 20px',
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    cursor: 'pointer',
  },
};

export default App;
import client, { tokenStore } from './client'

// ---------- Products ----------
export const getProducts = (params) =>
  client.get('/products/', { params }).then((r) => r.data)

export const getProduct = (id) =>
  client.get(`/products/${id}`).then((r) => r.data)

// ---------- Auth ----------
export const register = (payload) =>
  client.post('/auth/register', payload).then((r) => r.data)

// If your backend uses OAuth2PasswordRequestForm (form-encoded "username"),
// switch to the commented block below.
export const login = async ({ email, password }) => {
  const { data } = await client.post('/auth/login', { email, password })
  /*
  const form = new URLSearchParams({ username: email, password })
  const { data } = await client.post('/auth/login', form)
  */
  const token = data.access_token || data.token
  if (token) tokenStore.set(token)
  return data
}

export const getMe = () => client.get('/auth/me').then((r) => r.data)
export const updateMe = (payload) =>
  client.put('/auth/me', payload).then((r) => r.data)
export const getUser = (userId) =>
  client.get(`/auth/users/${userId}`).then((r) => r.data)

// ---------- Cart ----------
export const getCart = () => client.get('/cart/').then((r) => r.data)
export const addCartItem = (product_id, quantity = 1) =>
  client.post('/cart/items', { product_id, quantity }).then((r) => r.data)

// ---------- Orders ----------
export const checkout = (payload = {}) =>
  client.post('/orders/checkout', payload).then((r) => r.data)
export const getOrders = () => client.get('/orders/').then((r) => r.data)
export const getOrderStatus = (orderId) =>
  client.get(`/orders/${orderId}/status`).then((r) => r.data)

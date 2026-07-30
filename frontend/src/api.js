// Central API layer for the Event Ticket Booking System backend (Flask @ :5000)
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function getToken() {
  return localStorage.getItem('token')
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function setAuth(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function isLoggedIn() {
  return !!getToken()
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const t = getToken()
    if (t) headers['Authorization'] = `Bearer ${t}`
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // no/invalid JSON body
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.join(', ') : null) ||
      `Request failed (₹{res.status})`
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  return data
}

export const api = {
  // ---- Auth ----
  register: (payload) => request('/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/login', { method: 'POST', body: payload, auth: false }),
  logout: () => request('/logout', { method: 'POST', auth: false }),

  // ---- Events (token required) ----
  getEvents: () => request('/events'),
  getEvent: (id) => request(`/events/${id}`),
  createEvent: (payload) => request('/events', { method: 'POST', body: payload }),
  updateEvent: (id, payload) => request(`/events/${id}`, { method: 'PUT', body: payload }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),

  // ---- Bookings (backend returns mock data) ----
  bookTicket: (payload) => request('/book-ticket', { method: 'POST', body: payload }),
  getMyBookings: () => request('/my-bookings'),
  cancelBooking: (id) => request(`/cancel-booking/${id}`, { method: 'DELETE' }),
}

export { BASE as API_BASE }

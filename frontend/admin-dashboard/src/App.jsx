import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  FolderOpen,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Search,
  MessageSquare,
  Moon,
  Sun,
  Plus,
  Trash2,
  Eye,
  Edit2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Activity,
  MoreVertical,
  CalendarDays,
  MapPin,
  Menu,
  X,
  Download,
  Share2,
  PlusCircle,
  Send,
  FileSpreadsheet
} from 'lucide-react'
import './App.css'

// Initial database seed for interactive mockup
const initialEvents = [
  { id: 1, name: "Neon Beats Music Festival", organizer: "Vibe Nation", date: "2026-08-15", venue: "Metropolis Arena", sold: 1840, total: 2000, status: "Live", banner: "gradient-music" },
  { id: 2, name: "Cyberpunk Comedy Night", organizer: "Laugh House", date: "2026-09-02", venue: "The Grid Theatre", sold: 450, total: 500, status: "Upcoming", banner: "gradient-comedy" },
  { id: 3, name: "Global Charity Football Match", organizer: "Unity Sports", date: "2026-07-20", venue: "Olympia Stadium", sold: 12000, total: 12000, status: "Completed", banner: "gradient-sports" },
  { id: 4, name: "Acoustic Sunset Session", organizer: "Unplugged Co.", date: "2026-08-22", venue: "Zenith Beach Club", sold: 150, total: 300, status: "Upcoming", banner: "gradient-music" },
  { id: 5, name: "Metaverse Developer Summit", organizer: "Future Tech", date: "2026-10-05", venue: "Virtual Expo Center", sold: 0, total: 1500, status: "Upcoming", banner: "gradient-tech" },
  { id: 6, name: "Quantum Physics Workshop", organizer: "Science Hub", date: "2026-07-10", venue: "Lab Hall B", sold: 40, total: 50, status: "Cancelled", banner: "gradient-science" }
];

const initialBookings = [
  { id: "BK-8492", user: "Emily Watson", email: "emily@example.com", avatar: "EW", event: "Neon Beats Music Festival", count: 2, amount: 240, status: "Paid", date: "2026-07-26 09:12" },
  { id: "BK-8491", user: "Marcus Chen", email: "marcus@example.com", avatar: "MC", event: "Cyberpunk Comedy Night", count: 1, amount: 45, status: "Paid", date: "2026-07-26 08:34" },
  { id: "BK-8490", user: "Sophia Miller", email: "sophia@example.com", avatar: "SM", event: "Acoustic Sunset Session", count: 4, amount: 200, status: "Pending", date: "2026-07-25 22:45" },
  { id: "BK-8489", user: "Liam O'Connor", email: "liam@example.com", avatar: "LO", event: "Neon Beats Music Festival", count: 3, amount: 360, status: "Paid", date: "2026-07-25 18:15" },
  { id: "BK-8488", user: "Aisha Patel", email: "aisha@example.com", avatar: "AP", event: "Global Charity Football Match", count: 2, amount: 80, status: "Paid", date: "2026-07-25 14:02" }
];

const initialNotifications = [
  { id: 1, type: "success", message: "Payout of $14,840.00 processed successfully.", time: "10 mins ago" },
  { id: 2, type: "info", message: "New event 'VR Arts Exhibition' submitted for review.", time: "1 hour ago" },
  { id: 3, type: "warning", message: "System resource usage threshold exceeded (87% CPU).", time: "3 hours ago" },
  { id: 4, type: "alert", message: "Event 'Quantum Physics Workshop' cancelled by organizer.", time: "1 day ago" }
];

const initialUsers = [
  { id: 1, name: "Alex Rivera", email: "alex.rivera@eventflow.io", role: "Super Admin", status: "Active", avatar: "AR" },
  { id: 2, name: "Sarah Connor", email: "sarah.c@skyline.com", role: "Organizer", status: "Active", avatar: "SC" },
  { id: 3, name: "Bruce Wayne", email: "bruce@wayne.corp", role: "Attendee", status: "Active", avatar: "BW" },
  { id: 4, name: "Diana Prince", email: "diana@themyscira.gov", role: "Organizer", status: "Active", avatar: "DP" },
  { id: 5, name: "Clark Kent", email: "clark.kent@dailyplanet.com", role: "Attendee", status: "Suspended", avatar: "CK" }
];

const initialCategories = [
  { id: 1, name: "Music & Concerts", slug: "music", description: "Live gigs, festivals, and orchestras", count: 25, color: "#6c3bff" },
  { id: 2, name: "Comedy & Shows", slug: "comedy", description: "Stand-up comedy, theater, and improv", count: 12, color: "#06b6d4" },
  { id: 3, name: "Sports & Fitness", slug: "sports", description: "Tournaments, matches, and running marathons", count: 8, color: "#10b981" },
  { id: 4, name: "Tech & Science", slug: "tech", description: "Hackathons, physics hubs, developer summits", count: 19, color: "#f59e0b" },
  { id: 5, name: "Arts & Culture", slug: "arts", description: "Museum tickets, gallery tours, and painting", count: 14, color: "#f43f5e" }
];

function App() {
  // Global States
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('purple') // purple / black
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Data States
  const [events, setEvents] = useState([])
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState(initialCategories)
  const [notifications, setNotifications] = useState(initialNotifications)

  const [dashboardStats, setDashboardStats] = useState({
  total_users: 0,
  total_events: 0,
  total_bookings: 0,
  revenue: 0
})
  
  // Interactive Popup / Modals
  const [modalType, setModalType] = useState(null) // 'createEvent', 'addCategory', 'sendNotification', 'generateReport', 'exportData'
  const [modalData, setModalData] = useState({})
  
  // Dropdown States
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const [msgDropdownOpen, setMsgDropdownOpen] = useState(false)

  // Chart Interactive Tooltips
  const [revenueTooltip, setRevenueTooltip] = useState(null)
  const [salesTooltip, setSalesTooltip] = useState(null)
  const [pieTooltip, setPieTooltip] = useState(null)
  const [trendsTooltip, setTrendsTooltip] = useState(null)

  // Banner color classes mapper
  const getBannerGradient = (banner) => {
    switch (banner) {
      case 'gradient-music': return 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
      case 'gradient-comedy': return 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)'
      case 'gradient-sports': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
      case 'gradient-tech': return 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
      case 'gradient-science': return 'linear-gradient(135deg, #c084fc 0%, #f43f5e 100%)'
      default: return 'linear-gradient(135deg, #6c3bff 0%, #a78bfa 100%)'
    }
  }

  // Simulate loading state on initial render
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 1500)

  return () => clearTimeout(timer)
}, [])

useEffect(() => {
  fetchDashboard()
  fetchUsers()
}, [])

const fetchDashboard = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/admin/dashboard")
    setDashboardStats(res.data.data)
  } catch (err) {
    console.error(err)
  }
}

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/admin/users")
    setUsers(res.data.data.users)
  } catch (err) {
    console.error(err)
  }
}
  // Toggle Themes
  const toggleTheme = () => {
    const nextTheme = theme === 'purple' ? 'black' : 'purple'
    setTheme(nextTheme)
    if (nextTheme === 'black') {
      document.body.classList.add('theme-black')
    } else {
      document.body.classList.remove('theme-black')
    }
  }

  // Calculations for dashboard counters
  const totalEventsCount = dashboardStats.total_events
  const totalBookingsCount = dashboardStats.total_bookings
  const totalRevenueVal = dashboardStats.revenue
  const totalUsersCount = dashboardStats.total_users
  const activeEventsCount = events.filter(e => e.status === 'Live').length
  const pendingApprovalsCount = 3 // static indicator

  // Add notification function helper
  const addNotification = (message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      type,
      message,
      time: "Just now"
    }
    setNotifications([newNotif, ...notifications])
  }

  // Quick Action Submits
  const handleCreateEvent = (e) => {
    e.preventDefault()
    const { name, organizer, date, venue, totalTickets, price, banner } = modalData
    if (!name || !organizer || !date || !venue) {
      alert("Please fill in all required fields.")
      return
    }

    const newEvent = {
      id: events.length + 1,
      name,
      organizer,
      date,
      venue,
      sold: 0,
      total: parseInt(totalTickets) || 500,
      status: "Upcoming",
      banner: banner || "gradient-music"
    }

    setEvents([newEvent, ...events])
    addNotification(`Event "₹{name}" has been created successfully.`, 'success')
    setModalType(null)
    setModalData({})
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    const { name, description, color } = modalData
    if (!name || !description) return

    const newCat = {
      id: categories.length + 1,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      count: 0,
      color: color || '#6c3bff'
    }

    setCategories([...categories, newCat])
    addNotification(`New category "₹{name}" added.`, 'success')
    setModalType(null)
    setModalData({})
  }

  const handleSendNotification = (e) => {
    e.preventDefault()
    const { message, type } = modalData
    if (!message) return

    addNotification(message, type || 'info')
    setModalType(null)
    setModalData({})
  }

  const handleGenerateReport = (e) => {
    e.preventDefault()
    const { reportType } = modalData
    addNotification(`Generating ₹{reportType || 'revenue'} report. Download starting...`, 'success')
    
    // Simulate file download
    setTimeout(() => {
      alert(`Download complete: EventFlow_₹{reportType || 'Revenue'}_Report_2026.xlsx`)
    }, 1000)
    
    setModalType(null)
    setModalData({})
  }

  const handleExportData = (e) => {
    e.preventDefault()
    const { format } = modalData
    addNotification(`Data exported successfully in ₹{format || 'CSV'} format.`, 'success')
    setModalType(null)
    setModalData({})
  }

  const handleDeleteEvent = (id, name) => {
    if (window.confirm(`Are you sure you want to delete event "${name}"?`)) {
      setEvents(events.filter(e => e.id !== id))
      addNotification(`Event "₹{name}" has been deleted.`, 'warning')
    }
  }

  // Filter events table by search
  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // SVG Chart Mock Datasets
  // 1. Monthly Revenue Chart (Bar Chart)
  const monthlyRevenueData = [
    { label: "Jan", val: 8400, color: "#6c3bff" },
    { label: "Feb", val: 12500, color: "#a78bfa" },
    { label: "Mar", val: 10200, color: "#6c3bff" },
    { label: "Apr", val: 18900, color: "#06b6d4" },
    { label: "May", val: 22400, color: "#10b981" },
    { label: "Jun", val: 19800, color: "#6c3bff" }
  ]

  // 2. Ticket Sales Graph (Area Chart - path coordinates calculations)
  const ticketSalesData = [
    { label: "Wk 1", sales: 120, x: 20, y: 160 },
    { label: "Wk 2", sales: 290, x: 100, y: 120 },
    { label: "Wk 3", sales: 180, x: 180, y: 140 },
    { label: "Wk 4", sales: 420, x: 260, y: 70 },
    { label: "Wk 5", sales: 310, x: 340, y: 100 },
    { label: "Wk 6", sales: 550, x: 420, y: 30 }
  ]
  const ticketPath = `M ${ticketSalesData.map(pt => `₹{pt.x} ₹{pt.y}`).join(' L ')}`
  const ticketAreaPath = `₹{ticketPath} L 420 180 L 20 180 Z`

  // 3. Event Categories Pie Chart
  const pieData = [
    { name: "Music", percentage: 45, color: "#6c3bff", desc: "45% - Concerts & Gigs" },
    { name: "Comedy", percentage: 25, color: "#06b6d4", desc: "25% - Standup & Improv" },
    { name: "Tech", percentage: 20, color: "#f59e0b", desc: "20% - Developer Summits" },
    { name: "Sports", percentage: 10, color: "#f43f5e", desc: "10% - Charity Football" }
  ]

  // 4. Booking Trends Line Chart
  const bookingTrendsData = [
    { day: "Mon", bookings: 45, tickets: 75, x: 20, yB: 150, yT: 120 },
    { day: "Tue", bookings: 75, tickets: 130, x: 80, yB: 120, yT: 80 },
    { day: "Wed", bookings: 55, tickets: 90, x: 140, yB: 140, yT: 105 },
    { day: "Thu", bookings: 120, tickets: 210, x: 200, yB: 80, yT: 40 },
    { day: "Fri", bookings: 90, tickets: 160, x: 260, yB: 105, yT: 65 },
    { day: "Sat", bookings: 150, tickets: 310, x: 320, yB: 50, yT: 20 },
    { day: "Sun", bookings: 110, tickets: 200, x: 380, yB: 90, yT: 50 }
  ]
  const bookingsLinePath = `M ${bookingTrendsData.map(pt => `${pt.x} ${pt.yB}`).join(' L ')}`
  const ticketsLinePath = `M ${bookingTrendsData.map(pt => `${pt.x} ${pt.yT}`).join(' L ')}`

  return (
    <div className="app-container">
      {/* Floating Background Particles */}
      <div className="bg-particles">
        <div className="particle" style={{ width: '400px', height: '400px', top: '10%', right: '5%' }}></div>
        <div className="particle" style={{ width: '300px', height: '300px', bottom: '15%', left: '10%', animationDelay: '-5s' }}></div>
        <div className="particle" style={{ width: '250px', height: '250px', top: '60%', right: '35%', animationDelay: '-12s' }}></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">E</div>
          <span className="logo-text">EventFlow</span>
        </div>
        
        <ul className="sidebar-menu">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Events', icon: Calendar },
            { name: 'Bookings', icon: Ticket },
            { name: 'Users', icon: Users },
            { name: 'Categories', icon: FolderOpen },
            { name: 'Payments', icon: CreditCard },
            { name: 'Reports & Analytics', icon: BarChart3 },
            { name: 'Notifications', icon: Bell, count: notifications.length },
            { name: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <a
                  className={`menu-item-link ${activeTab === item.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.name)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  {item.count ? <span className="badge" style={{ position: 'relative', top: '0', right: '-10px', width: '16px', height: '16px', fontSize: '9px', display: 'inline-flex' }}>{item.count}</span> : null}
                </a>
              </li>
            )
          })}
          
          <li className="logout-item">
            <a className="menu-item-link" onClick={() => {
              if (window.confirm("Are you sure you want to logout from EventFlow Admin?")) {
                alert("Logged out successfully!")
              }
            }}>
              <LogOut size={18} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Workspace Area */}
      <main className="main-content">
        
        {/* Top Navigation Bar */}
        <nav className="top-nav glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <div className="search-container">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search events, bookings, venue..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="nav-actions">
            {/* Dark Mode Toggle */}
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Sleek Theme">
              {theme === 'purple' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications Bell Dropdown */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen)
                setMsgDropdownOpen(false)
                setProfileDropdownOpen(false)
              }}>
                <Bell size={18} />
                {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
              </button>
              
              {notifDropdownOpen && (
                <div className="profile-dropdown" style={{ width: '320px', top: '55px' }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '13px' }}>Notifications</span>
                    <button style={{ background: 'transparent', border: 'none', color: '#6c3bff', fontSize: '11px', cursor: 'pointer' }} onClick={() => setNotifications([])}>Clear all</button>
                  </div>
                  <div style={{ maxHeight: '250px', overflowY: 'auto', padding: '6px' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '12px' }}>No new notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} style={{ display: 'flex', gap: '10px', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <div style={{
                            width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px',
                            backgroundColor: n.type === 'alert' ? '#f43f5e' : n.type === 'warning' ? '#f59e0b' : n.type === 'success' ? '#10b981' : '#06b6d4'
                          }}></div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '11.5px', color: '#f3f4f6', lineHeight: '1.3' }}>{n.message}</span>
                            <span style={{ fontSize: '9px', color: '#6b7280', marginTop: '2px' }}>{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Messages */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => {
                setMsgDropdownOpen(!msgDropdownOpen)
                setNotifDropdownOpen(false)
                setProfileDropdownOpen(false)
              }}>
                <MessageSquare size={18} />
                <span className="badge" style={{ backgroundColor: '#06b6d4' }}>2</span>
              </button>

              {msgDropdownOpen && (
                <div className="profile-dropdown" style={{ width: '280px', top: '55px' }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '700', fontSize: '13px' }}>
                    Direct Messages
                  </div>
                  <div style={{ padding: '6px' }}>
                    <div style={{ display: 'flex', gap: '10px', padding: '8px', cursor: 'pointer' }} className="dropdown-link">
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#6c3bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>SC</div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>Sarah Connor</span>
                        <span style={{ fontSize: '10.5px', color: '#a1a1aa' }}>Need ticket refund help...</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', padding: '8px', cursor: 'pointer' }} className="dropdown-link">
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>BW</div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>Bruce Wayne</span>
                        <span style={{ fontSize: '10.5px', color: '#a1a1aa' }}>Booking ID is BK-8488. Thanks!</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div className="admin-profile" onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen)
                setNotifDropdownOpen(false)
                setMsgDropdownOpen(false)
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c3bff 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', border: '2px solid #6c3bff', boxShadow: '0 0 10px rgba(108,59,255,0.4)' }}>
                  AR
                </div>
                <div className="profile-info">
                  <span className="profile-name">Alex Rivera</span>
                  <span className="profile-role">Super Admin</span>
                </div>
              </div>

              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <a className="dropdown-link" onClick={() => { setActiveTab('Settings'); setProfileDropdownOpen(false); }}>
                    <Settings size={14} />
                    <span>Account Settings</span>
                  </a>
                  <a className="dropdown-link" onClick={() => { alert("Help Documentation loaded."); setProfileDropdownOpen(false); }}>
                    <HelpCircle size={14} />
                    <span>Support & Docs</span>
                  </a>
                  <hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', my: '4px' }} />
                  <a className="dropdown-link" style={{ color: '#f43f5e' }} onClick={() => {
                    if (window.confirm("Confirm logout?")) {
                      alert("Logged out!")
                    }
                    setProfileDropdownOpen(false)
                  }}>
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </a>
                </div>
              )}
            </div>

          </div>
        </nav>

        {/* LOADING SKELETON STATE */}
        {loading ? (
          <div className="page-view" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="dashboard-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="glass-panel stat-card span-2">
                  <div className="loading-skeleton skeleton-text" style={{ width: '50%' }}></div>
                  <div className="loading-skeleton skeleton-text" style={{ width: '80%', height: '30px' }}></div>
                  <div className="loading-skeleton skeleton-text" style={{ width: '40%' }}></div>
                </div>
              ))}
            </div>

            <div className="dashboard-grid">
              <div className="glass-panel chart-card span-4" style={{ height: '320px' }}>
                <div className="loading-skeleton skeleton-title"></div>
                <div className="loading-skeleton skeleton-card-body" style={{ height: '220px' }}></div>
              </div>
              <div className="glass-panel chart-card span-2" style={{ height: '320px' }}>
                <div className="loading-skeleton skeleton-title"></div>
                <div className="loading-skeleton skeleton-card-body" style={{ height: '220px' }}></div>
              </div>
            </div>

            <div className="glass-panel table-card" style={{ height: '250px' }}>
              <div className="loading-skeleton skeleton-title"></div>
              <div className="loading-skeleton skeleton-text"></div>
              <div className="loading-skeleton skeleton-text"></div>
              <div className="loading-skeleton skeleton-text"></div>
            </div>
          </div>
        ) : (
          
          /* RENDER CORRESPONDING TAB VIEWS */
          <div className="page-view">
            
            {activeTab === 'Dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* 1. Dashboard Overview Stats Cards */}
                <div className="dashboard-grid">
                  {[
                    { title: "Total Events", value: totalEventsCount, growth: "+12.5%", positive: true, icon: Calendar, color: "var(--accent-purple)" },
                    { title: "Total Bookings", value: totalBookingsCount, growth: "+18.2%", positive: true, icon: Ticket, color: "var(--accent-cyan)" },
                    { title: "Total Revenue", value: `$${totalRevenueVal.toLocaleString()}`, growth: "+24.8%", positive: true, icon: DollarSign, color: "var(--accent-emerald)" },
                    { title: "Total Users", value: totalUsersCount, growth: "+4.1%", positive: true, icon: Users, color: "var(--accent-amber)" },
                    { title: "Active Events", value: activeEventsCount, growth: "+8.3%", positive: true, icon: Activity, color: "var(--accent-purple)" },
                    { title: "Pending Approvals", value: pendingApprovalsCount, growth: "-15.0%", positive: false, icon: AlertCircle, color: "var(--accent-rose)" }
                  ].map((stat, i) => {
                    const StatIcon = stat.icon
                    return (
                      <div className="glass-panel stat-card span-2" key={i}>
                        <div className="stat-card-glow"></div>
                        <div className="stat-header">
                          <span className="stat-title">{stat.title}</span>
                          <div className="stat-icon-wrapper">
                            <StatIcon size={20} style={{ color: stat.color }} />
                          </div>
                        </div>
                        <span className="stat-value">{stat.value}</span>
                        <div className="stat-footer">
                          <span className={`growth-badge ${stat.positive ? 'positive' : 'negative'}`}>
                            {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stat.growth}
                          </span>
                          <span className="text-muted" style={{ fontSize: '11px' }}>vs last month</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 2. Interactive SVG Charts Section */}
                <div className="dashboard-grid">
                  
                  {/* Monthly Revenue Bar Chart */}
                  <div className="glass-panel chart-card span-3">
                    <div className="chart-header">
                      <span className="chart-title">Monthly Revenue (USD)</span>
                      <span className="text-muted" style={{ fontSize: '12px', fontWeight: '500' }}>Jan - Jun 2026</span>
                    </div>
                    <div className="chart-container">
                      <svg className="svg-chart" viewBox="0 0 450 200">
                        {/* Horizontal Gridlines */}
                        {[0, 50, 100, 150].map((y, idx) => (
                          <line key={idx} x1="20" y1={y + 15} x2="430" y2={y + 15} className="chart-gridline" />
                        ))}
                        
                        {/* Bars rendering */}
                        {monthlyRevenueData.map((data, idx) => {
                          const maxVal = 25000
                          const barHeight = (data.val / maxVal) * 150
                          const x = 40 + idx * 65
                          const y = 165 - barHeight
                          return (
                            <g key={idx}>
                              <rect
                                x={x}
                                y={y}
                                width="32"
                                height={barHeight}
                                fill={`url(#barGrad-${idx})`}
                                className="chart-bar"
                                onMouseEnter={(e) => {
                                  setRevenueTooltip({
                                    x: x + 16,
                                    y: y - 35,
                                    label: data.label,
                                    value: `$${data.val.toLocaleString()}`
                                  })
                                }}
                                onMouseLeave={() => setRevenueTooltip(null)}
                              />
                              <text x={x + 16} y="185" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{data.label}</text>
                              
                              {/* Glowing definitions */}
                              <defs>
                                <linearGradient id={`barGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={data.color} stopOpacity="1" />
                                  <stop offset="100%" stopColor="#090514" stopOpacity="0.4" />
                                </linearGradient>
                              </defs>
                            </g>
                          )
                        })}
                      </svg>
                      {revenueTooltip && (
                        <div className="chart-tooltip" style={{ left: `${revenueTooltip.x}px`, top: `${revenueTooltip.y}px` }}>
                          <span className="tooltip-title">{revenueTooltip.label}</span>
                          <span className="tooltip-val">{revenueTooltip.value}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ticket Sales Area Graph */}
                  <div className="glass-panel chart-card span-3">
                    <div className="chart-header">
                      <span className="chart-title">Ticket Sales Volume</span>
                      <span className="text-muted" style={{ fontSize: '12px', fontWeight: '500' }}>Bi-weekly Logs</span>
                    </div>
                    <div className="chart-container">
                      <svg className="svg-chart" viewBox="0 0 440 200">
                        {/* Grid lines */}
                        {[0, 50, 100, 150].map((y, idx) => (
                          <line key={idx} x1="20" y1={y + 30} x2="420" y2={y + 30} className="chart-gridline" />
                        ))}

                        {/* Defs for glow area */}
                        <defs>
                          <linearGradient id="salesAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path d={ticketAreaPath} fill="url(#salesAreaGrad)" className="chart-area" />

                        {/* Line Path */}
                        <path d={ticketPath} stroke="var(--accent-purple)" className="chart-line" />

                        {/* Points */}
                        {ticketSalesData.map((pt, idx) => (
                          <circle
                            key={idx}
                            cx={pt.x}
                            cy={pt.y}
                            r="5"
                            fill="#fff"
                            stroke="var(--accent-purple)"
                            strokeWidth="2.5"
                            className="chart-point"
                            onMouseEnter={() => {
                              setSalesTooltip({
                                x: pt.x,
                                y: pt.y - 45,
                                label: pt.label,
                                value: `${pt.sales} Tickets`
                              })
                            }}
                            onMouseLeave={() => setSalesTooltip(null)}
                          />
                        ))}
                      </svg>
                      {salesTooltip && (
                        <div className="chart-tooltip" style={{ left: `${salesTooltip.x}px`, top: `${salesTooltip.y}px` }}>
                          <span className="tooltip-title">{salesTooltip.label}</span>
                          <span className="tooltip-val">{salesTooltip.value}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Categories Pie Chart */}
                  <div className="glass-panel chart-card span-2">
                    <span className="chart-title">Event Categories</span>
                    <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      
                      {/* Responsive interactive donut pie */}
                      <svg viewBox="0 0 100 100" width="120" height="120">
                        {/* Donut sectors */}
                        {/* Music (45%): dasharray="45 55" dashoffset="25" */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6c3bff" strokeWidth="12" strokeDasharray="45 55" strokeDashoffset="25" className="pie-slice"
                          onMouseEnter={() => setPieTooltip("Music: 45% of Bookings")} onMouseLeave={() => setPieTooltip(null)} />
                        
                        {/* Comedy (25%): dasharray="25 75" dashoffset="80" */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#06b6d4" strokeWidth="12" strokeDasharray="25 75" strokeDashoffset="80" className="pie-slice"
                          onMouseEnter={() => setPieTooltip("Comedy: 25% of Bookings")} onMouseLeave={() => setPieTooltip(null)} />
                        
                        {/* Tech (20%): dasharray="20 80" dashoffset="105" */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="20 80" strokeDashoffset="105" className="pie-slice"
                          onMouseEnter={() => setPieTooltip("Tech: 20% of Bookings")} onMouseLeave={() => setPieTooltip(null)} />

                        {/* Sports (10%): dasharray="10 90" dashoffset="125" */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f43f5e" strokeWidth="12" strokeDasharray="10 90" strokeDashoffset="125" className="pie-slice"
                          onMouseEnter={() => setPieTooltip("Sports: 10% of Bookings")} onMouseLeave={() => setPieTooltip(null)} />
                          
                        <circle cx="50" cy="50" r="28" fill="#0c071d" />
                      </svg>
                      
                      <div className="legend-container">
                        {pieData.map((item, idx) => (
                          <div className="legend-item" key={idx}>
                            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name} ({item.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                      
                      {pieTooltip && (
                        <div className="chart-tooltip" style={{ bottom: '10px', transform: 'none', position: 'absolute' }}>
                          <span style={{ fontWeight: '600' }}>{pieTooltip}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Booking Trends Line Chart */}
                  <div className="glass-panel chart-card span-4">
                    <div className="chart-header">
                      <span className="chart-title">Booking Trends VS Ticket Vol</span>
                      <div style={{ display: 'flex', gap: '15px', fontSize: '11px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></div> Bookings
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6c3bff' }}></div> Tickets
                        </span>
                      </div>
                    </div>
                    
                    <div className="chart-container">
                      <svg className="svg-chart" viewBox="0 0 400 180">
                        {/* Grid lines */}
                        {[0, 45, 90, 135].map((y, idx) => (
                          <line key={idx} x1="20" y1={y + 15} x2="380" y2={y + 15} className="chart-gridline" />
                        ))}

                        {/* Blue Booking Line */}
                        <path d={bookingsLinePath} stroke="#06b6d4" className="chart-line" />
                        {/* Purple Ticket Line */}
                        <path d={ticketsLinePath} stroke="#6c3bff" className="chart-line" />

                        {/* Dots */}
                        {bookingTrendsData.map((pt, idx) => (
                          <g key={idx}>
                            {/* Booking dot */}
                            <circle cx={pt.x} cy={pt.yB} r="4" fill="#000" stroke="#06b6d4" strokeWidth="2.5" className="chart-point"
                              onMouseEnter={() => setTrendsTooltip({ x: pt.x, y: pt.yB - 45, text: `Bookings: ${pt.bookings}` })}
                              onMouseLeave={() => setTrendsTooltip(null)} />
                            
                            {/* Tickets dot */}
                            <circle cx={pt.x} cy={pt.yT} r="4" fill="#000" stroke="#6c3bff" strokeWidth="2.5" className="chart-point"
                              onMouseEnter={() => setTrendsTooltip({ x: pt.x, y: pt.yT - 45, text: `Tickets: ${pt.tickets}` })}
                              onMouseLeave={() => setTrendsTooltip(null)} />
                              
                            <text x={pt.x} y="170" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">{pt.day}</text>
                          </g>
                        ))}
                      </svg>
                      {trendsTooltip && (
                        <div className="chart-tooltip" style={{ left: `${trendsTooltip.x}px`, top: `${trendsTooltip.y}px` }}>
                          <span style={{ fontWeight: '700', fontSize: '11px' }}>{trendsTooltip.text}</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* 3. Recent Events & Recent Bookings Split Grid */}
                <div className="dashboard-grid">
                  
                  {/* Recent Events Table */}
                  <div className="glass-panel table-card span-4">
                    <div className="table-header-row">
                      <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Recent Events</h3>
                      <button className="pill-filter" onClick={() => { setActiveTab('Events') }}>View All Events <ChevronRight size={14} style={{ display: 'inline', marginLeft: '5px' }} /></button>
                    </div>
                    <div className="table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Event Details</th>
                            <th>Organizer</th>
                            <th>Venue</th>
                            <th>Tickets Sold</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEvents.slice(0, 4).map((evt) => (
                            <tr key={evt.id}>
                              <td>
                                <div className="event-banner-cell">
                                  <div style={{
                                    width: '40px', height: '40px', borderRadius: '8px', 
                                    background: getBannerGradient(evt.banner),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '700', fontSize: '12px', color: '#fff', textTransform: 'uppercase'
                                  }}>
                                    {evt.name.substring(0,2)}
                                  </div>
                                  <div>
                                    <div className="event-name-txt">{evt.name}</div>
                                    <div className="event-sub-txt">{evt.date}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{evt.organizer}</td>
                              <td>{evt.venue}</td>
                              <td>
                                <div style={{ fontSize: '13px', fontWeight: '600' }}>
                                  {evt.sold.toLocaleString()} / {evt.total.toLocaleString()}
                                </div>
                                <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${Math.min(100, (evt.sold / evt.total) * 100)}%`, backgroundColor: 'var(--accent-purple)' }}></div>
                                </div>
                              </td>
                              <td>
                                <span className={`status-badge ${evt.status.toLowerCase()}`}>
                                  {evt.status}
                                </span>
                              </td>
                              <td className="actions-cell">
                                <button className="action-btn" title="View details" onClick={() => {
                                  alert(`Event Details:\nName: ${evt.name}\nOrganizer: ${evt.organizer}\nDate: ${evt.date}\nVenue: ${evt.venue}\nTickets Sold: ${evt.sold}/${evt.total}`);
                                }}>
                                  <Eye size={14} />
                                </button>
                                <button className="action-btn delete-btn" title="Delete event" onClick={() => handleDeleteEvent(evt.id, evt.name)}>
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Bookings Feed & Quick Actions */}
                  <div className="span-2" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Recent Bookings */}
                    <div className="glass-panel stat-card" style={{ flexGrow: '1' }}>
                      <span className="stat-title" style={{ marginBottom: '15px', display: 'block' }}>Recent Bookings</span>
                      <div className="bookings-list">
                        {bookings.slice(0, 3).map((b) => (
                          <div className="booking-item" key={b.id}>
                            <div className="booking-user">
                              <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #a78bfa 0%, #6c3bff 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: '700', fontSize: '11px'
                              }}>
                                {b.avatar}
                              </div>
                              <div className="booking-info">
                                <span className="booking-name">{b.user}</span>
                                <span className="booking-event">{b.event}</span>
                              </div>
                            </div>
                            <div className="booking-details">
                              <span className="booking-tickets">{b.count} Tickets</span>
                              <span className={`pay-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="glass-panel quick-actions-panel">
                      <h3 className="quick-actions-title">Quick Actions</h3>
                      <div className="quick-btn-grid">
                        <button className="quick-action-btn" onClick={() => setModalType('createEvent')}>
                          <PlusCircle size={16} />
                          <span>Create New Event</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => setModalType('addCategory')}>
                          <FolderOpen size={16} />
                          <span>Add Event Category</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => setModalType('sendNotification')}>
                          <Send size={16} />
                          <span>Send Broadcast Notif</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => setModalType('generateReport')}>
                          <BarChart3 size={16} />
                          <span>Generate Excel Report</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* TAB: EVENTS VIEW */}
            {activeTab === 'Events' && (
              <div className="glass-panel table-card">
                <div className="table-header-row">
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Manage Booking Events</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Configure schedule, dates, venues, capacity, and monitoring metrics.</p>
                  </div>
                  <button className="submit-btn" style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0' }} onClick={() => setModalType('createEvent')}>
                    <Plus size={16} />
                    <span>Create Event</span>
                  </button>
                </div>

                <div className="pill-filter-bar" style={{ marginBottom: '20px' }}>
                  <button className="pill-filter active">All ({events.length})</button>
                  <button className="pill-filter">Live ({events.filter(e => e.status === 'Live').length})</button>
                  <button className="pill-filter">Upcoming ({events.filter(e => e.status === 'Upcoming').length})</button>
                  <button className="pill-filter">Completed ({events.filter(e => e.status === 'Completed').length})</button>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Event Detail</th>
                        <th>Organizer</th>
                        <th>Venue</th>
                        <th>Capacity sold</th>
                        <th>Date Scheduled</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((evt) => (
                        <tr key={evt.id}>
                          <td>
                            <div className="event-banner-cell">
                              <div style={{
                                width: '40px', height: '40px', borderRadius: '8px', 
                                background: getBannerGradient(evt.banner),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: '700', fontSize: '12px', color: '#fff', textTransform: 'uppercase'
                              }}>
                                {evt.name.substring(0,2)}
                              </div>
                              <div>
                                <span className="event-name-txt">{evt.name}</span>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                                  <MapPin size={10} /> {evt.venue}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{evt.organizer}</td>
                          <td>{evt.venue}</td>
                          <td>
                            <div style={{ fontWeight: '600' }}>{evt.sold} / {evt.total}</div>
                            <div style={{ width: '120px', height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${Math.min(100, (evt.sold / evt.total) * 100)}%`, backgroundColor: 'var(--accent-purple)' }}></div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                              <CalendarDays size={12} style={{ color: 'var(--accent-purple)' }} />
                              {evt.date}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${evt.status.toLowerCase()}`}>
                              {evt.status}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button className="action-btn" title="View details" onClick={() => {
                              alert(`Event Summary details:\nTitle: ${evt.name}\nOrganizer: ${evt.organizer}\nCapacity: ${evt.sold}/${evt.total}\nDate: ${evt.date}\nStatus: ${evt.status}`);
                            }}>
                              <Eye size={14} />
                            </button>
                            <button className="action-btn" title="Edit schedule" onClick={() => {
                              setModalData({ ...evt, totalTickets: evt.total })
                              setModalType('createEvent')
                            }}>
                              <Edit2 size={14} />
                            </button>
                            <button className="action-btn delete-btn" title="Delete event" onClick={() => handleDeleteEvent(evt.id, evt.name)}>
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: BOOKINGS VIEW */}
            {activeTab === 'Bookings' && (
              <div className="glass-panel table-card">
                <div className="table-header-row">
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Recent Ticket Bookings</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Financial audit logs of tickets purchased, amounts and status.</p>
                  </div>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Event Booked</th>
                        <th>Ticket Count</th>
                        <th>Price Amount</th>
                        <th>Purchase Date</th>
                        <th>Payment status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--accent-cyan)' }}>{b.id}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#6c3bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{b.avatar}</div>
                              <div>
                                <div style={{ fontWeight: '600' }}>{b.user}</div>
                                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{b.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{b.event}</td>
                          <td>{b.count} tickets</td>
                          <td style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>${b.amount}</td>
                          <td>{b.date}</td>
                          <td>
                            <span className={`pay-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            <button className="action-btn" onClick={() => alert(`Receipt detail for ${b.id}\nBuyer: ${b.user}\nAmount Paid: $${b.amount}\nGate access code: GA-${b.id.substring(3)}`)}>
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: USERS VIEW */}
            {activeTab === 'Users' && (
              <div className="glass-panel table-card">
                <div className="table-header-row">
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Registered Users</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Configure system privileges, roles, active users, and moderators.</p>
                  </div>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Email Account</th>
                        <th>User Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.user_id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '32px', height: '32px', borderRadius: '50%', 
                                background: 'linear-gradient(135deg, #a78bfa 0%, #6c3bff 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                              }}>{u.username.charAt(0).toUpperCase()}</div>
                              <span style={{ fontWeight: '600' }}>{u.username}</span>
                            </div>
                          </td>
                          <td>{u.email}</td>
                          <td>
                            <span style={{
                              padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '600',
                              backgroundColor: u.role === 'Super Admin' ? 'rgba(108,59,255,0.2)' : u.role === 'Organizer' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)'
                            }}>{u.role}</span>
                          </td>
                          <td>
                            <span className="status-badge live">Active</span>
                          </td>
                          <td>
                            <button className="action-btn" onClick={() => alert(`Modify profile config for ${u.name}`)}>Edit Role</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: CATEGORIES VIEW */}
            {activeTab === 'Categories' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="table-header-row">
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Event Categories</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Configure booking taxonomy categories, tag structures, and pricing caps.</p>
                  </div>
                  <button className="submit-btn" style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0' }} onClick={() => setModalType('addCategory')}>
                    <Plus size={16} />
                    <span>Create Category</span>
                  </button>
                </div>
                <div className="dashboard-grid">
                  {categories.map((c) => (
                    <div className="glass-panel stat-card span-2" key={c.id} style={{ borderLeft: `4px solid ${c.color}` }}>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff', display: 'block', marginBottom: '8px' }}>{c.name}</span>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '15px' }}>{c.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                        <span className="text-muted">Dynamic Tag: #{c.slug}</span>
                        <span style={{ fontWeight: '600', color: c.color }}>{c.count} Active listings</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS VIEW */}
            {activeTab === 'Payments' && (
              <div className="glass-panel table-card">
                <div className="table-header-row">
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Payment Operations & Gateway Ledger</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Financial statement details, processing payouts and refunds audits.</p>
                  </div>
                </div>

                <div className="stats-grid-small">
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title" style={{ fontSize: '11px' }}>Volume processed</span>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>$342,910.00</span>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title" style={{ fontSize: '11px' }}>Pending payouts</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-amber)' }}>$8,490.00</span>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title" style={{ fontSize: '11px' }}>Refund claims rate</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-rose)' }}>0.4%</span>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title" style={{ fontSize: '11px' }}>Active gateway channel</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-emerald)' }}>Stripe Connect</span>
                  </div>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Transaction Code</th>
                        <th>User Account</th>
                        <th>Payment Method</th>
                        <th>Billing Amount</th>
                        <th>Fee cut</th>
                        <th>Payout Processing</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontFamily: 'monospace' }}>TXN-902910</td>
                        <td>Emily Watson</td>
                        <td>Visa **** 8940</td>
                        <td style={{ fontWeight: '700' }}>$240.00</td>
                        <td>$7.20 (3%)</td>
                        <td style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>Settled</td>
                      </tr>
                      <tr>
                        <td style={{ fontFamily: 'monospace' }}>TXN-902909</td>
                        <td>Marcus Chen</td>
                        <td>Apple Pay</td>
                        <td style={{ fontWeight: '700' }}>$45.00</td>
                        <td>$1.35 (3%)</td>
                        <td style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>Settled</td>
                      </tr>
                      <tr>
                        <td style={{ fontFamily: 'monospace' }}>TXN-902908</td>
                        <td>Sophia Miller</td>
                        <td>Mastercard **** 1120</td>
                        <td style={{ fontWeight: '700' }}>$200.00</td>
                        <td>$6.00 (3%)</td>
                        <td style={{ color: 'var(--accent-amber)', fontWeight: '600' }}>Escrow Pending</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: REPORTS & ANALYTICS */}
            {activeTab === 'Reports & Analytics' && (
              <div className="glass-panel chart-card" style={{ gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Analytics Dashboard Center</h2>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Realtime metrics audit logs, database logs, and telemetry data.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button className="submit-btn" style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setModalType('generateReport')}>
                    <Download size={16} />
                    <span>Download PDF Overview</span>
                  </button>
                  <button className="submit-btn" style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setModalType('exportData')}>
                    <Share2 size={16} />
                    <span>Export JSON Log Dump</span>
                  </button>
                </div>
                <div className="stats-grid-small" style={{ marginTop: '10px' }}>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title">Database Latency</span>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>14ms</span>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title">Avg Booking Time</span>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>42 seconds</span>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '15px' }}>
                    <span className="stat-title">Stripe Webhook Health</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-emerald)' }}>100% OK</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS VIEW */}
            {activeTab === 'Notifications' && (
              <div className="glass-panel notifications-panel">
                <div className="table-header-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Broadcast Notification Center</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Latest active events, exceptions, security notices, and system alerts.</p>
                  </div>
                  <button className="pill-filter" onClick={() => setNotifications([])}>Clear All Broadcasts</button>
                </div>
                <div className="notif-list">
                  {notifications.map((n) => (
                    <div className="notif-item" key={n.id}>
                      <div className={`notif-icon-box ${n.type}`}>
                        {n.type === 'success' && <CheckCircle size={16} />}
                        {n.type === 'info' && <Activity size={16} />}
                        {n.type === 'warning' && <AlertCircle size={16} />}
                        {n.type === 'alert' && <X size={16} />}
                      </div>
                      <div className="notif-content">
                        <span className="notif-message" style={{ fontSize: '14px' }}>{n.message}</span>
                        <span className="notif-time">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SETTINGS VIEW */}
            {activeTab === 'Settings' && (
              <div className="glass-panel chart-card" style={{ gap: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700' }}>System Parameters Configuration</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
                  <div className="form-group">
                    <label>Dashboard Admin Title</label>
                    <input type="text" className="form-input" defaultValue="EventFlow Super Administrator Dashboard" />
                  </div>
                  <div className="form-group">
                    <label>Webhook URL endpoint</label>
                    <input type="text" className="form-input" defaultValue="https://api.eventflow.io/v1/webhook" />
                  </div>
                  <div className="form-group">
                    <label>Platform Currency Settings</label>
                    <select className="form-select">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div>
                      <span style={{ fontSize: '13.5px', fontWeight: '600', display: 'block' }}>Email Alerts Dispatch</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Send email warnings on suspicious login attempts</span>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-purple)' }} />
                  </div>
                  <button className="submit-btn" onClick={() => addNotification("System configuration updated.", "success")}>Save System Configuration</button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Footer Copyright */}
        <footer className="footer">
          Copyright © 2026 EventFlow Admin Dashboard. All rights reserved.
        </footer>
      </main>

      {/* QUICK ACTIONS DYNAMIC MODALS OVERLAY */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalType(null)}>
              <X size={16} />
            </button>

            {/* Modal variations */}
            {modalType === 'createEvent' && (
              <form onSubmit={handleCreateEvent}>
                <h3 className="modal-title">Create Booking Event</h3>
                
                <div className="form-group">
                  <label>Event Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electric Dreams Arena Show"
                    className="form-input"
                    value={modalData.name || ''}
                    onChange={(e) => setModalData({...modalData, name: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Organizer *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Music"
                      className="form-input"
                      value={modalData.organizer || ''}
                      onChange={(e) => setModalData({...modalData, organizer: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Banner Theme</label>
                    <select
                      className="form-select"
                      value={modalData.banner || 'gradient-music'}
                      onChange={(e) => setModalData({...modalData, banner: e.target.value})}
                    >
                      <option value="gradient-music">Indigo Purple (Music)</option>
                      <option value="gradient-comedy">Cyan Blue (Comedy)</option>
                      <option value="gradient-sports">Emerald Green (Sports)</option>
                      <option value="gradient-tech">Amber Gold (Tech)</option>
                      <option value="gradient-science">Rose Red (Science)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Scheduled Date *</label>
                    <input
                      type="date"
                      required
                      className="form-input"
                      value={modalData.date || ''}
                      onChange={(e) => setModalData({...modalData, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Capacity *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1000"
                      className="form-input"
                      value={modalData.totalTickets || ''}
                      onChange={(e) => setModalData({...modalData, totalTickets: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Venue Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Madison Square Garden"
                    className="form-input"
                    value={modalData.venue || ''}
                    onChange={(e) => setModalData({...modalData, venue: e.target.value})}
                  />
                </div>

                <button type="submit" className="submit-btn">Publish Booking Event</button>
              </form>
            )}

            {modalType === 'addCategory' && (
              <form onSubmit={handleAddCategory}>
                <h3 className="modal-title">Create Taxon Category</h3>
                
                <div className="form-group">
                  <label>Category Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Art & Exhibitions"
                    className="form-input"
                    value={modalData.name || ''}
                    onChange={(e) => setModalData({...modalData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Category Description *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Details about events in this category..."
                    className="form-textarea"
                    value={modalData.description || ''}
                    onChange={(e) => setModalData({...modalData, description: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Theme color identifier</label>
                  <select
                    className="form-select"
                    value={modalData.color || '#6c3bff'}
                    onChange={(e) => setModalData({...modalData, color: e.target.value})}
                  >
                    <option value="#6c3bff">Purple (#6C3BFF)</option>
                    <option value="#06b6d4">Cyan (#06B6D4)</option>
                    <option value="#10b981">Green (#10B981)</option>
                    <option value="#f59e0b">Amber (#F59E0B)</option>
                    <option value="#f43f5e">Rose (#F43F5E)</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">Save taxonomy category</button>
              </form>
            )}

            {modalType === 'sendNotification' && (
              <form onSubmit={handleSendNotification}>
                <h3 className="modal-title">Broadcast Alert Dispatch</h3>
                
                <div className="form-group">
                  <label>Broadcast Message text *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Enter broadcast message details..."
                    className="form-textarea"
                    value={modalData.message || ''}
                    onChange={(e) => setModalData({...modalData, message: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Alert Importance Level</label>
                  <select
                    className="form-select"
                    value={modalData.type || 'info'}
                    onChange={(e) => setModalData({...modalData, type: e.target.value})}
                  >
                    <option value="info">Info / Secondary (Cyan)</option>
                    <option value="success">Success / Resolved (Green)</option>
                    <option value="warning">System Warning (Amber)</option>
                    <option value="alert">Critical Exception (Rose)</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">Dispatch Broadcast Notif</button>
              </form>
            )}

            {modalType === 'generateReport' && (
              <form onSubmit={handleGenerateReport}>
                <h3 className="modal-title">Generate Excel Report</h3>
                
                <div className="form-group">
                  <label>Accounting metrics focus</label>
                  <select
                    className="form-select"
                    value={modalData.reportType || 'Revenue'}
                    onChange={(e) => setModalData({...modalData, reportType: e.target.value})}
                  >
                    <option value="Revenue">Financial Statements & Revenues</option>
                    <option value="Bookings">Ticket Bookings Volume</option>
                    <option value="Users">User registrations telemetry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Metrics date range scope</label>
                  <select className="form-select">
                    <option>Last 30 Days logs</option>
                    <option>Year to Date statements</option>
                    <option>All-time logs</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <FileSpreadsheet size={16} />
                  <span>Start Excel Generation</span>
                </button>
              </form>
            )}

            {modalType === 'exportData' && (
              <form onSubmit={handleExportData}>
                <h3 className="modal-title">Export Database Dump</h3>
                
                <div className="form-group">
                  <label>Export File Format</label>
                  <select
                    className="form-select"
                    value={modalData.format || 'CSV'}
                    onChange={(e) => setModalData({...modalData, format: e.target.value})}
                  >
                    <option value="CSV">CSV Spreadsheet Table</option>
                    <option value="JSON">Raw JSON Database schema</option>
                    <option value="PDF">Formatted Document PDF</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">Start backup download</button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default App;

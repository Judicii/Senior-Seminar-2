import React from 'react';

function App() {
  const [page, setPage] = React.useState('login');
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [role, setRole] = React.useState('admin');
  const [error, setError] = React.useState('');
  const [sidebar, setSidebar] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [day, setDay] = React.useState(0);

  const blue = '#1e3a5f';
  const burgundy = '#722f37';
  const darkBlue = '#0d2137';

  const clients = [
    { id: 'C001', name: 'John Smith', org: 'TechCorp Ltd', ref: 'EAP', status: 'Active' },
    { id: 'C002', name: 'Sarah Williams', org: 'Finance Plus', ref: 'EAP', status: 'Active' },
    { id: 'C003', name: 'Michael Chen', org: 'TechCorp Ltd', ref: 'Private', status: 'Pending' },
    { id: 'C004', name: 'Emily Davis', org: 'Self-Referred', ref: 'Self', status: 'Active' },
  ];

  function login() {
    if (user === '' || pass === '') {
      setError('Username and Password required');
    } else {
      setError('');
      setPage('dashboard');
    }
  }

  function logout() {
    setPage('login');
    setUser('');
    setPass('');
  }

  // LOGIN
  if (page === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${blue}, ${darkBlue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 16, width: 360, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ width: 70, height: 70, background: blue, borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${burgundy}` }}>
              <span style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>JC</span>
            </div>
            <h2 style={{ margin: 0, color: blue }}>Josal Consulting</h2>
            <p style={{ color: '#888', margin: '5px 0 0' }}>Database Management System</p>
          </div>

          {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: 10, borderRadius: 6, marginBottom: 15, color: '#c00', fontSize: 14 }}>{error}</div>}

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Username</label>
            <input
              type="text"
              value={user}
              onChange={function(e) { setUser(e.target.value); }}
              style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
              placeholder="Enter username"
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Password</label>
            <input
              type="password"
              value={pass}
              onChange={function(e) { setPass(e.target.value); }}
              style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
              placeholder="Enter password"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Role</label>
            <select
              value={role}
              onChange={function(e) { setRole(e.target.value); }}
              style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
            >
              <option value="admin">Administrator</option>
              <option value="counsellor">Counsellor</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button
            onClick={login}
            style={{ width: '100%', padding: 14, background: blue, color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // SIDEBAR
  function Sidebar() {
    const items = [
      { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
      { id: 'clients', icon: '👥', label: 'Clients' },
      { id: 'calendar', icon: '📅', label: 'Scheduling' },
      { id: 'conflicts', icon: '⚠️', label: 'Conflicts' },
      { id: 'reports', icon: '📊', label: 'Reports' },
    ];

    const filtered = items.filter(function(item) {
      if (role === 'staff' && item.id === 'reports') return false;
      if (role === 'counsellor' && (item.id === 'reports' || item.id === 'conflicts')) return false;
      return true;
    });

    return (
      <div style={{ width: sidebar ? 220 : 60, background: darkBlue, color: '#fff', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 15, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebar && <span style={{ fontWeight: 'bold', fontSize: 18 }}>JCDMS</span>}
          <button onClick={function() { setSidebar(!sidebar); }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>
            {sidebar ? '✕' : '☰'}
          </button>
        </div>
        <nav style={{ flex: 1, padding: 10 }}>
          {filtered.map(function(item) {
            return (
              <button
                key={item.id}
                onClick={function() { setPage(item.id); setSelected(null); setDay(0); }}
                style={{
                  width: '100%',
                  padding: 12,
                  marginBottom: 5,
                  background: page === item.id ? blue : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {sidebar && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 10, borderTop: '1px solid #1e3a5f' }}>
          <button onClick={logout} style={{ width: '100%', padding: 12, background: 'transparent', border: 'none', borderRadius: 6, color: '#f88', cursor: 'pointer', textAlign: 'left' }}>
            {sidebar ? '🚪 Logout' : '🚪'}
          </button>
        </div>
      </div>
    );
  }

  // HEADER
  function Header() {
    return (
      <header style={{ background: '#fff', padding: 15, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, textTransform: 'capitalize' }}>{page}</h1>
          <small style={{ color: '#888' }}>{role === 'admin' ? 'Strategic View' : role === 'counsellor' ? 'Clinical View' : 'Operational View'}</small>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <div style={{ width: 35, height: 35, background: blue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            {role.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>
    );
  }

  // DASHBOARD
  function Dashboard() {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 15, marginBottom: 20 }}>
          <div onClick={function() { setPage('clients'); }} style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid ' + blue, cursor: 'pointer' }}>
            <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Total Clients</p>
            <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 'bold' }}>247</p>
          </div>
          <div onClick={function() { setPage('calendar'); }} style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #22c55e', cursor: 'pointer' }}>
            <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Today's Appointments</p>
            <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 'bold' }}>12</p>
          </div>
          <div onClick={function() { setPage('conflicts'); }} style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #eab308', cursor: 'pointer' }}>
            <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Pending Conflicts</p>
            <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 'bold' }}>1</p>
          </div>
          <div style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #22c55e' }}>
            <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Conflict Rate</p>
            <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 'bold', color: '#22c55e' }}>0%</p>
            <small style={{ color: '#888' }}>Down from 72%</small>
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 15px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={function() { setPage('clients'); }} style={{ padding: '12px 20px', background: '#e0f2fe', color: blue, border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>➕ Add Client</button>
            <button onClick={function() { setPage('calendar'); }} style={{ padding: '12px 20px', background: '#dcfce7', color: '#166534', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>📅 New Appointment</button>
            {role === 'admin' && <button onClick={function() { setPage('reports'); }} style={{ padding: '12px 20px', background: '#f3e8ff', color: '#7c3aed', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>📊 Reports</button>}
          </div>
        </div>
      </div>
    );
  }

  // CLIENTS
  function Clients() {
    if (selected) {
      return (
        <div>
          <button onClick={function() { setSelected(null); }} style={{ background: 'none', border: 'none', color: blue, cursor: 'pointer', marginBottom: 15, fontSize: 14 }}>← Back to Clients</button>
          <div style={{ background: '#fff', padding: 25, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
              <div style={{ width: 60, height: 60, background: blue, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{selected.name.charAt(0)}</div>
              <div>
                <h2 style={{ margin: 0 }}>{selected.name}</h2>
                <p style={{ margin: '5px 0 0', color: '#888' }}>{selected.id}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div><small style={{ color: '#888' }}>Organization</small><p style={{ margin: '5px 0 0', fontWeight: 500 }}>{selected.org}</p></div>
              <div><small style={{ color: '#888' }}>Referral</small><p style={{ margin: '5px 0 0', fontWeight: 500 }}>{selected.ref}</p></div>
              <div><small style={{ color: '#888' }}>Status</small><p style={{ margin: '5px 0 0', fontWeight: 500 }}>{selected.status}</p></div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }}>
              <button style={{ padding: '10px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginRight: 10 }}>Schedule Appointment</button>
              <button style={{ padding: '10px 20px', background: burgundy, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Session History</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h2 style={{ margin: 0 }}>Clients</h2>
          <button style={{ padding: '10px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>➕ Add Client</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>Name</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>Organization</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>Referral</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(function(c) {
                return (
                  <tr key={c.id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: 12, fontFamily: 'monospace' }}>{c.id}</td>
                    <td style={{ padding: 12, fontWeight: 500 }}>{c.name}</td>
                    <td style={{ padding: 12 }}>{c.org}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 12, background: c.ref === 'EAP' ? '#dbeafe' : c.ref === 'Private' ? '#f3e8ff' : '#f3f4f6', color: c.ref === 'EAP' ? '#1e40af' : c.ref === 'Private' ? '#7c3aed' : '#374151' }}>{c.ref}</span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 12, background: c.status === 'Active' ? '#dcfce7' : '#fef3c7', color: c.status === 'Active' ? '#166534' : '#92400e' }}>{c.status}</span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <button onClick={function() { setSelected(c); }} style={{ padding: '5px 12px', background: '#e0f2fe', color: blue, border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: 5 }}>View</button>
                      <button onClick={function() { setModal(c); }} style={{ padding: '5px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // CALENDAR
  function Calendar() {
    var days = [];
    for (var i = 1; i <= 31; i++) { days.push(i); }
    var appts = { 5: 3, 6: 'conflict', 12: 2, 15: 1, 20: 2 };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h2 style={{ margin: 0 }}>December 2025</h2>
          <button style={{ padding: '10px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>➕ New Appointment</button>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5, marginBottom: 10 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function(d) { return <div key={d} style={{ padding: 10, textAlign: 'center', fontWeight: 600, color: '#666' }}>{d}</div>; })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
            <div style={{ minHeight: 80, background: '#f8fafc', borderRadius: 6 }}></div>
            {days.map(function(d) {
              var hasAppt = appts[d];
              var isConflict = hasAppt === 'conflict';
              var isToday = d === 6;
              return (
                <div
                  key={d}
                  onClick={function() { setDay(day === d ? 0 : d); }}
                  style={{ minHeight: 80, padding: 8, background: day === d ? '#e0f2fe' : '#fff', border: isToday ? '2px solid ' + blue : '1px solid #eee', borderRadius: 6, cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: isToday ? 'bold' : 'normal' }}>{d}</span>
                    {isConflict && <span>⚠️</span>}
                  </div>
                  {hasAppt && !isConflict && <div style={{ marginTop: 8, padding: '3px 6px', background: blue, color: '#fff', borderRadius: 4, fontSize: 11 }}>{hasAppt} appts</div>}
                  {isConflict && <div style={{ marginTop: 8, padding: '3px 6px', background: '#fee2e2', color: '#dc2626', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>CONFLICT</div>}
                </div>
              );
            })}
          </div>
          {day > 0 && (
            <div style={{ marginTop: 15, padding: 15, background: '#f0f9ff', borderRadius: 6 }}>
              <strong>December {day}, 2025</strong>
              <p style={{ margin: '10px 0 0', color: '#666' }}>{appts[day] ? (appts[day] === 'conflict' ? 'Conflict detected - 2 overlapping appointments' : appts[day] + ' appointments scheduled') : 'No appointments'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // CONFLICTS
  function Conflicts() {
    return (
      <div>
        <h2 style={{ margin: '0 0 15px' }}>Scheduling Conflicts</h2>
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: 15, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 500 }}>Conflict Detection: ALG-001</span>
            <span style={{ color: '#888' }}>1 pending</span>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ border: '2px solid #fca5a5', background: '#fef2f2', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', gap: 15 }}>
                <span style={{ fontSize: 30 }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px', color: '#dc2626' }}>Double Booking Detected</h3>
                  <p style={{ margin: '0 0 15px', color: '#666' }}>Dr. Maria Johnson | Dec 6, 2025 | 11:00 AM</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 15 }}>
                    <div style={{ background: '#fff', padding: 15, borderRadius: 6, border: '1px solid #fca5a5' }}>
                      <small style={{ color: '#888' }}>APPOINTMENT 1</small>
                      <p style={{ margin: '5px 0 0', fontWeight: 500 }}>John Smith</p>
                    </div>
                    <div style={{ background: '#fff', padding: 15, borderRadius: 6, border: '1px solid #fca5a5' }}>
                      <small style={{ color: '#888' }}>APPOINTMENT 2</small>
                      <p style={{ margin: '5px 0 0', fontWeight: 500 }}>Emily Davis</p>
                    </div>
                  </div>
                  <button style={{ padding: '10px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginRight: 10 }}>Reschedule #1</button>
                  <button style={{ padding: '10px 20px', background: burgundy, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Reschedule #2</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REPORTS
  function Reports() {
    var reports = [
      { id: 'REP-001', name: 'Monthly Utilization', color: blue },
      { id: 'REP-002', name: 'Counsellor Productivity', color: '#166534' },
      { id: 'REP-003', name: 'Client Demographics', color: '#92400e' },
      { id: 'REP-004', name: 'Conflict Audit Log', color: '#dc2626' },
      { id: 'REP-005', name: 'Financial Forecast', color: '#7c3aed' },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 15px' }}>Reports</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 15 }}>
          {reports.map(function(r) {
            return (
              <div key={r.id} style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>📊</span>
                  <span style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>{r.id}</span>
                </div>
                <h4 style={{ margin: '0 0 15px' }}>{r.name}</h4>
                <button style={{ width: '100%', padding: 10, background: r.color, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Generate</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // DELETE MODAL
  function Modal() {
    if (!modal) return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
        <div style={{ background: '#fff', padding: 30, borderRadius: 12, width: 350, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🗑️</div>
          <h3 style={{ margin: '0 0 10px' }}>Delete {modal.name}?</h3>
          <p style={{ color: '#666', marginBottom: 20 }}>This cannot be undone.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={function() { setModal(false); }} style={{ flex: 1, padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button onClick={function() { setModal(false); }} style={{ flex: 1, padding: 12, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN CONTENT
  function Content() {
    if (page === 'dashboard') return <Dashboard />;
    if (page === 'clients') return <Clients />;
    if (page === 'calendar') return <Calendar />;
    if (page === 'conflicts') return <Conflicts />;
    if (page === 'reports') return <Reports />;
    return <Dashboard />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: 20, overflow: 'auto' }}>
          <Content />
        </main>
      </div>
      <Modal />
    </div>
  );
}

export default App;
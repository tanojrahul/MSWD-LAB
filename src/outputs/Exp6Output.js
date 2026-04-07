import React, { useState, useEffect } from 'react';

/* ── Mock data simulating real API responses ── */
const mockProfile = { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031', website: 'hildegard.org', company: { name: 'Romaguera-Crona' }, address: { city: 'Gwenborough' } };

const mockProducts = [
  { id: 1, title: "Fjallraven Backpack",   price: 109.95, category: "men's clothing", rating: { rate: 3.9 } },
  { id: 2, title: "Mens Casual Tee",       price: 22.30,  category: "men's clothing", rating: { rate: 4.1 } },
  { id: 3, title: "Mens Cotton Jacket",    price: 55.99,  category: "men's clothing", rating: { rate: 4.7 } },
  { id: 4, title: "Womens Fitted Shirt",   price: 15.99,  category: "women's clothing",rating: { rate: 2.6 } },
  { id: 5, title: "John Hardy Bracelet",   price: 695.00, category: "jewelery",       rating: { rate: 4.6 } },
  { id: 6, title: "Solid Gold Petite",     price: 168.00, category: "jewelery",       rating: { rate: 3.9 } },
];

const mockCustomers = [
  { id: 1, name: 'Ervin Howell', email: 'Shanna@melissa.tv', orders: [{ id: 101, product: 'Laptop', amount: 999 }, { id: 102, product: 'Mouse', amount: 29 }] },
  { id: 2, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', orders: [{ id: 201, product: 'Keyboard', amount: 79 }] },
];

const Loading = () => <p style={{ color: '#666', fontStyle: 'italic' }}>⏳ Fetching data from API...</p>;

/* ── ProfileData component ── */
const ProfileData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => { setTimeout(() => { setUser(mockProfile); setLoading(false); }, 900); }, []);
  if (loading) return <Loading />;
  return (
    <div style={{ border: '2px solid #007bff', borderRadius: 10, padding: 20, maxWidth: 360, background: '#f0f8ff' }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>👤 User Profile <span style={{ fontSize: 11, background: '#007bff', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>GET /users/1</span></h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> @{user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>City:</strong> {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
    </div>
  );
};

/* ── ProductAPIConsumer ── */
const ProductAPIConsumer = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => { setTimeout(() => { setProducts(mockProducts); setLoading(false); }, 700); }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <h3 style={{ color: '#28a745' }}>🛍️ Products <span style={{ fontSize: 11, background: '#28a745', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>GET /products</span></h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fafafa' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 13 }}>{p.title}</p>
            <p style={{ margin: '0 0 6px', color: '#28a745', fontWeight: 700 }}>${p.price}</p>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: '#888' }}>{p.category}</p>
            <p style={{ margin: 0, fontSize: 12 }}>⭐ {p.rating.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── AddStudentForm ── */
const AddStudentForm = () => {
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [status, setStatus] = useState(null);
  const submit = e => {
    e.preventDefault();
    if (form.name && form.email && form.course) {
      setStatus('loading');
      setTimeout(() => setStatus({ success: true, data: { id: Date.now(), ...form } }), 800);
    }
  };
  const input = { width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: 5, marginBottom: 12, boxSizing: 'border-box', fontSize: 13 };
  return (
    <div style={{ maxWidth: 380 }}>
      <h3 style={{ color: '#ffc107', marginTop: 0 }}>🎓 Add Student <span style={{ fontSize: 11, background: '#ffc107', color: '#000', padding: '2px 8px', borderRadius: 10 }}>POST /students</span></h3>
      {status === 'loading' && <Loading />}
      {status?.success && <div style={{ background: '#d4edda', color: '#155724', padding: 12, borderRadius: 6, marginBottom: 12 }}>✅ Student added! ID: {status.data.id}</div>}
      <form onSubmit={submit}>
        <input style={input} placeholder="Student Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={input} type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={input} placeholder="Course" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#ffc107', color: '#000', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 700 }}>Submit (POST Request)</button>
      </form>
    </div>
  );
};

/* ── CustomerAPIConsumer (Nested Data) ── */
const CustomerAPIConsumer = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { setTimeout(() => { setCustomers(mockCustomers); setLoading(false); }, 600); }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <h3 style={{ color: '#6c757d', marginTop: 0 }}>👥 Customers + Orders <span style={{ fontSize: 11, background: '#6c757d', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>GET /customers (nested)</span></h3>
      {customers.map(c => (
        <div key={c.id} style={{ border: '1px solid #ddd', borderRadius: 8, marginBottom: 10, overflow: 'hidden' }}>
          <div onClick={() => setExpanded(expanded === c.id ? null : c.id)} style={{ padding: '12px 14px', background: '#f8f9fa', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{c.name}</strong> — {c.email}</span>
            <span>{expanded === c.id ? '▲' : '▼'} {c.orders.length} orders</span>
          </div>
          {expanded === c.id && (
            <div style={{ padding: '10px 14px' }}>
              {c.orders.map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: 13 }}>
                  <span>Order #{o.id} — {o.product}</span>
                  <strong style={{ color: '#28a745' }}>${o.amount}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Tabs ── */
const tabs = ['Profile Data', 'Products API', 'Add Student', 'Customers'];
const panels = [<ProfileData />, <ProductAPIConsumer />, <AddStudentForm />, <CustomerAPIConsumer />];

export default function Exp6Output() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div style={{ background: '#f1f3f5', padding: '8px 10px', borderRadius: 6, marginBottom: 10, fontSize: 12, color: '#888' }}>
        🔌 Simulating Axios requests to <code style={{ background: '#e9ecef', padding: '1px 5px', borderRadius: 3 }}>https://fakestoreapi.com</code> — responses are mocked for demo
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: tab === i ? 700 : 400, background: tab === i ? '#6c757d' : '#e9ecef', color: tab === i ? '#fff' : '#333', fontSize: 13 }}>{t}</button>
        ))}
      </div>
      {panels[tab]}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });
  const [editing, setEditing] = useState({ id: null, name: "", quantity: 1 });

  const API_BASE = "http://localhost:8080/shopping"; // use port-forward or local backend

  const fetchItems = async () => {
    try {
      const res = await fetch(API_BASE);
      setItems(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem.name, quantity: Number(newItem.quantity) }),
    });
    setNewItem({ name: "", quantity: 1 });
    fetchItems();
  };

  const handleSave = async (id) => {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editing.name, quantity: Number(editing.quantity) }),
    });
    setEditing({ id: null, name: "", quantity: 1 });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Shopping List</h1>

      {/* Add Item Form */}
      <div className="card mb-4 p-3 shadow-sm">
        <form className="d-flex gap-2" onSubmit={handleAdd}>
          <input
            className="form-control"
            placeholder="Item name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            min="1"
            className="form-control"
            value={newItem.quantity}
            onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>

      {/* Items List */}
      {items.map(item => (
        <div key={item.id} className="card mb-2 p-3 shadow-sm d-flex justify-content-between align-items-center">
          {editing.id === item.id ? (
            <div className="d-flex gap-2 align-items-center">
              <input
                className="form-control"
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
              />
              <input
                type="number"
                min="1"
                className="form-control"
                value={editing.quantity}
                onChange={e => setEditing({ ...editing, quantity: e.target.value })}
              />
              <button className="btn btn-success" onClick={() => handleSave(item.id)}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing({ id: null, name: "", quantity: 1 })}>Cancel</button>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center w-100">
              <span><strong>{item.name}</strong> — Qty: {item.quantity}</span>
              <div className="d-flex gap-2">
                <button className="btn btn-warning btn-sm" onClick={() => setEditing({ id: item.id, name: item.name, quantity: item.quantity })}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;

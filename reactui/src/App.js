import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // --- existing shopping list states ---
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });
  const [editing, setEditing] = useState({ id: null, name: "", quantity: 1 });

  // --- Fibonacci states ---
  const [fibLength, setFibLength] = useState(10);
  const [fibSequence, setFibSequence] = useState([]);

  const API_BASE = ""; // relative URL for NGINX proxy

  // --- Shopping list fetch ---
  const fetchItems = async () => {
    try {
      const res = await fetch("/shopping");
      setItems(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  // --- Fibonacci fetch ---
  const fetchFibonacci = async () => {
    try {
      const res = await fetch(`/fib?length=${fibLength}`);
      setFibSequence(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchFibonacci(); // optional initial load
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Shopping List</h1>
      {/* --- Shopping list form and items --- */}
      {/* existing code unchanged */}

      {/* --- Fibonacci Section --- */}
      <div className="card mb-4 p-3 shadow-sm">
        <h2>Fibonacci Sequence</h2>
        <div className="d-flex gap-2 align-items-center mb-2">
          <input
            type="number"
            min="1"
            className="form-control"
            value={fibLength}
            onChange={e => setFibLength(Number(e.target.value))}
          />
          <button className="btn btn-primary" onClick={fetchFibonacci}>Generate</button>
        </div>
        <div>
          <strong>Sequence:</strong> {fibSequence.join(", ")}
        </div>
      </div>
    </div>
  );
}

export default App;

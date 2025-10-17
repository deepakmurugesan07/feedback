import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardPage.css";

export default function DashboardPage({ user, setUser }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]); 
  const [newFeedback, setNewFeedback] = useState({
    customer_name: "",
    rating: "",
    comment: "",
    product: "",
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedbacks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFeedbacks(res.data);
      setFilteredFeedbacks(res.data); 
    } catch (err) {
      console.error("Fetch Feedbacks Error:", err);
      alert("Failed to fetch feedbacks. Check backend logs.");
    }
  };

  useEffect(() => {
    if (user?.token) fetchFeedbacks();
  }, [user]);

  const addFeedback = async () => {
    try {
      if (
        !newFeedback.customer_name ||
        !newFeedback.comment ||
        !newFeedback.rating ||
        newFeedback.rating < 1 ||
        newFeedback.rating > 5
      ) {
        return alert("Invalid input: rating must be 1–5 and all fields required.");
      }

      await axios.post(
        "http://localhost:5000/feedbacks",
        { ...newFeedback, rating: parseInt(newFeedback.rating) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setNewFeedback({ customer_name: "", rating: "", comment: "", product: "" });
      fetchFeedbacks();
    } catch (err) {
      console.error("Add Feedback Error:", err);
      alert("Failed to add feedback.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const totalFeedback = feedbacks.length;
  const rating4plus = feedbacks.filter((f) => f.rating >= 4).length;
  const perDayCount = feedbacks.reduce((acc, f) => {
    acc[f.date] = (acc[f.date] || 0) + 1;
    return acc;
  }, {});

  const showAll = () => setFilteredFeedbacks(feedbacks);
  const showPositive = () =>
    setFilteredFeedbacks(feedbacks.filter((f) => f.rating >= 4));

  return (
    <div className="container">
      <div className="header">
        <h3>Feedback Dashboard</h3>
        <div className="user-right">
          <div className="user-pill">Hi, {user.username}</div>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card stat-1">
          <div className="label">Total Feedbacks</div>
          <div className="value">{totalFeedback}</div>
        </div>
        <div className="stat-card stat-2">
          <div className="label">Rating ≥ 4</div>
          <div className="value">{rating4plus}</div>
        </div>
        <div className="stat-card stat-3">
          <div className="label">Per Day Count</div>
          <ul className="perday-list">
            {Object.entries(perDayCount).map(([date, count]) => (
              <li key={date}>
                {date}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="form-card">
        <h5>Add Feedback</h5>
        <input
          className="form-control"
          placeholder="Customer Name"
          value={newFeedback.customer_name}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, customer_name: e.target.value })
          }
        />
        <input
          type="number"
          className="form-control"
          placeholder="Rating 1–5"
          value={newFeedback.rating}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, rating: e.target.value })
          }
        />
        <input
          className="form-control"
          placeholder="Comment"
          value={newFeedback.comment}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, comment: e.target.value })
          }
        />
        <input
          className="form-control"
          placeholder="Product"
          value={newFeedback.product}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, product: e.target.value })
          }
        />
        <button className="btn btn-success mt-2" onClick={addFeedback}>
          Add Feedback
        </button>
      </div>

      <div className="filter-buttons mt-4 mb-2">
        <button className="btn btn-primary me-2" onClick={showAll}>
          Show All Feedbacks
        </button>
        <button className="btn btn-success" onClick={showPositive}>
          Show Rating ≥ 4
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((f) => (
            <tr key={f._id || f.date + f.customer_name}>
              <td>{f.date}</td>
              <td>{f.customer_name}</td>
              <td>{f.rating}</td>
              <td>{f.comment}</td>
              <td>{f.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

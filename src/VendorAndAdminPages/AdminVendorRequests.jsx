import { useEffect, useState } from "react";
import * as adminVendorService from "../services/admin";
import "./AdminVendorRequests.css";
function AdminVendorRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [note, setNote] = useState("");
  const [activeId, setActiveId] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminVendorService.getRequests();
      setRequests(data);
    } catch (err) {
      console.log(err);
      setError("Error loading vendor requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {fetchRequests();}, []);

  const handleApprove = async (id) => {
    try {
      await adminVendorService.approveRequest(id);
      await fetchRequests();
    } catch (err) {
      console.log(err);
      setError("Error approving request");
    }
  };

  const handleReject = async (id) => {
    try {
      await adminVendorService.rejectRequest(id, note);
      setNote("");
      setActiveId("");
      await fetchRequests();
    } catch (err) {
      console.log(err);
      setError("Error rejecting request");
    }
  };

  return (
    <main className="avr">
      <h1 className="avr-title">Vendor Requests</h1>

      {loading ? (<p className="avr-loading">Loading...</p> ) : (
        <>
          {error && <p className="avr-error">{error}</p>}

          {requests.length === 0 ? (
            <p className="avr-empty">No vendor requests found.</p>
          ) : (
            <table className="avr-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Store Name</th>
                  <th>Instagram</th>
                  <th>Status</th>
                  <th>Admin Note</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.userId?.username}</td>
                    <td>{req.userId?.email}</td>
                    <td>{req.vendorName}</td>
                    <td>{req.instagram}</td>

                    <td>
                      <span className={`avr-badge avr-${req.status}`}>
                        {req.status}
                      </span>
                    </td>

                    <td>{req.adminNote || "-"}</td>

                    <td>
                      <button className="avr-btn" disabled={req.status !== "pending"} onClick={() => handleApprove(req._id)} >
                        Approve
                      </button>

                      <button className="avr-btn avr-btn--danger" disabled={req.status !== "pending"} onClick={() => setActiveId(req._id)}>
                        Reject
                      </button>

                      {activeId === req._id && (
                        <div className="avr-rejectBox">
                          <textarea className="avr-textarea" rows={2} value={note} onChange={(e) => setNote(e.target.value)}placeholder="Admin note (optional)"/>
                          <button className="avr-btn avr-btn--danger" onClick={() => handleReject(req._id)} > Confirm </button>
                          <button className="avr-btn" onClick={() => { setActiveId(""); setNote(""); }}>
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </main>
  );
}

export default AdminVendorRequests;
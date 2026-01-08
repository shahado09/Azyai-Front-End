import { useEffect, useState } from "react";
import * as vendorRequestService from "../services/vendor";

function VendorRequest() {
  const [latest, setLatest] = useState(null);

  const [formData, setFormData] = useState({
    instagram: "",
    vendorName: "",
    aboutVendor: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchLatest() {
    try {
        setLoading(true);     
        setError("");         
        const data = await vendorRequestService.getLatest(); 
        setLatest(data); } 
    catch (err) {
        console.log(err);
        setError("Error loading vendor request");} 
    finally {
        setLoading(false);}
    }

useEffect(() => {fetchLatest();}, []);

return (
  <main className="vr">
    <h1 className="vr-title">Request To Be A Vendor</h1>

    {loading ? (
      <p className="vr-loading">Loading...</p>) : !latest ? ( <p className="vr-empty">No vendor requests yet.</p>) : (
      <section className="vr-status">
        <h2 className="vr-status-title">Your Latest Request</h2>
        <div className="vr-card">
          <p className="vr-row">
            <span className="vr-label">Status: </span>
            <span className={"vr-value"}>{latest.status}</span>
          </p>

          <p className="vr-row">
            <span className="vr-label">Vendor Name: </span>
            <span className="vr-value">{latest.vendorName}</span>
          </p>

          <p className="vr-row">
            <span className="vr-label">Instagram: </span>
            <span className="vr-value">{latest.instagram}</span>
          </p>

          <p className="vr-row">
            <span className="vr-label">About: </span>
            <span className="vr-value">{latest.aboutVendor}</span>
          </p>

          {latest.status === "rejected" && (
            <p className="vr-note">
              <span className="vr-label">Admin Note: </span>
              <span className="vr-value">{latest.adminNote || "No note provided"} </span>
            </p>
          )}
        </div>
      </section>
    )}

    {error && <p className="vr-error">{error}</p>}
    {success && <p className="vr-success">{success}</p>}
  </main>
);
}
export default VendorRequest;

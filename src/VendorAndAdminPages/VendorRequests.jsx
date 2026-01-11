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
    const fetchLatest = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await vendorRequestService.getLatest();
            setLatest(data);
        } catch (err) {
            console.log(err);
            setError("Error loading vendor request");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newFormData = {...formData,[name]: value,};
        setFormData(newFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setError("");
        setSuccess("");

        const instagram = formData.instagram.trim();
        const vendorName = formData.vendorName.trim();
        const aboutVendor = formData.aboutVendor.trim();

        if (!instagram || !vendorName || !aboutVendor) {
            setError("All fields are required");
            return;}

        try {
            setSubmitting(true);
            await vendorRequestService.createRequest({instagram,vendorName,aboutVendor,});
            setSuccess("Request submitted successfully");
            setFormData({ instagram: "", vendorName: "", aboutVendor: "" });
            await fetchLatest(); 
        } catch (err) {
            console.log(err);
            setError("Error submitting vendor request");
        } finally {
            setSubmitting(false);
        }
};


    const shouldShowForm = !latest || latest.status === "rejected";
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

    {shouldShowForm && (<section className="vr-formSec">
      <h2 className="vr-formTitle">Submit Vendor Request</h2>

      <form className="vr-form" onSubmit={handleSubmit}>
        <label className="vr-field">
          <span className="vr-label">Instagram</span>
          <input className="vr-input" name="instagram" value={formData.instagram}
            onChange={handleChange} placeholder="email@.com" /></label>

        <label className="vr-field">
          <span className="vr-label">Store Name</span>
          <input className="vr-input" name="vendorName" value={formData.vendorName}
            onChange={handleChange} placeholder="Your brand name" /></label>

        <label className="vr-field">
          <span className="vr-label">About Store</span>
          <textarea className="vr-textarea" name="aboutVendor" value={formData.aboutVendor} 
          onChange={handleChange} placeholder="Tell us about your business..."/></label>

        <button className="vr-btn" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
      </form>
    </section>
)}

      
  </main>
);
}
export default VendorRequest;

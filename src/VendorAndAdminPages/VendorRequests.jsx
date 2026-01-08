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

  return (
    <main>
      <h1>Vendor Request</h1>
    </main>
  );
}
export default VendorRequest;

import { useState } from "react";

const CloudinaryMultiUpload = ({ onUploaded }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setLoading(true);

    try {
      const uploads = files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: data }
        );

        if (!res.ok) throw new Error("Upload failed");
        const json = await res.json();
        return json.secure_url;
      });

      const urls = await Promise.all(uploads);

      setImageUrls(urls);
      onUploaded?.(urls);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />

      {loading && <p>Uploading...</p>}

      {imageUrls.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {imageUrls.map((url) => (
            <img key={url} src={url} alt="preview" style={{ width: 120, height: 120, objectFit: "cover" }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CloudinaryMultiUpload;


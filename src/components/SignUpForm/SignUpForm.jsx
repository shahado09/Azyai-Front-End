import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Clear any error messages
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.passwordConf) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await authService.signUp(formData);

      if (res && res.token) {
        setUser(res.user);

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        
        // Redirect to the profile edit page after signup
        // so the user can add profile details
        navigate(`/profile/${res.user.profileId}/edit`);
      }
    } catch (err) {
      // Handle potential errors
      if (err.response?.status === 409) {
        setMessage("Username or email already exists. Please try another.");
      } else {
        setMessage("An error occurred during sign up. Please try again.");
      }
      console.error("Signup error:", err);
    }
  };

  // Check if the form is invalid
  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.email &&
      formData.password &&
      formData.password === formData.passwordConf
    );
  };

  return (
<main className="signup-page">
  <div className="signup-container">
    <div className="signup-content">
      <h2>Sign Up</h2>
      {message && <p className="error-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="input-field"
              type="text"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="input-field"
              type="email"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="input-field"
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConf">Confirm Password:</label>
            <input
              className="input-field"
              type="password"
              id="passwordConf"
              value={formData.passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="sidebar-btn edit" disabled={isFormInvalid()}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
  );
};

export default SignUpForm;
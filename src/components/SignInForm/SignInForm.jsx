import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import "./SignInForm.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.signIn(formData);
      // console.log(res.user.role)
      if (res?.token && res?.user) {
        const userObj = {
          _id: res.user._id,
          username: res.user.username,
          email: res.user.email,
          token: res.token,
          profileId: res.user.profileId,
          role: res.user.role
        };
        // console.log(userObj)
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("profileId", res.user.profileId);
        navigate(`/landing`);
      }
    } catch (err) {
      setMessage("Invalid credentials");
      console.error(err);
    }
  };
  const handleLogin = async () => {
  const res = await authService.signIn(formData);

  localStorage.setItem("token", res.token); // إذا عندج توكن
  setUser(res.user); // 🔥 هذا يحفظ باللوكل ستورج + يثبت بعد الريفرش
};

  return (
  <main className="signin-page">
  <div className="signin-container">
    <div className="signin-content">
      <h1>Sign In</h1>
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">Username:</label>
        <input
          className="input-field"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="input-field"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  </div>
</main>
  );
};

export default SignInForm;

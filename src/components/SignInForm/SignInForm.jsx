import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

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
        // بعد تسجيل الدخول → صفحة عرض البروفايل
        navigate(`/profile/${res.user.profileId}`);
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
    <main>
      <h1>Sign In</h1>
      {message && <p style={{ color: "crimson" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
};

export default SignInForm;

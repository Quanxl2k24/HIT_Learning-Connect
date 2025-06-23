import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  return <button onClick={handleNavigateLogin}>Login</button>;
};

export default Home;

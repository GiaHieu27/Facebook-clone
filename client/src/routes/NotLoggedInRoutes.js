import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function NotLoggedInRoutes() {
  const { user } = useSelector((user) => ({ ...user }));
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default NotLoggedInRoutes;

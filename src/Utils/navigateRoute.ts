import { type NavigateFunction } from "react-router";

export const navigateToProfile = (navigate: NavigateFunction, role: string) => {
  switch (role) {
    case "ADMIN":
      return navigate("/admin/profile");
    case "AGENT":
      return navigate("/agent/profile");
    case "USER":
      return navigate("/user/profile");
    default:
      return navigate("/profile");
  }
};

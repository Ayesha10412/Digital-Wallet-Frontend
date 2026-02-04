import { Role } from "@/Constant/Role";

export const navigateByRole = (
  role: string,
  navigate: (path: string) => void,
) => {
  const normalizedRole = role.toLowerCase(); // ✅ FIX

  switch (normalizedRole) {
    case Role.admin:
      navigate("/admin");
      break;

    case Role.agent:
      navigate("/agent");
      break;

    case Role.user:
      navigate("/user");
      break;

    default:
      navigate("/");
  }
};

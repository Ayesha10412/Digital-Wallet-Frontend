import { useUserInfoQuery } from "@/Redux/Features/User/user.api";

export default function useRole() {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  //console.log(userData?.data?.role);
  const Role = userData?.data?.role;
  let profilePath = "/user/profile";

  switch (Role) {
    case "ADMIN":
      profilePath = "/admin/profile";
      break;
    case "AGENT":
      profilePath = "/agent/profile";
      break;
    case "USER":
    default:
      profilePath = "/user/profile";
      break;
  }
  return { profilePath, isLoading, Role };
}

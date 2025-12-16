import { Button } from "@/components/ui/button";
import { authApi, useLogoutMutation } from "@/Redux/Features/auth/auth.api";
import { useAppDispatch } from "@/Redux/hook";
interface logoutProps {
  className?: string;
}
export default function Logout({ className }: logoutProps) {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  return (
    <>
      {" "}
      <Button
        className={`max-w-3xl ${className}`}
        variant="outline"
        onClick={handleLogout}
      >
        {" "}
        Logout
      </Button>
    </>
  );
}

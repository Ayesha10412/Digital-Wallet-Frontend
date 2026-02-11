import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import LoginForm from "@/Modules/Authentication/LoginForm";
import RegisterImage from "@/assets/images/Register-Image.jpg";
export default function Login() {
  return (
    <div className="w-full mt-10  ">
      <div className="relative min-h-screen w-full bg-gray-100 rounded-xl  ">
        <div
          className="absolute inset-0 bg-cover  bg-center brightness-90 dark:brightness-75 "
          style={{ backgroundImage: `url(${RegisterImage})` }}
        ></div>

        <div className="absolute inset-0 bg-black/30 "></div>

        <div className="relative z-10 flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 mb-8"
            style={{ minWidth: "75px", minHeight: "35px" }}
          >
            <div className="w-[40%] mx-auto mt-12">
              {" "}
              <Logo />
            </div>
          </Link>

          <div className="w-full mb-2 max-w-xl  bg-white/0 rounded-lg shadow-md backdrop-blur-sm">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
}

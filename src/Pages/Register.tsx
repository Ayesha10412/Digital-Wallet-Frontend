import RegistrationForm from "@/Modules/Authentication/RegistrationForm";
import { Link } from "react-router";
import RegisterImage from "../assets/RegisterImage.jpg";
import Logo from "@/assets/icons/Logo";
export default function Register() {
  return (
    <div className="w-full">
      <div className="relative min-h-screen w-full bg-gray-100 rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90 dark:brightness-75 "
          style={{ backgroundImage: `url(${RegisterImage})` }}
        ></div>

        <div className="absolute inset-0 bg-black/30 "></div>

        <div className="relative z-10 flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 mb-8"
            style={{ minWidth: "80px", minHeight: "40px" }}
          >
            <div className="w-[40%] mx-auto mt-12">
              {" "}
              <Logo />
            </div>
          </Link>

          <div className="w-full max-w-xl p-6 sm:p-10 bg-white/0 rounded-lg shadow-md backdrop-blur-sm">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

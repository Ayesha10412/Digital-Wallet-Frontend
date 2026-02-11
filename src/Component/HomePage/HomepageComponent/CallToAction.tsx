import { useNavigate } from "react-router-dom";
import Image from "../../../assets/homepageImgs/beautiful-cryptocurrwncy-concept.jpg";

export default function CallToAction() {
  const navigate = useNavigate();
  return (
    <div className="relative  py-20 rounded-2xl text-white border shadow-lg  mt-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90 dark:brightness-75"
        style={{ backgroundImage: `url(${Image})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Get Started Today</h2>
        <p className="mb-6 text-lg">
          Sign up in under 1 minute and start managing your digital wallet.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

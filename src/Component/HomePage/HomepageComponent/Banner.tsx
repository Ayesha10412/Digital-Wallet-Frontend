import { motion } from "framer-motion";
import img1 from "../../../assets/homepageImgs/pexels-alesiakozik-6771671.jpg";
import img2 from "../../../assets/homepageImgs/pexels-imin-technology-276315592-12935077.jpg";
import img3 from "../../../assets/homepageImgs/pexels-kampus-8475148.jpg";
import img4 from "../../../assets/homepageImgs/pexels-pavel-danilyuk-6812441.jpg";
import img5 from "../../../assets/homepageImgs/pexels-shvetsa-4226273.jpg";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate=useNavigate()
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="w-full rounded-xl overflow-hidden relative">
      {/* IMAGE SLIDER (visual only, no pointer events) */}
      <motion.div
        className="flex pointer-events-none"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className="w-full h-[580px] object-cover flex-shrink-0"
          />
        ))}
      </motion.div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>

      {/* TEXT + CTA OVERLAY */}
      <div
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          bg-white/30
          text-white
          shadow-xl
          backdrop-blur-sm
          rounded-xl
          px-9 py-10
          max-w-xl
          text-center
          z-20
        "
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Smart & Secure Digital Wallet
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-6">
          Manage payments, track expenses, and store your digital money
          safely—all in one place.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="
              px-6 py-3
              rounded-lg
              bg-primary
              text-white
              font-semibold
              shadow-lg
              hover:bg-primary/90
              transition
            "
          >
            Get Started Free
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/features")}
            className="
              px-6 py-3
              rounded-lg
              border border-white/70
              text-white
              font-semibold
              backdrop-blur-sm
              hover:bg-white/20
              transition
            "
          >
            Explore Features
          </motion.button>
        </div>
      </div>
    </div>
  );
}

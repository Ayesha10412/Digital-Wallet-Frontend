import { motion } from "framer-motion";
import img1 from "../../../assets/homepageImgs/pexels-alesiakozik-6771671.jpg";
import img2 from "../../../assets/homepageImgs/pexels-imin-technology-276315592-12935077.jpg";
import img3 from "../../../assets/homepageImgs/pexels-kampus-8475148.jpg";
import img4 from "../../../assets/homepageImgs/pexels-pavel-danilyuk-6812441.jpg";
import img5 from "../../../assets/homepageImgs/pexels-shvetsa-4226273.jpg";

export default function Banner() {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="w-full rounded-xl overflow-hidden relative">
      {/* IMAGE SLIDER */}
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"],
        }}
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
            className="w-full h-[580px] object-cover flex-shrink-0 shadow-3xl"
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-black/10 z-10"></div>
      {/* OVERLAY TEXT DIV */}
      <div
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          bg-white/30
          text-white 
          shadow-xl 
          backdrop-blur-sm
          rounded-xl 
          px-6 py-10
          max-w-max
          text-center
        "
      >
        <h2 className="text-3xl font-bold mb-3">
          Smart & Secure Digital Wallet
        </h2>
        <p className="text-lg">
          Manage payments, track expenses, and store your digital money
          safely—all in one place.
        </p>
      </div>
    </div>
  );
}

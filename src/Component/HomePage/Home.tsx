import Banner from "./HomepageComponent/Banner";
import CallToAction from "./HomepageComponent/CallToAction";
import FeatureHighlights from "./HomepageComponent/FeatureHighlights";
import Statistics from "./HomepageComponent/Statistics";
import Testimonials from "./HomepageComponent/Testimonials";

export default function Home() {
  return <div className="rounded-xl w-full  mx-auto mt-12">
    <Banner />
    <Statistics />
    <Testimonials />
    <FeatureHighlights />
    <CallToAction />
  </div>;
}

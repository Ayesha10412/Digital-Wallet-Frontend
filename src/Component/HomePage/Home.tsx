import Banner from "./HomepageComponent/Banner";
import Statistics from "./HomepageComponent/Statistics";

export default function Home() {
  return <div className="rounded-xl w-full  mx-auto mt-12">
    <Banner />
    <Statistics />
  </div>;
}

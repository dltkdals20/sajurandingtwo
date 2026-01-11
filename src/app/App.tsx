import Group9 from "../imports/Group9";
import MobileLanding from "./MobileLanding";

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="md:hidden">
        <MobileLanding />
      </div>
      <div className="hidden md:block">
        <div className="h-screen overflow-auto">
          <div className="mx-auto w-[888px]">
            <Group9 />
          </div>
        </div>
      </div>
    </div>
  );
}

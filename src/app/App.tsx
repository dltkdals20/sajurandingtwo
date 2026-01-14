import Group9 from "../imports/Group9";
import MobileLanding from "./MobileLanding";
import { useIsMobile } from "./components/ui/use-mobile";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <MobileLanding />
      ) : (
        <div className="min-h-screen bg-[#faf8f5]">
          <div className="h-screen overflow-auto">
            <div className="mx-auto w-[888px]">
              <Group9 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

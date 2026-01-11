import Group9 from "../imports/Group9";
import { useEffect, useState } from "react";

export default function MobileLanding() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      // 888px을 기준으로 스케일 계산
      if (screenWidth < 888) {
        setScale(screenWidth / 888);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="overflow-auto">
        {/* 반응형 스케일링: 화면 크기에 맞춰 자동 조정 */}
        <div
          style={{
            width: "888px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            marginBottom: scale < 1 ? `${(1 - scale) * -100}%` : 0,
          }}
        >
          <Group9 />
        </div>
      </div>
    </div>
  );
}

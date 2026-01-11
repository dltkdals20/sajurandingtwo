import Group9 from "../imports/Group9";
import { useEffect, useState } from "react";

export default function MobileLanding() {
  // 초기값을 클라이언트 사이드에서만 계산
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const calculatedScale = Math.min(1, screenWidth / 888);
      setScale(calculatedScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // 스케일이 계산될 때까지 로딩
  if (scale === null) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="overflow-auto">
        {/* 반응형 스케일링: 화면 크기에 맞춰 자동 조정 */}
        <div
          style={{
            width: "888px",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            margin: "0 auto",
          }}
        >
          <Group9 />
        </div>
      </div>
    </div>
  );
}

import Group9 from "../imports/Group9";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="overflow-auto">
        <div className="mx-auto w-full px-4 pb-20">
          {/* 웹 버전과 동일한 레이아웃을 모바일에서도 볼 수 있도록 스케일 조정 */}
          <div className="transform origin-top-center scale-75 sm:scale-90 lg:scale-100 md:scale-100 w-full" style={{ transformOrigin: "top center", minHeight: "100vh" }}>
            <div className="mx-auto w-[888px]">
              <Group9 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

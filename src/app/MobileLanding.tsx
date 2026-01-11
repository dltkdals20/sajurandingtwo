import Group9 from "../imports/Group9";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="h-screen overflow-auto">
        {/* 모바일 반응형: 가로 스크롤 가능하게 조정 */}
        <div className="inline-flex w-full justify-center min-w-[888px]">
          <div className="w-[888px]">
            <Group9 />
          </div>
        </div>
      </div>
    </div>
  );
}

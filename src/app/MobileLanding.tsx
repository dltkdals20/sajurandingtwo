import { useState } from "react";
import heroHorse from "../assets/53e8a7fccf8babba7f93e9039ab3ed7387b0357a.png";
import heroOrb from "../assets/992b32e06699ae77ca01c46bbfbac360c7c4c491.png";
import heroIllustration from "../assets/c19b998616706e20148c0ec6f87a223207b3c673.png";
import heroGemini from "../assets/542506765f2dea99cdfde9a9df5feb04721c3a38.png";
import friendIllustration from "../assets/e356b27b37008ac3a8f78e2c842e89c60ea95c6c.png";
import friendIllustration2 from "../assets/5d7824c911cead250e3bce9648f9d2664cef5542.png";
import reportCard1 from "../assets/07a1c3f04508c3abf8713fa2822d1736bd3eae74.png";
import reportCard2 from "../assets/ab300cc4091433b7b3baeb51804de3da38067477.png";
import reportCard3 from "../assets/8d38a19c4bbde28aee9a92890e3126d4a0ab854b.png";
import reportCard4 from "../assets/2e1e49d24517026b9cfb874accaec9a106eff731.png";
import reportCard5 from "../assets/fdf9548efc79642eb5fad597f85ad13937a8b70e.png";
import reportCard6 from "../assets/5d5c64a2daa6938158130c229c2fccc7a90acc8a.png";
import reportSample from "../assets/a0e78955231cc3aa7a9c6dadb5f14246639a415e.png";
import chatGptArt from "../assets/4c36561ae947be65d3a7a735ecac70b6f17ea531.png";
import counselorImage from "../assets/1fc1d5dd8fc74676cac26d86413d8f7da1b77cc0.png";
import ContactModal from "./ContactModal";

const highlights = [
  {
    title: "100% 비대면 진행",
    description: "방문 없이, 편하신 시간에 확인하세요.",
  },
  {
    title: "읽기 쉬운 모바일 리포트",
    description: "어려운 용어는 빼고, 모바일로 읽을 수 있게 url 링크로 보내드립니다.",
  },
];

const reviews = [
  {
    name: "김00님",
    initial: "김",
    text: "사주 기본 해석과 이직, 연애, 건강 등 궁금한 점을 전반적으로 상세하게 풀어줬고, 조언과 운을 높이는 팁까지 함께 첨언해준 덕분에 참고해서 미리 앞날을 준비할 수 있을 것 같아요:-)",
  },
  {
    name: "이00님",
    initial: "이",
    text: "나름 사주풀이가 전문성 있게 나와서 읽으면서 신뢰가 갔으며 다음기회가 있다면 한 번 더 사용해 볼만한 프로그램인 듯 하다.",
  },
  {
    name: "박00님",
    initial: "박",
    text: "사주보러 철학관 예약했는데, 취소했어요! 지금까지 알고있던 내용에서 더 디테일하게 나와서 신기했고 필기할 필요없이 궁금할때마다 찾아보면 되어 좋아요. 돈 벌었습니다~",
  },
  {
    name: "최00님",
    initial: "최",
    text: "처음엔 반신반의했는데, 제 사주 흐름을 되게 현실적으로 풀어줘서 놀랐어요. 특히 직장/재물/연애를 \"왜 이런 패턴이 반복되는지\"까지 연결해서 설명해주니까 그냥 운세가 아니라 제 행동 기준이 생긴 느낌이에요.",
  },
];

const recommendationItems = [
  {
    title: "2026년 내 인생은 어떻게 보내야 할지 고민..",
    description: "신년운세 5대 영역으로, 올해 고민을 한 번에 정리하세요.",
  },
  {
    title: "2026년 내 인생에 '필요한 에너지'는 무엇인가",
    description: "부족한 기운을 체감 언어로 번역해 드립니다.",
  },
  {
    title: "운이 좋아지게 만드는 '현실 실행법' 궁금해요!",
    description: "돈·일·관계·건강에서 지금 당장 바꿀 수 있는 행동으로 제시합니다.",
  },
  {
    title: "2026 신년운세 5대 영역 (직장·사업·연애·재물·건강)",
    description: "직장운, 사업운, 연애운, 재물운, 건강운 완벽 분석",
  },
  {
    title: "2026년 '지금 당장' 해야 할 3가지 행동",
    description: "올해 운을 내 편으로 만드는 실행 리스트",
  },
];

const benefits = [
  {
    number: "1",
    title: "언제 어디서나 편하게, 모바일로 보는 비대면 사주 리포트",
    description:
      "PC나 방문 없이, 스마트폰 하나로 언제든 내 사주를 확인하세요. URL 링크로 전달되어 출퇴근길, 쉬는 시간에도 편하게 읽을 수 있습니다.",
  },
  {
    number: "2",
    title: "10,000원으로 만나는 정통 사주 명리 분석",
    description:
      "철학관 방문 비용의 1/3 수준으로, 일간·일주 분석부터 2026년 5대 운세까지 전문적인 사주 해석을 받아보세요. 합리적인 가격에 깊이 있는 분석을 제공합니다.",
  },
  {
    number: "3",
    title: "리포트 이후, 상세 상담까지 연결 가능",
    description:
      "해석본을 읽고 더 궁금한 점이 생기면 언제든 추가 상담을 신청하실 수 있습니다. 리포트를 기반으로 한 맞춤 상담으로 더 깊이 있는 해답을 얻으세요.",
  },
];

const reportCards = [
  { title: "나의 사주 정보", image: reportCard1 },
  { title: "사주 팔자 및 오행 분포", image: reportCard2 },
  { title: "나의 일간 및 일주 분석", image: reportCard3 },
  { title: "나에게 필요한 용신은? 그리고 개운법", image: reportCard4 },
  { title: "2026년 직장 & 사업운", image: reportCard5 },
  { title: "2026 연인& 재물 & 건강운", image: reportCard6 },
];

const steps = [
  {
    number: "1",
    title: "네이버 톡톡으로 문의(전화번호 노출 x)",
    description: "궁금한 점을 먼저 상담하고 시작하세요",
  },
  {
    number: "2",
    title: "결제",
    description: "상담 신청 및 간편 결제를 진행해요",
  },
  {
    number: "4",
    title: "사전 질문 전달",
    description: "생년월일/시간(가능 시) + 현재 상황 + 궁금한 항목을 보내주세요",
  },
  {
    number: "5",
    title: "24시간 이내로 해석본 전달",
    description: "24시간 이내에 해석본을 전달드립니다.",
  },
  {
    number: "6",
    title: "해석 후 추가 상담이 필요하신 경우, 1만 원 할인된 금액으로 신청하실 수 있습니다.",
    description: "사주 흐름과 타로 리딩으로 2026년 운세 상담이 마무리됩니다",
  },
];

const faqs = [
  {
    question: "1. 태어난 시간까지 알아야 되나요?",
    answer: "태어난 시간까지 알아야지 정확히 사주가 해석이 가능합니다.",
  },
  {
    question: "2. 바로 해석본이 발송 되나요?",
    answer: "24시간 이내로 이메일로 발송됩니다.",
  },
];

const specialties = [
  "현대 명리학 기반 심층 사주 분석 및 타로 해석(웨이트·이너액티브 카드)",
  "TCI 기질 및 성격 검사 치료",
  "홀랜드 진로 탐색 및 커리어 코칭",
];

export default function MobileLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactModal = () => {
    (window as any).fbq?.("track", "Contact");
    setIsContactOpen(true);
  };

  const closeContactModal = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e2939]">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff8f0] to-white pb-8 pt-8 sm:pb-10 sm:pt-10">
        {/* 장식 요소 */}
        <div className="absolute right-4 top-6 text-3xl opacity-40 sm:right-6 sm:top-8 sm:text-4xl">⭐</div>
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-3 px-4 text-center sm:gap-4">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#ff6b1a] ring-1 ring-[#ffd7b0]">
            (2026 병오년 신년운세 포함)
          </span>
          <h1 className="text-2xl font-semibold leading-[1.15] text-[#2d2d2d] sm:text-[32px]">
            2026 병오년
            <br />
            사주 운세 해석본
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-4 py-1 text-sm font-semibold text-white">
              1만원대
            </span>
            <span className="text-base font-semibold text-[#2d2d2d] underline decoration-[#ff8c42] decoration-2 underline-offset-2 sm:text-lg">로 1년 설계</span>
          </div>
          <p className="text-sm leading-6 text-[#666]">
            지금 내 흐름을 읽고, 2026년을
            <br />
            덜 흔들리고 더 잘 풀리게 준비합니다.
          </p>
          <div className="relative mt-2 w-full overflow-hidden rounded-3xl bg-[#fff3e6] p-3 sm:p-4">
            <img
              alt="2026년 사주 리포트 이미지"
              className="relative z-10 w-full rounded-2xl object-cover shadow-[0px_20px_40px_-20px_rgba(0,0,0,0.35)]"
              src={heroGemini}
            />
          </div>
        </div>
      </section>

      {/* 가격 섹션 */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="rounded-[16px] border-2 border-[#ffb86a] bg-white p-5 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-[#1e2939] sm:text-lg">전통 사주 핵심 리포트</p>
              <span className="rounded-full bg-[#ff7d30] px-3 py-1 text-xs font-semibold text-white">66% 할인</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-[#99a1af] line-through">30,000원</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-[#1e2939] sm:text-3xl">10,000</span>
                <span className="text-sm font-semibold text-[#1e2939] sm:text-base">원</span>
              </div>
            </div>
            <div className="mt-4 rounded-[10px] bg-[#fff7ed] p-3 text-sm text-[#666] sm:p-4">
              <ul className="space-y-2">
                <li>✓ 일간,일주,용신,개운법,신년운세(직장,사업,건강,재물,연애운)</li>
                <li>✓ 네이버 톡톡으로 해석본 전달</li>
                <li>✓ 24시간 내 전달</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={openContactModal}
              className="mt-4 w-full rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-5 py-3 text-sm font-semibold text-white shadow-[0px_12px_20px_-10px_rgba(255,107,26,0.7)] sm:mt-5 sm:py-4 sm:text-base block text-center"
            >
              지금 신청하기
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-[#6a7282] sm:mt-4">* 신년 특별 할인은 한정 기간 운영됩니다</p>
        </div>
      </section>

      {/* 하이라이트 섹션 */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="grid gap-3 sm:gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[16px] border-2 border-[#ffe8d6] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-5"
              >
                <p className="text-sm font-semibold text-[#2d2d2d] sm:text-base">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#666]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="rounded-[24px] bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-4 py-5 text-center text-white sm:px-5 sm:py-6">
            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs">모바일 url 링크 제공</span>
            <p className="mt-3 text-2xl font-semibold sm:mt-4 sm:text-[36px]">10,000원</p>
            <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
              <button
                type="button"
                onClick={openContactModal}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#ff7d30] sm:py-3 block text-center"
              >
                신청하기
              </button>
            </div>
            <p className="mt-3 text-xs text-white/90 sm:mt-4">
              * 안내사항: 리포트는 신청 후 24시간 이내로 링크로 전달됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-semibold text-[#2d2d2d] sm:text-2xl">고객 후기</p>
            <p className="text-sm text-[#666]">결 상담소의 상담을 받아보신 분들의 생생한 후기입니다.</p>
          </div>
          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-[16px] border border-[#f3f4f6] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
                      {review.initial}
                    </div>
                    <span className="text-sm font-semibold text-[#1e2939]">{review.name}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#666] sm:mt-3">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 대상 섹션 */}
      <section className="relative py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          {/* 장식 별 */}
          <div className="absolute right-6 top-6 text-xl sm:right-8 sm:top-8 sm:text-2xl">⭐</div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-px flex-1 bg-[#ffe1c2]" />
            <span className="rounded-full bg-gradient-to-r from-[#ff6900] to-[#f54900] px-4 py-2 text-sm font-semibold text-white sm:px-5">
              이런 분께 추천해요.
            </span>
            <div className="h-px flex-1 bg-[#ffe1c2]" />
          </div>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
            {recommendationItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-2 rounded-[16px] border-2 border-[#ffe8d6] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:gap-3 sm:p-5"
              >
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#ff8c42] text-xs font-semibold text-white sm:h-8 sm:w-8 sm:text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e2939]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#666]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 rounded-[14px] border-2 border-[#ffd6a7] bg-gradient-to-r from-[#fff7ed] to-[#ffedd4] p-4 text-center sm:mt-8 sm:gap-3 sm:p-5">
            <p className="text-sm font-semibold text-[#f54900]">
              이미 많은 분들이 사주 운세 해석본으로 2026년 운세를 정리했어요
            </p>
            <div className="grid gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openContactModal}
                className="rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-4 py-2 text-sm font-semibold text-white sm:py-3 block text-center"
              >
                신청하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 강점 섹션 */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-semibold text-[#2d2d2d] sm:text-2xl">결쌤 상담소 신년운세 해석본의 강점</p>
            <p className="text-sm text-[#666]">결 상담소 사주 리포트만의 특별한 장점을 소개합니다.</p>
          </div>
          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="flex gap-3 rounded-[16px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:gap-4 sm:p-5"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-[12px] bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] text-lg font-semibold text-white sm:h-16 sm:w-16 sm:text-2xl">
                  {benefit.number}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e2939] sm:text-base">{benefit.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#666] sm:mt-2">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 컨텐츠 설명 섹션 */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="rounded-[16px] bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] p-5 text-center text-white sm:p-6">
            <p className="text-lg font-semibold sm:text-2xl">사주에 필요한 내용을 꼭 담았습니다.</p>
            <p className="mt-1 text-xs text-white/90 sm:mt-2 sm:text-sm">나의 일간, 일주, 용신, 개운법, 2026 신년운세 까지</p>
          </div>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
            <div className="rounded-[16px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-5">
              <p className="text-base font-semibold text-[#1e2939] sm:text-lg">일간 · 일주 분석</p>
              <p className="mt-2 text-sm leading-6 text-[#666]">
                일간은 사주에서 '나(본체)'를 뜻하는 태어난 날의 천간으로, 내가 원래 어떤 사람인지를 보여줍니다.
                반면 일주는 <span className="text-[#ff8c42]">일간 + 일지</span> 합쳐진 "태어난 날의 기둥"으로, 그 기질이
                실제 일상에서 어떻게 드러나고 반응하는지(말투, 선택, 관계 방식, 습관)를 함께 보여줍니다.
              </p>
            </div>
            <div className="rounded-[16px] border border-[#ffd6a7] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-5">
              <p className="text-base font-semibold text-[#1e2939] sm:text-lg">용신 · 개운법</p>
              <p className="mt-2 text-sm leading-6 text-[#666]">
                용신은 내 사주에 부족한 에너지, 즉 나를 균형있게 만들어주는 '필요한 기운'입니다.
              </p>
            </div>
            <div className="rounded-[16px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-5">
              <p className="text-base font-semibold text-[#1e2939] sm:text-lg">2026 신년운세</p>
              <p className="mt-2 text-sm leading-6 text-[#666]">
                병오년인 2026년, 내게 찾아오는 흐름을 직장운·사업운·재물운·건강운·연애운 5대 영역으로 나누어 분석합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 리포트 구성 섹션 */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="rounded-[16px] bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] p-4 text-center text-white sm:p-5">
            <p className="text-lg font-semibold sm:text-2xl">전체 리포트 구성</p>
          </div>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
            {reportCards.map((card) => (
              <div
                key={card.title}
                className="overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
              >
                <img alt={card.title} className="h-[180px] w-full object-cover sm:h-[240px]" src={card.image} />
                <div className="bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:py-3 sm:text-sm">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 방식 섹션 */}
      <section className="bg-gradient-to-b from-white to-[#fff7ed] py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="flex flex-col gap-2 text-center sm:gap-4">
            <p className="text-lg font-semibold text-[#1e2939] sm:text-2xl">진행 방식은 이렇게 간단해요</p>
            <p className="text-sm text-[#666]">2026년 전통 사주 핵심 리포트</p>
          </div>
          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex gap-3 rounded-[16px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] sm:gap-4 sm:p-5"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-r from-[#ff6900] to-[#f54900] text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-base">
                  {step.number}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e2939] sm:text-base">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#666]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-lg font-semibold text-[#2d2d2d] sm:text-2xl">주의사항</p>
            <p className="text-sm text-[#666]">사주 리포트 신청 전 꼭 확인해주세요.</p>
          </div>
          <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[16px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] [&>summary::-webkit-details-marker]:hidden sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#1e2939]">
                  {faq.question}
                  <span className="text-[#ff8c42] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#666]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ChatGPT 비교 섹션 */}
      <section className="bg-[#faf8f5] py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="rounded-[14px] border-2 border-[#ffd6a7] bg-white p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] text-base font-semibold text-white sm:h-9 sm:w-9">
                !
              </div>
              <p className="text-base font-semibold text-[#2d2d2d] sm:text-lg">잠깐!</p>
            </div>
            <div className="mt-3 grid gap-4 sm:mt-4 sm:gap-6">
              <div>
                <p className="text-sm font-semibold text-[#1e2939] sm:text-base">ChatGPT로 올해 운세를 확인해도 되나요?</p>
                <p className="mt-2 text-sm leading-6 text-[#666]">
                  ChatGPT로 사주를 볼 때는 시주·일주·월주·연주 정보가 정확해야 보다 의미 있는 해석이 가능합니다.
                </p>
              </div>
              <div className="relative">
                <img alt="ChatGPT 예시 이미지" className="w-full rounded-[14px] object-cover" src={reportSample} />
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-[14px] bg-white p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:mt-6 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-3 py-1 text-xs font-semibold text-white sm:px-4">
                예시
              </span>
              <p className="text-sm font-semibold text-[#1e2939] sm:text-base">ChatGPT 사주 계산 오차 사례</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#666] sm:mt-4">
              본 예시의 경우 실제 일주는 갑인(甲寅) 일주이나, ChatGPT 조회 결과에서는 갑진(甲辰)일주로
              산출되었습니다. 이처럼 ChatGPT에 생년월일과 출생 시간을 그대로 입력해도 시주·일주·월주·연주가 실제와
              다르게 계산되는 경우가 발생할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 상담사 소개 섹션 */}
      <section className="bg-[#faf8f5] py-8 sm:py-12">
        <div className="mx-auto w-full max-w-[420px] px-4">
          <div className="grid gap-4 rounded-[16px] bg-white p-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] sm:gap-6 sm:p-6">
            <img alt="결쌤 상담소 소개 이미지" className="h-[180px] w-full rounded-[16px] object-cover sm:h-[240px]" src={counselorImage} />
            <div>
              <p className="text-xs font-semibold text-[#6a7282]">COUNSELOR INTRODUCTION</p>
              <h2 className="mt-1 text-lg font-semibold text-[#0a0a0a] sm:mt-2 sm:text-2xl">
                당신의 고운한 '결'을 읽어드리는 <span className="text-[#e8a055]">결쌤 상담소</span>입니다.
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#666] sm:mt-3">
                운명은 정해진 것이 아니라, 내가 어떤 선택을 하느냐에 따라 달라집니다.
              </p>
              <p className="mt-2 text-sm text-[#666]">동양 도구: 정통 사주명리, 타로 심리</p>
              <p className="mt-1 text-sm text-[#666]">심리 도구: TCI (기질/성격), 홀랜드 (진로/적성)</p>
              <p className="mt-3 text-sm font-semibold text-[#1e2939]">전문 분야</p>
              <div className="mt-2 space-y-2 rounded-[16px] bg-[#faf8f5] p-3 text-sm text-[#666] sm:p-4">
                {specialties.map((item) => (
                  <div key={item} className="flex gap-2">
                    <span>🔍</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 하단 이미지 - 웹에서만 표시 */}
            <div className="hidden grid gap-2 sm:grid sm:gap-4">
              <img alt="추천 이미지" className="h-[220px] w-full rounded-[16px] object-cover" src={friendIllustration} />
              <img alt="혜택 이미지" className="h-[220px] w-full rounded-[16px] object-cover" src={friendIllustration2} />
            </div>
          </div>
        </div>
      </section>

      {/* 최종 CTA 섹션 */}
      <section className="pb-12 pt-8 sm:pb-16 sm:pt-10">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-3 px-4 sm:gap-4">
          <div className="grid gap-2 sm:gap-4">
            <button
              type="button"
              onClick={openContactModal}
              className="rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-5 py-3 text-lg font-semibold text-white shadow-[0px_12px_20px_-10px_rgba(255,107,26,0.7)] sm:py-4 sm:text-xl block text-center"
            >
              신청하기
            </button>
          </div>
        </div>
      </section>
      <ContactModal isOpen={isContactOpen} onClose={closeContactModal} />
    </main>
  );
}

import { useEffect, useRef, useState, type FormEvent } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setName("");
    setPhone("");
    setIsConsentChecked(false);
    setIsConsentOpen(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      nameRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConsentChecked) {
      return;
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      data-role="apply-modal"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-[0px_20px_40px_-20px_rgba(0,0,0,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          data-role="apply-close"
          className="absolute right-4 top-4 rounded-full px-2 py-1 text-sm font-semibold text-[#6a7282] hover:bg-[#f3f4f6]"
          aria-label="닫기"
        >
          닫기
        </button>
        <h2 id="contact-modal-title" className="text-xl font-semibold text-[#2d2d2d]">
          신청하기
        </h2>
        <p className="mt-2 text-sm text-[#6a7282]">이름과 휴대폰 번호를 입력해주세요.</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name" className="text-sm font-semibold text-[#2d2d2d]">
              이름
            </label>
            <input
              ref={nameRef}
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="홍길동"
              data-role="apply-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#ff8c42] focus:ring-2 focus:ring-[#ff8c42]/20"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="text-sm font-semibold text-[#2d2d2d]">
              휴대폰 번호
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="01012345678"
              data-role="apply-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-sm text-[#1f2937] outline-none focus:border-[#ff8c42] focus:ring-2 focus:ring-[#ff8c42]/20"
            />
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4 text-sm text-[#2d2d2d]">
            <div className="flex items-start gap-2">
              <input
                id="contact-consent"
                type="checkbox"
                checked={isConsentChecked}
                onChange={(event) => setIsConsentChecked(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#ff8c42]"
              />
              <label htmlFor="contact-consent" className="text-[11px] leading-6 text-[#6a7282]">
                개인정보 수집 · 이용에 동의합니다. (필수,{" "}
                <button
                  type="button"
                  onClick={() => setIsConsentOpen((prev) => !prev)}
                  className="text-[11px] font-semibold text-[#6a7282] underline decoration-[#6a7282] underline-offset-2"
                >
                  상세보기
                </button>
                )
              </label>
            </div>
            {isConsentOpen ? (
              <div className="mt-3 rounded-lg bg-white p-3 text-[11px] leading-5 text-[#4b5563]">
                <p className="font-semibold text-[#2d2d2d]">개인정보 수집 · 이용 동의</p>
                <p className="mt-2">인비랩은(는) 고객 지원을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
                <p className="mt-2">1) 개인정보 수집 목적 : 회원관리, 고객 상담, 고지사항 전달</p>
                <p className="mt-1">2) 개인정보 수집 항목 : 이름, 전화번호, 이메일</p>
                <p className="mt-1">3) 보유 및 이용기간 : 회원 탈퇴시까지</p>
                <p className="mt-2">
                  * 개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의를 거부할 경우에는 상품 제공이
                  불가합니다.
                </p>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            data-role="apply-submit"
            data-gtm="apply-submit"
            disabled={!isConsentChecked}
            className="w-full rounded-full bg-gradient-to-b from-[#ff8c42] to-[#ff6b1a] px-5 py-3 text-sm font-semibold text-white shadow-[0px_12px_20px_-10px_rgba(255,107,26,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            신청하기
          </button>
        </form>
      </div>
    </div>
  );
}

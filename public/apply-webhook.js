(() => {
  const WEBHOOK_URL =
    "https://webhook-processor-production-bfe2.up.railway.app/webhook/a8729524-5a79-42f8-99c4-c2e49e28b3fe";
  const LOG_PREFIX = "[apply-webhook]";
  const TIMEOUT_MS = 10000;
  const ALERT_TITLE = "결쌤 사주·심리 상담연구소";
  const ALERT_SUBTITLE = "2026 병오년 신년운세 해석본";
  const ALERT_STYLE_ID = "apply-webhook-alert-style";

  let alertElements = null;
  let alertResolver = null;

  const log = (...args) => {
    if (typeof console !== "undefined" && console.debug) {
      console.debug(LOG_PREFIX, ...args);
    }
  };

  const maskPhone = (phone) => {
    if (!phone) {
      return "n/a";
    }
    const last4 = phone.slice(-4);
    return `***${last4}`;
  };

  const getButtonText = (button) => {
    if (!button) {
      return "";
    }
    if (button.tagName === "INPUT") {
      return button.value || "";
    }
    return button.textContent || "";
  };

  const setButtonText = (button, text) => {
    if (!button) {
      return;
    }
    if (button.tagName === "INPUT") {
      button.value = text;
      return;
    }
    button.textContent = text;
  };

  const ensureAlertElements = () => {
    if (!document.getElementById(ALERT_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = ALERT_STYLE_ID;
      style.textContent = `
.apply-alert-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:9999;padding:16px;}
.apply-alert-overlay.is-open{opacity:1;pointer-events:auto;}
.apply-alert-dialog{background:#fff;border-radius:18px;max-width:520px;width:100%;padding:22px 24px;box-shadow:0 20px 50px rgba(0,0,0,0.2);border:1px solid rgba(0,0,0,0.06);}
.apply-alert-title{font-size:20px;font-weight:700;color:#222;margin:0 0 6px;}
.apply-alert-subtitle{font-size:16px;font-weight:600;color:#6a7282;margin:0 0 16px;}
.apply-alert-message{font-size:17px;line-height:1.7;color:#444;margin:0;white-space:pre-line;}
.apply-alert-actions{display:flex;justify-content:flex-end;margin-top:20px;}
.apply-alert-button{border:none;background:#2f5aa8;color:#fff;font-weight:700;border-radius:999px;padding:10px 22px;font-size:14px;cursor:pointer;box-shadow:0 6px 12px rgba(47,90,168,0.2);}
@media (max-width:480px){.apply-alert-title{font-size:18px}.apply-alert-subtitle{font-size:14px}.apply-alert-message{font-size:16px}}
      `;
      document.head.appendChild(style);
    }

    if (alertElements) {
      return alertElements;
    }

    const overlay = document.createElement("div");
    overlay.className = "apply-alert-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const dialog = document.createElement("div");
    dialog.className = "apply-alert-dialog";

    const title = document.createElement("p");
    title.className = "apply-alert-title";
    title.textContent = ALERT_TITLE;

    const subtitle = document.createElement("p");
    subtitle.className = "apply-alert-subtitle";
    subtitle.textContent = ALERT_SUBTITLE;

    const message = document.createElement("p");
    message.className = "apply-alert-message";

    const actions = document.createElement("div");
    actions.className = "apply-alert-actions";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "apply-alert-button";
    button.textContent = "확인";

    actions.appendChild(button);
    dialog.appendChild(title);
    dialog.appendChild(subtitle);
    dialog.appendChild(message);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const close = () => {
      overlay.classList.remove("is-open");
      if (alertResolver) {
        alertResolver();
        alertResolver = null;
      }
    };

    button.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    alertElements = { overlay, message };
    return alertElements;
  };

  const showAlert = (message) => {
    const { overlay, message: messageNode } = ensureAlertElements();
    messageNode.textContent = message;
    overlay.classList.add("is-open");

    if (alertResolver) {
      alertResolver();
      alertResolver = null;
    }

    return new Promise((resolve) => {
      alertResolver = resolve;
    });
  };

  const findByRoles = () => {
    return {
      nameInput: document.querySelector('[data-role="apply-name"]'),
      phoneInput: document.querySelector('[data-role="apply-phone"]'),
      submitButton: document.querySelector('[data-role="apply-submit"]'),
    };
  };

  const findByIds = () => {
    return {
      nameInput: document.querySelector("#name"),
      phoneInput: document.querySelector("#phone"),
      submitButton: document.querySelector("#applyBtn"),
    };
  };

  const findByForm = () => {
    const forms = Array.from(document.querySelectorAll("form"));
    for (const form of forms) {
      const nameInput = form.querySelector(
        'input[type="text"], input[name*="name" i], input[autocomplete="name"]'
      );
      const phoneInput = form.querySelector('input[type="tel"]');
      const submitButton = Array.from(
        form.querySelectorAll('button, input[type="button"], input[type="submit"]')
      ).find((button) => {
        const label = button.tagName === "INPUT" ? button.value : button.textContent;
        return label && label.trim() === "신청하기";
      });

      if (nameInput && phoneInput && submitButton) {
        return { nameInput, phoneInput, submitButton };
      }
    }
    return { nameInput: null, phoneInput: null, submitButton: null };
  };

  const findElements = () => {
    const byRole = findByRoles();
    if (byRole.nameInput && byRole.phoneInput && byRole.submitButton) {
      return byRole;
    }

    const byId = findByIds();
    if (byId.nameInput && byId.phoneInput && byId.submitButton) {
      return byId;
    }

    return findByForm();
  };

  const closeModal = () => {
    if (typeof window.closeApplyModal === "function") {
      try {
        window.closeApplyModal();
        return true;
      } catch (error) {
        log("closeApplyModal error", error);
      }
    }

    const modalRoot = document.querySelector('[data-role="apply-modal"]');
    if (modalRoot) {
      modalRoot.classList.add("hidden");
      return true;
    }

    const closeButton = document.querySelector('[data-role="apply-close"]');
    if (closeButton) {
      closeButton.click();
      return true;
    }

    const closeByText = Array.from(document.querySelectorAll("button, [role='button']")).find(
      (button) => (button.textContent || "").trim() === "닫기"
    );
    if (closeByText) {
      closeByText.click();
      return true;
    }

    return false;
  };

  const bindSubmit = () => {
    if (document.body.dataset.applyWebhookBound === "true") {
      return;
    }
    document.body.dataset.applyWebhookBound = "true";

    let isSubmitting = false;

    document.addEventListener("click", async (event) => {
      const { nameInput, phoneInput, submitButton } = findElements();
      if (!nameInput || !phoneInput || !submitButton) {
        return;
      }

      if (event.target !== submitButton && !submitButton.contains(event.target)) {
        return;
      }

      event.preventDefault();
      if (isSubmitting) {
        return;
      }

      const nameValue = (nameInput.value || "").trim();
      if (!nameValue) {
        await showAlert("이름을 입력해주세요.");
        return;
      }

      const phoneDigits = (phoneInput.value || "").trim().replace(/[^0-9]/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        await showAlert("휴대폰 번호를 올바르게 입력해주세요.");
        return;
      }

      const payload = {
        name: nameValue,
        phone: phoneDigits,
        source: "apply_modal",
        ts: new Date().toISOString(),
      };

      const originalText = getButtonText(submitButton);
      isSubmitting = true;
      submitButton.disabled = true;
      setButtonText(submitButton, "전송중...");

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

      log("submit", { nameLength: nameValue.length, phone: maskPhone(phoneDigits) });

      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        await showAlert("신청완료 되었습니다.");
        nameInput.value = "";
        phoneInput.value = "";
        closeModal();
        log("success");
      } catch (error) {
        log("submit failed", error);
        await showAlert("전송에 실패했어요. 잠시 후 다시 시도해주세요.");
      } finally {
        window.clearTimeout(timeoutId);
        submitButton.disabled = false;
        setButtonText(submitButton, originalText);
        isSubmitting = false;
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSubmit);
  } else {
    bindSubmit();
  }
})();

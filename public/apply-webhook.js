(() => {
  const WEBHOOK_URL =
    "https://webhook-processor-production-bfe2.up.railway.app/webhook/a9db0219-47c4-4b70-a0ea-8f54c8763c29";
  const LOG_PREFIX = "[apply-webhook]";
  const TIMEOUT_MS = 10000;

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
        alert("이름을 입력해주세요.");
        return;
      }

      const phoneDigits = (phoneInput.value || "").trim().replace(/[^0-9]/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert("휴대폰 번호를 올바르게 입력해주세요.");
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

        alert("신청이 완료되었습니다!");
        nameInput.value = "";
        phoneInput.value = "";
        closeModal();
        log("success");
      } catch (error) {
        log("submit failed", error);
        alert("전송에 실패했어요. 잠시 후 다시 시도해주세요.");
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

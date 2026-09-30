import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslation } from "../lib/i18n";

type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

const postTrackingEvent = (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
    method: "POST",
    headers: {
      version: "2021-07-28",
    },
    body,
  }).catch(() => {}); // Fire-and-forget — don't block form UX
};

export function LeadFormCard() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const phoneValid = phone ? isValidPhoneNumber(phone) : false;
  const phoneError = phoneTouched && phone && !phoneValid;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    if (!firstName || !lastName || !phone || !businessDescription || !phoneValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const trackingPayload = {
        type: "external form_submission",
        timestamp: Date.now(),
        formId: "automation-plan-lead-form",
        formData: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
        },
        formLabels: {
          first_name: "First name",
          last_name: "Last name",
          phone: "Phone number",
        },
        url: window.location.href,
        title: document.title,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        trackingId: "tk_1956aed40cc141ecb44651a9d1b22cc9",
        locationId: "U8YD29LV0u4ujqWJ5xI6",
        projectId: "1790685669090253980",
        sessionId: crypto.randomUUID(),
        properties: {
          deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
          source: "ai_studio",
          projectId: "1790685669090253980",
          formName: "Free Automation Plan Lead Form",
          tag: "lead - automation plan",
          language: "fr",
        },
      };

      postTrackingEvent(trackingPayload, {
        customFields: {
          CA4LMLtXkBUtHyjyNzfQ: {
            value: businessDescription.trim(),
            label: "Business Description",
          },
        },
      });

      // Brief realistic delay for smooth UX transition
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative z-20 w-full lg:w-[520px] rounded-[24px] md:rounded-[28px] p-6 sm:p-8 md:p-[40px] border border-[#CDEEF3] transition-all"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 20px 45px -15px rgba(0, 22, 53, 0.16)",
      }}
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6 md:py-10 animate-fade-in">
          {/* 72px navy circle with light blue checkmark */}
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 shadow-md"
            style={{ backgroundColor: "#001635" }}
          >
            <Check className="w-9 h-9" style={{ color: "#86BBFF" }} strokeWidth={3} />
          </div>

          <h2
            className="text-[24px] sm:text-[26px] text-center font-semibold leading-tight tracking-[-0.02em] mb-3"
            style={{ fontFamily: "var(--font-unbounded)", color: "#001635" }}
          >
            {t("thanks_title")}
          </h2>

          <p
            className="text-[15px] sm:text-[16px] leading-relaxed max-w-[360px]"
            style={{ fontFamily: "var(--font-dmsans)", color: "#33425E" }}
          >
            {t("thanks_desc")}
          </p>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFirstName("");
              setLastName("");
              setPhone("");
              setBusinessDescription("");
              setPhoneTouched(false);
            }}
            className="mt-6 text-xs text-[#0A5FD8] hover:underline cursor-pointer"
          >
            ← Envoyer une autre demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <h2
              className="text-[22px] sm:text-[26px] font-semibold leading-tight tracking-[-0.02em] mb-1.5 text-center"
              style={{ fontFamily: "var(--font-unbounded)", color: "#001635" }}
            >
              {t("form_title")}
            </h2>
            {/* Desktop subtitle vs mobile subtitle */}
            <p
              className="hidden sm:block text-[15px] sm:text-[16px] leading-normal"
              style={{ fontFamily: "var(--font-dmsans)", color: "#33425E" }}
            >
              {t("form_subtitle_desktop")}
            </p>
            <p
              className="sm:hidden text-[14px] leading-normal"
              style={{ fontFamily: "var(--font-dmsans)", color: "#33425E" }}
            >
              {t("form_subtitle_mobile")}
            </p>
          </div>

          {/* First name & Last name: side-by-side on desktop (sm+), stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-[14px] font-semibold"
                style={{ fontFamily: "var(--font-dmsans)", color: "#001635" }}
              >
                {t("label_firstname")}
                <span className="text-[#0A5FD8]" aria-hidden="true">
                  {" "}
                  *
                </span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder={t("placeholder_firstname")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="vmedia-input w-full h-[52px] rounded-[12px] border-[1.5px] border-[#BFE3EC] bg-[#F4FEFF] px-4 text-[16px] text-[#001635] placeholder:text-[#4A5872]/60 outline-hidden transition-all duration-200 focus:border-[#127AF7] focus:bg-white focus:ring-[3px] focus:ring-[#127AF7]/20"
                style={{ fontFamily: "var(--font-dmsans)" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-[14px] font-semibold"
                style={{ fontFamily: "var(--font-dmsans)", color: "#001635" }}
              >
                {t("label_lastname")}
                <span className="text-[#0A5FD8]" aria-hidden="true">
                  {" "}
                  *
                </span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder={t("placeholder_lastname")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="vmedia-input w-full h-[52px] rounded-[12px] border-[1.5px] border-[#BFE3EC] bg-[#F4FEFF] px-4 text-[16px] text-[#001635] placeholder:text-[#4A5872]/60 outline-hidden transition-all duration-200 focus:border-[#127AF7] focus:bg-white focus:ring-[3px] focus:ring-[#127AF7]/20"
                style={{ fontFamily: "var(--font-dmsans)" }}
              />
            </div>
          </div>

          {/* Phone number with country code selector */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-[14px] font-semibold"
              style={{ fontFamily: "var(--font-dmsans)", color: "#001635" }}
            >
              {t("label_phone")}
              <span className="text-[#0A5FD8]" aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <PhoneInput
              international
              defaultCountry="CI"
              limitMaxLength
              value={phone}
              onChange={(val) => setPhone(val ?? "")}
              onBlur={() => setPhoneTouched(true)}
              placeholder={t("placeholder_phone")}
              className={`vmedia-phone w-full h-[52px] rounded-[12px] border-[1.5px] bg-[#F4FEFF] text-[16px] text-[#001635] outline-hidden transition-all duration-200 focus-within:border-[#127AF7] focus-within:bg-white focus-within:ring-[3px] focus-within:ring-[#127AF7]/20 ${
                phoneError ? "border-[#d64545] focus-within:border-[#d64545]" : "border-[#BFE3EC]"
              }`}
              style={{ fontFamily: "var(--font-dmsans)" }}
              numberInputProps={{ id: "phone", name: "phone", required: true, maxLength: 20 }}
            />
            {phoneError && (
              <span className="text-[12px] text-[#d64545] mt-0.5">
                Numéro invalide pour ce pays. Vérifiez l'indicatif et le numéro.
              </span>
            )}
          </div>

          {/* Business description */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="businessDescription"
              className="text-[14px] font-semibold"
              style={{ fontFamily: "var(--font-dmsans)", color: "#001635" }}
            >
              {t("label_business")}
              <span className="text-[#0A5FD8]" aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              required
              rows={3}
              placeholder={t("placeholder_business")}
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="vmedia-input w-full rounded-[12px] border-[1.5px] border-[#BFE3EC] bg-[#F4FEFF] p-4 text-[16px] leading-relaxed text-[#001635] placeholder:text-[#4A5872]/60 outline-hidden transition-all duration-200 resize-none focus:border-[#127AF7] focus:bg-white focus:ring-[3px] focus:ring-[#127AF7]/20 min-h-[96px] sm:min-h-[88px]"
              style={{ fontFamily: "var(--font-dmsans)" }}
            />
          </div>

          {/* Submit button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[56px] sm:h-[58px] rounded-[14px] bg-[#0A5FD8] hover:bg-[#084fb5] active:bg-[#074299] text-white font-bold text-[17px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-dmsans)" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>{t("btn_submitting")}</span>
                </>
              ) : (
                <>
                  <span>{t("btn_submit")}</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </>
              )}
            </button>

            <p
              className="text-center text-[13px] leading-normal mt-3"
              style={{ fontFamily: "var(--font-dmsans)", color: "#4A5872" }}
            >
              {t("privacy_note")}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone, Clock } from "lucide-react";
import {
  VMediaLogo,
  ZigzagDoodle,
  BracketDoodle,
  ChevronDoodle,
  BurstDoodle,
  WaveDoodle,
  DraggableDoodle,
} from "../components/VMediaAssets";
import { LeadFormCard } from "../components/LeadFormCard";
import { InteractiveBubbles } from "../components/InteractiveBubbles";
import { LanguageProvider, useTranslation } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VMedia Digital; Sites web & tunnels clés en main" },
      {
        name: "description",
        content:
          "VMedia Digital conçoit et développe votre site web et vos tunnels de vente pour transformer vos visiteurs en clients. Appelez le +225 77 83 23 17.",
      },
      {
        property: "og:title",
        content: "VMedia Digital; Sites web & tunnels clés en main",
      },
      {
        property: "og:description",
        content:
          "VMedia Digital conçoit et développe votre site web et vos tunnels de vente pour transformer vos visiteurs en clients.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1790685669090253980/attachments/c43a5027-8f7d-4e08-b992-3fb1aed74fc3.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://vibe.filesafe.space/1790685669090253980/attachments/c43a5027-8f7d-4e08-b992-3fb1aed74fc3.png",
      },
    ],
  }),
  component: IndexWrapper,
});

function IndexWrapper() {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
}

function IndexContent() {
  const { t } = useTranslation();

  const checkmarkItems = [
    { key: "check_website", text: t("check_website") },
    { key: "check_funnels", text: t("check_funnels") },
    { key: "check_landing", text: t("check_landing") },
    { key: "check_design", text: t("check_design") },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden selection:bg-[#86BBFF]/40 selection:text-[#001635] flex flex-col justify-between"
      style={{
        backgroundColor: "#EDF8FC", // Soft, refined Ice tone that lets the bright blue ribbon logo pop with high contrast
      }}
    >
      {/* Interactive Bubbles appearing and drifting on mouse cursor movement and touch */}
      <InteractiveBubbles />

      {/* Interactive Draggable Background Doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Zigzag doodle top-center/left on desktop */}
        <div className="hidden lg:block absolute top-12 left-[38%] pointer-events-auto">
          <DraggableDoodle label="Déplacer le zigzag">
            <ZigzagDoodle className="opacity-85 drop-shadow-xs" />
          </DraggableDoodle>
        </div>

        {/* Small Zigzag doodle for mobile top-right matching the user's reference image */}
        <div className="lg:hidden absolute top-6 right-5 pointer-events-auto">
          <DraggableDoodle label="Déplacer le zigzag">
            <ZigzagDoodle className="opacity-95 w-[68px] h-auto" />
          </DraggableDoodle>
        </div>

        {/* Dashed bracket shape on right edge */}
        <div className="hidden lg:block absolute right-6 xl:right-12 top-[35%] pointer-events-auto">
          <DraggableDoodle label="Déplacer l'accolade">
            <BracketDoodle className="opacity-85 drop-shadow-xs" />
          </DraggableDoodle>
        </div>

        {/* Chevron doodle on far left edge (both desktop & mobile matching image) */}
        <div className="hidden lg:block absolute left-6 xl:left-12 bottom-36 pointer-events-auto">
          <DraggableDoodle label="Déplacer le chevron">
            <ChevronDoodle className="opacity-85 drop-shadow-xs" />
          </DraggableDoodle>
        </div>
        <div className="lg:hidden absolute -left-1 bottom-16 pointer-events-auto">
          <DraggableDoodle label="Déplacer le chevron">
            <ChevronDoodle className="opacity-80 w-[28px] h-auto" />
          </DraggableDoodle>
        </div>

        {/* Burst spark doodle near the bottom */}
        <div className="hidden lg:block absolute left-[30%] bottom-16 pointer-events-auto">
          <DraggableDoodle label="Déplacer l'étincelle">
            <BurstDoodle className="opacity-80 drop-shadow-xs" />
          </DraggableDoodle>
        </div>

        {/* Extra decorative wave doodle top-right desktop */}
        <div className="hidden xl:block absolute right-1/4 top-14 pointer-events-auto">
          <DraggableDoodle label="Déplacer la vague">
            <WaveDoodle className="opacity-75 drop-shadow-xs" />
          </DraggableDoodle>
        </div>
      </div>

      {/* TOP BAR */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[96px] h-20 sm:h-24 flex items-center justify-between">
        {/* Left: VMedia Digital logo with provided graphic */}
        <div className="flex items-center">
          <VMediaLogo className="h-14 sm:h-16 lg:h-18" />
        </div>

        {/* Right side: Eyebrow text only (French) */}
        <div
          className="hidden md:block text-[11px] lg:text-[12px] uppercase font-normal select-none tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-michroma)",
            color: "#33425E",
          }}
        >
          {t("nav_eyebrow")}
        </div>
      </header>

      {/* HERO BODY */}
      <main className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[96px] py-4 sm:py-6 lg:py-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[80px] items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div
              className="text-[11px] sm:text-[13px] uppercase font-normal tracking-[0.28em] sm:tracking-[0.3em] mb-3 sm:mb-4 select-none"
              style={{
                fontFamily: "var(--font-michroma)",
                color: "#0A5FD8",
              }}
            >
              {t("hero_eyebrow")}
            </div>

            {/* Headline H1 */}
            <h1
              className="text-[32px] sm:text-[44px] lg:text-[54px] xl:text-[58px] font-semibold leading-[1.1] sm:leading-[1.08] lg:leading-[1.06] tracking-[-0.02em] mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-unbounded)",
                color: "#001635",
              }}
            >
              {t("hero_title_part1")}
              <span style={{ color: "#0A5FD8" }}>{t("hero_title_accent")}</span>
            </h1>

            {/* Subheadline Desktop vs Mobile */}
            <p
              className="hidden sm:block text-[18px] lg:text-[20px] leading-[1.55] max-w-[540px] mb-8"
              style={{
                fontFamily: "var(--font-dmsans)",
                color: "#33425E",
              }}
            >
              {t("hero_subtitle_desktop")}
            </p>
            <p
              className="sm:hidden text-[17px] leading-[1.5] mb-6"
              style={{
                fontFamily: "var(--font-dmsans)",
                color: "#33425E",
              }}
            >
              {t("hero_subtitle_mobile")}
            </p>

            {/* Interactive hint on desktop */}
            <div className="hidden lg:flex items-center gap-2 mb-6 text-xs text-[#0A5FD8]/80 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#127AF7] animate-ping" />
              <span>{t("doodle_hint")}</span>
            </div>

            {/* On mobile: Form card is placed right after headline/subheadline */}
            <div className="w-full lg:hidden mb-6">
              <LeadFormCard />
            </div>

            {/* Desktop: 2x2 grid of checkmark items */}
            <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-5 max-w-[540px] pt-1">
              {checkmarkItems.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div
                    className="w-[28px] h-[28px] rounded-full shrink-0 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: "#001635" }}
                  >
                    <Check className="w-4 h-4" style={{ color: "#86BBFF" }} strokeWidth={3} />
                  </div>
                  <span
                    className="text-[16px] font-semibold tracking-tight"
                    style={{
                      fontFamily: "var(--font-dmsans)",
                      color: "#001635",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: Row of navy pill tags below the form card, matching uploaded layout */}
            <div className="lg:hidden flex flex-wrap items-center justify-start gap-2.5 pt-2 pb-6 w-full">
              <div className="flex items-center gap-2">
                <span
                  className="px-4 py-2 rounded-full text-[14px] font-semibold shadow-xs"
                  style={{
                    backgroundColor: "#001635",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-dmsans)",
                  }}
                >
                  Sites web
                </span>
                <span
                  className="px-4 py-2 rounded-full text-[14px] font-semibold shadow-xs"
                  style={{
                    backgroundColor: "#001635",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-dmsans)",
                  }}
                >
                  Tunnels
                </span>
              </div>
              <div className="w-full flex items-center">
                <span
                  className="px-4 py-2 rounded-full text-[14px] font-semibold shadow-xs"
                  style={{
                    backgroundColor: "#001635",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-dmsans)",
                  }}
                >
                  Design sur mesure
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Desktop Form Card */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <LeadFormCard />
          </div>
        </div>
      </main>

      {/* PROFESSIONAL FOOTER with Contact */}
      <footer className="relative z-20 w-full border-t border-[#CDEEF3]/80 bg-white/60 backdrop-blur-sm mt-8">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[96px] py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Left: Brand logo image & rights */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left text-[#4A5872]">
            <img
              src="https://vibe.filesafe.space/1790685669090253980/attachments/c43a5027-8f7d-4e08-b992-3fb1aed74fc3.png"
              alt="VMedia Digital"
              className="h-14 sm:h-16 lg:h-18 w-auto rounded-md object-contain shadow-2xs"
            />
            <span className="hidden sm:inline text-[#BFE3EC]">|</span>
            <span>{t("footer_tagline")}</span>
            <span className="hidden sm:inline text-[#BFE3EC]">|</span>
            <span>{t("footer_rights")}</span>
          </div>

          {/* Right: Phone (whatsapp/sms) & Hours */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#33425E]">
            <a
              href="tel:+22577832317"
              className="flex items-center gap-1.5 font-semibold text-[#0A5FD8] hover:text-[#084fb5] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+225 77 83 23 17</span>
            </a>

            <div className="flex items-center gap-1.5 text-[#4A5872]">
              <Clock className="w-3.5 h-3.5 text-[#0A5FD8]" />
              <span>{t("footer_hours")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

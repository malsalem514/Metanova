"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/FadeIn";

const regions = [
  { id: "monteregie", en: "Montérégie", fr: "Montérégie", zh: "蒙特雷吉" },
  { id: "montreal", en: "Montréal", fr: "Montréal", zh: "蒙特利尔" },
  { id: "laval", en: "Laval", fr: "Laval", zh: "拉瓦尔" },
  { id: "south-shore", en: "South Shore", fr: "Rive-Sud", zh: "南岸" },
  { id: "greater-mtl", en: "Greater Montreal", fr: "Grand Montréal", zh: "大蒙特利尔" },
  { id: "quebec", en: "All of Quebec", fr: "Tout le Québec", zh: "全魁北克" },
];

// Quebec province outline from Wikimedia Commons (CC-BY-SA, by TUBS)
// Original viewBox: 0 0 1084 920 — cropped to Quebec region: 630 430 350 400
const QUEBEC_PATH =
  "M942,647l-0.5,3.5l-10,1.5l-6.5,3l-12.5,0.5l-5-3.5l-10-1.5l16.5-6l5,1l4-2l8,1l8,0.5L942,647z M736,457.5l-1.5,1.5l2.5,3h-4.5l-1-2.5l-4.5,1v2.5l-13-0.5l-2.5-5l0.5-2.5l-1-1.5l-1.5,1l-9.5-4l-3-3.5l-12-3.5l-9.5,11l-3-2l-3,1.5l-20.5-0.5l-5,6.5l1.5,6l7,9l1.5,9l-2,6l1.5,3l2-1.5l5,11l5.5,7.5l-2.5,3l-0.5,9.5l-2,7l-4,2.5l3,5.5l4,4l5.5,1.5l10.5,6.5l10.5,11L695,572l1.5,15.5l-2.5,9L683.5,615l-5,3.5L674,624l-8,1.5l1,2.5l3.5,1l3.5,5l3.5,2.5l2.5,2.5l-0.5,3l3,9l4.5,6l2.5,5l2.5,8l2.5,0.5l2,5.5l-3,6l-0.5,4.5l4,4v3.5l-2.5,1.5l-1.5-4l-4.5-2.5l-2.5,3l0.68,3.13L687,700l-0.28,0.05L708,779l3.5,8.5l8.5,8.5l9.5,5.5L746,801l7.5,5l6.5-1l3,5.5l6.06,1.31l2.851-0.84l3.59-1.97l14-10l7.5,0.5l1,4.5l1.89,7.55l0.11,0.391l0.53-0.82L845,795l-0.5-7h3.5l2-3l2,2l0.5-4.5l3-0.5l-3-2.5l3.5-6.5l-1-2l1-1.5l-0.5-3.5l-3-4.5l1.5-4.5l-1.5-6l3.07-16.12l1.27-3.18l-0.77-0.311L863,708.5l27.29-7.54l-0.55-1.37l1.76-0.59l6-5l2,1h5.5l5-8l3.5-6l-0.5-8l-4-4.5l-11.5-1l-8.5,2L870.5,688l-11.3,15.75L854,711l-4,8.5l-5.5,24l-2.5,5l-6,5.5l-4,7l-3,1l-8.5,8l-8.5,15l-2,11l-4,5l-3.18,2.27l-0.021-0.1l4.7-5.17l1.5-8l0.5-5.5l5-8.5l5.39-6.51l6.61-7.99l10-11l3-5.5l-0.5-6.5l3-3l4-24.5l5.5-15l5-10.5l7-3.5v-13l3-9l9-7.5L906,637h1.5l19-9.5h3.5l8-6.5l11.5-7l0.5-1.5V607l2-7l2-6.5l-1.5-2v-2l2-2l-0.5-4l7-5l-0.5-2.5l2-5l6-2l-1.51-0.47l0.01-0.03l1.29,0.21L961,559l-77,47l-2-3.5l-6.5-4.5l-0.5-3l4.5-4.5l-3.5-2l-2.5,5v3.5l2.5,4l1.5,7l3.5,9l-3.5,4l-4.5-4l-4.5,2l-7-5.5L861,616l-6.5,1.5L851,615l-1.5,2.5l-2-2.5l1.5-2.5l-2.5-3l0.5-2l-5.5-6L839,605l2.5,4l-1,2l-8-3l-2.5-3l4-2.5l-5.5-8l-2,1l-10-7.5l0.5-4.5l-4.5-3l5-3.5l2-4l-6-4l-3-4l12,4.5l-0.5-5l-6-6.5l8.5,3.5l10,1l7-7l3,2.5l4-3l3.5,1.5l5-2l-4.5-4.5l3-1.5l-3-6.5l-1-5l-4.5,1l2-2l-6.5-8l1.5-2.5l-5,1.5l-4-6.5h2.5l-6.5-5l2.5-4.5l-3.5-3.5l1.5-3.5l-3-1.5l1-3.5l-3-4.5l-4.5-1l-8-3.5l-1-3l3-4l-4-5l4.5-4.5l-28.85-23.92l-0.15-0.08l0.5,15l1.5,4l2,17.5h-4l1,7.5l-8,11L775,500l-3-0.5l-7-4l-8.5,6.5l-2.5,4l-1.5-0.5L750,501l3,1l1-1.5l-1-2l3-3l-4-5l-2,1.5l-1.5-2.5v-2l-4-8.5h-1l-0.5-2l1-0.5l-4.5-6L737,465l1-1.5l1.5-3L736,457.5z M961,675l-0.5-2.5l-5,7l1,6.5l2,0.5l2.5-1.5l-2.5-3l-0.5-3L961,675z";

// City positions in the 1084x920 coordinate system
const MONTREAL = { x: 690, y: 700 };
const QUEBEC_CITY = { x: 760, y: 645 };
const BROSSARD = { x: 692, y: 710 };
const TROIS_RIVIERES = { x: 730, y: 670 };
const SHERBROOKE = { x: 720, y: 740 };
const GATINEAU = { x: 655, y: 660 };

function QuebecMap() {
  return (
    <svg
      viewBox="620 420 370 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[320px] md:max-w-[520px]"
      aria-hidden="true"
    >
      <defs>
        {/* Glow filter for the province */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Quebec province outline — real geographic shape */}
      <motion.path
        d={QUEBEC_PATH}
        stroke="#0A5592"
        strokeWidth="1.5"
        fill="rgba(10, 85, 146, 0.06)"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Province fill fade-in (separate layer for smooth appearance) */}
      <motion.path
        d={QUEBEC_PATH}
        stroke="none"
        fill="rgba(10, 85, 146, 0.08)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* Greater Montreal region highlight */}
      <motion.ellipse
        cx={MONTREAL.x}
        cy={MONTREAL.y}
        rx="45"
        ry="35"
        fill="rgba(10, 85, 146, 0.15)"
        stroke="#0A5592"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 2.2 }}
      />

      {/* Coverage lines from Brossard to other cities */}
      {[QUEBEC_CITY, TROIS_RIVIERES, SHERBROOKE, GATINEAU].map((city, i) => (
        <motion.line
          key={i}
          x1={BROSSARD.x}
          y1={BROSSARD.y}
          x2={city.x}
          y2={city.y}
          stroke="#0A5592"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5 + i * 0.15, duration: 0.6 }}
        />
      ))}

      {/* City dots and labels */}
      {([
        { ...MONTREAL, label: "Montréal", size: 3.5, fontSize: 9, fontWeight: 500, opacity: 1, delay: 2.3 },
        { ...QUEBEC_CITY, label: "Québec", size: 2.5, fontSize: 8, fontWeight: 400, opacity: 0.6, delay: 2.6 },
        { ...TROIS_RIVIERES, label: "Trois-Rivières", size: 2, fontSize: 7, fontWeight: 400, opacity: 0.5, delay: 2.7 },
        { ...SHERBROOKE, label: "Sherbrooke", size: 2, fontSize: 7, fontWeight: 400, opacity: 0.5, delay: 2.8 },
        { ...GATINEAU, label: "Gatineau", size: 2, fontSize: 7, fontWeight: 400, opacity: 0.5, delay: 2.9 },
      ] as const).map((city) => (
        <motion.g
          key={city.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: city.delay, duration: 0.4 }}
        >
          <circle cx={city.x} cy={city.y} r={city.size} fill="#0A5592" opacity={city.opacity} />
          <text
            x={city.x + city.size + 4}
            y={city.y + 3}
            fill="#F5F0E6"
            fontSize={city.fontSize}
            fontWeight={city.fontWeight}
            fontFamily="system-ui"
            opacity={city.opacity}
          >
            {city.label}
          </text>
        </motion.g>
      ))}

      {/* Brossard HQ — special pin with pulse */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.4, duration: 0.4, type: "spring", stiffness: 300 }}
      >
        <motion.circle
          cx={BROSSARD.x}
          cy={BROSSARD.y}
          r="8"
          fill="none"
          stroke="#0A5592"
          strokeWidth="1"
          animate={{ r: [8, 18], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx={BROSSARD.x} cy={BROSSARD.y} r="4" fill="#0A5592" />
        <circle cx={BROSSARD.x} cy={BROSSARD.y} r="2" fill="#F5F0E6" />
        <text
          x={BROSSARD.x + 8}
          y={BROSSARD.y + 3}
          fill="#0A5592"
          fontSize="7"
          fontWeight="600"
          fontFamily="system-ui"
          letterSpacing="0.08em"
        >
          BROSSARD (HQ)
        </text>
      </motion.g>
    </svg>
  );
}

export function ServiceAreas() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <section className="bg-[#1B2E37] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: text content */}
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F5F0E6]/40">
                {isFr ? "Où nous intervenons" : isZh ? "我们的服务范围" : "Where We Work"}
              </p>
              <h2 className="mt-4 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#F5F0E6]">
                {isFr
                  ? "Grand Montréal et tout le Québec"
                  : isZh
                  ? "大蒙特利尔及全魁北克"
                  : "Greater Montreal and All of Quebec"}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#F5F0E6]/60">
                {isFr
                  ? "Basée à Brossard, Metanova dessert l'ensemble du Québec — du Grand Montréal et de la Montérégie jusqu'à Québec et au-delà. Nous accompagnons les projets là où ils se trouvent."
                  : isZh
                  ? "总部位于布罗萨德，Metanova服务于魁北克全境——从大蒙特利尔和蒙特雷吉到魁北克城及更远地区。我们在项目所在地提供支持。"
                  : "Based in Brossard, Metanova serves all of Quebec — from Greater Montreal and the Montérégie to Quebec City and beyond. We support projects wherever they are."}
              </p>

              {/* Region tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {regions.map((region, i) => (
                  <motion.span
                    key={region.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                    className="inline-block rounded-full border border-[#F5F0E6]/15 px-4 py-1.5 text-xs font-medium text-[#F5F0E6]/70 transition-colors duration-200 hover:border-[#0A5592] hover:text-[#0A5592]"
                  >
                    {isFr ? region.fr : isZh ? region.zh : region.en}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: animated Quebec map */}
          <FadeIn delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <QuebecMap />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

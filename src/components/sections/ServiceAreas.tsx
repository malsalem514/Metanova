"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/FadeIn";

const regions = [
  { id: "monteregie", en: "Montérégie", fr: "Montérégie" },
  { id: "montreal", en: "Montréal", fr: "Montréal" },
  { id: "laval", en: "Laval", fr: "Laval" },
  { id: "south-shore", en: "South Shore", fr: "Rive-Sud" },
  { id: "greater-mtl", en: "Greater Montreal", fr: "Grand Montréal" },
  { id: "quebec", en: "All of Quebec", fr: "Tout le Québec" },
];

function QuebecMap() {
  return (
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[500px]"
      aria-hidden="true"
    >
      {/* Quebec province outline — simplified geometric shape */}
      <motion.path
        d="M80 380 L60 340 L40 280 L30 220 L35 160 L50 110 L80 70 L120 40 L170 20 L230 10 L290 15 L340 30 L380 55 L410 90 L435 130 L450 180 L460 240 L455 300 L440 350 L420 380 L380 400 L320 410 L260 415 L200 410 L140 400 Z"
        stroke="#0A5592"
        strokeWidth="1.5"
        fill="rgba(10, 85, 146, 0.08)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* St. Lawrence River */}
      <motion.path
        d="M30 280 Q100 270 160 290 Q220 310 280 295 Q340 280 400 290 Q440 295 460 300"
        stroke="#0A5592"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Greater Montreal region — highlighted area */}
      <motion.ellipse
        cx="180"
        cy="300"
        rx="90"
        ry="60"
        fill="rgba(10, 85, 146, 0.12)"
        stroke="#0A5592"
        strokeWidth="1"
        strokeDasharray="6 3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />

      {/* Montreal label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <text x="165" y="285" fill="#F5F0E6" fontSize="11" fontWeight="500" fontFamily="system-ui">
          Montréal
        </text>
      </motion.g>

      {/* Laval label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <text x="175" y="262" fill="#F5F0E6" fontSize="9" fontWeight="400" fontFamily="system-ui" opacity="0.7">
          Laval
        </text>
      </motion.g>

      {/* South Shore / Montérégie label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        <text x="145" y="335" fill="#F5F0E6" fontSize="9" fontWeight="400" fontFamily="system-ui" opacity="0.7">
          Montérégie
        </text>
      </motion.g>

      {/* Quebec City label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <text x="340" y="240" fill="#F5F0E6" fontSize="10" fontWeight="400" fontFamily="system-ui" opacity="0.5">
          Québec
        </text>
      </motion.g>

      {/* Brossard HQ pin */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.4, type: "spring", stiffness: 300 }}
      >
        {/* Pulse ring */}
        <motion.circle
          cx="185"
          cy="310"
          r="12"
          fill="none"
          stroke="#0A5592"
          strokeWidth="1"
          animate={{
            r: [12, 22],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        {/* Pin dot */}
        <circle cx="185" cy="310" r="5" fill="#0A5592" />
        <circle cx="185" cy="310" r="2.5" fill="#F5F0E6" />

        {/* HQ label */}
        <text x="196" y="314" fill="#0A5592" fontSize="8" fontWeight="600" fontFamily="system-ui" letterSpacing="0.1em">
          BROSSARD (HQ)
        </text>
      </motion.g>

      {/* Coverage lines radiating from HQ to other regions */}
      {[
        { x: 120, y: 250 },  // West
        { x: 300, y: 200 },  // Quebec direction
        { x: 250, y: 350 },  // East
        { x: 100, y: 330 },  // Southwest
        { x: 350, y: 300 },  // Far east
      ].map((target, i) => (
        <motion.line
          key={i}
          x1="185"
          y1="310"
          x2={target.x}
          y2={target.y}
          stroke="#0A5592"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 + i * 0.1, duration: 0.6 }}
        />
      ))}
    </svg>
  );
}

export function ServiceAreas() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section className="bg-[#1B2E37] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: text content */}
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F5F0E6]/40">
                {isFr ? "Où nous intervenons" : "Where We Work"}
              </p>
              <h2 className="mt-4 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#F5F0E6]">
                {isFr
                  ? "Grand Montréal et tout le Québec"
                  : "Greater Montreal and All of Quebec"}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#F5F0E6]/60">
                {isFr
                  ? "Basée à Brossard, Metanova dessert l'ensemble du Québec — du Grand Montréal et de la Montérégie jusqu'à Québec et au-delà. Nous accompagnons les projets là où ils se trouvent."
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
                    {isFr ? region.fr : region.en}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: animated Quebec map */}
          <FadeIn delay={0.2} direction="right">
            <div className="flex justify-center lg:justify-end">
              <QuebecMap />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

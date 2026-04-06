"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";

export function EditorialSection() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left column - large text */}
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
                {isFr ? "Notre histoire" : isZh ? "我们的故事" : "Our Story"}
              </p>
              <p className="mt-6 text-[18px] leading-[1.6] text-[#121212]/80">
                {isFr
                  ? "Metanova a \u00e9t\u00e9 fond\u00e9e par deux fr\u00e8res \u2014 un ing\u00e9nieur en structure et un d\u00e9veloppeur immobilier \u2014 qui ont vu l\u2019opportunit\u00e9 de cr\u00e9er une firme qui comprend v\u00e9ritablement les deux c\u00f4t\u00e9s de l\u2019\u00e9quation de la construction. L\u00e0 o\u00f9 les firmes d\u2019ing\u00e9nierie traditionnelles se concentrent uniquement sur la conformit\u00e9 technique, et les promoteurs manquent souvent d\u2019expertise structurale approfondie, Metanova fait le pont entre les deux mondes. Le r\u00e9sultat : des conceptions plus intelligentes, des approbations plus rapides et des projets qui font sens financi\u00e8rement et structuralement d\u00e8s le d\u00e9part."
                  : isZh
                  ? "Metanova由两兄弟共同创立 — 一位结构工程师与一位房地产开发商 — 他们看到了创立一家真正理解建筑工程两端的公司的机会。传统工程公司往往只关注技术规范合规，而开发商又常常缺乏深厚的结构专业知识，Metanova正是两个世界之间的桥梁。其成果是：更智慧的设计、更快速的审批，以及从第一天起在财务和结构上均行之有效的项目。"
                  : "Metanova was founded by two brothers \u2014 a structural engineer and a real estate developer \u2014 who saw an opportunity to create a firm that truly understands both sides of the construction equation. Where traditional engineering firms focus purely on technical compliance, and developers often lack deep structural expertise, Metanova bridges both worlds. The result is smarter designs, faster approvals, and projects that make financial and structural sense from day one."}
              </p>
              <p className="mt-6 text-[18px] leading-[1.6] text-[#121212]/80">
                {isFr
                  ? "Bas\u00e9e \u00e0 Brossard, au Qu\u00e9bec, Metanova dessert des clients \u00e0 travers le Grand Montr\u00e9al et au-del\u00e0, avec un portefeuille croissant couvrant les secteurs r\u00e9sidentiel, h\u00f4telier et commercial."
                  : isZh
                  ? "总部位于布罗萨德，魁北克，Metanova服务于大蒙特利尔及周边地区的客户，项目组合不断扩展，涵盖住宅、酒店和商业领域。"
                  : "Based in Brossard, Quebec, Metanova serves clients across the Greater Montreal area and beyond, with a growing portfolio spanning residential, hospitality, and commercial sectors."}
              </p>
            </div>
          </FadeIn>

          {/* Right column - founders portrait */}
          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/metanova-assets/people/founders-portrait-new.jpg"
                alt={isFr ? "Fondateurs de Metanova" : isZh ? "Metanova创始人" : "Metanova founders"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

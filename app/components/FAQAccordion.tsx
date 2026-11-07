"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { FAQSection as FAQSectionData } from "@/app/data/types";

export function FAQAccordion({ items }: { items: FAQSectionData["items"] }) {
  const prefix = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      buttons.current[next]?.focus();
    }
  }

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {items.map((item, index) => {
        const open = item.id === openId;
        const id = `${prefix}-${item.id}`;
        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-300 overflow-hidden ${
              open
                ? "border border-slate-200/90 shadow-[0_8px_24px_rgba(10,37,64,0.08)] bg-white"
                : "border border-[#e8eff5] bg-white shadow-[0_2px_8px_rgba(10,37,64,0.03)] hover:border-slate-300 hover:shadow-card"
            }`}
          >
            <h3>
              <button
                type="button"
                id={`${id}-button`}
                aria-expanded={open}
                aria-controls={`${id}-answer`}
                ref={(button) => {
                  buttons.current[index] = button;
                }}
                onKeyDown={(event) => keyboard(event, index)}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base transition-colors duration-200 group ${
                  open
                    ? "bg-[#0a2540] text-white"
                    : "bg-white text-heading hover:text-navy"
                }`}
              >
                <span className="pr-4">{item.question}</span>
                <span
                  className={`w-7 h-7 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${
                    open
                      ? "bg-gold text-navy shadow-sm"
                      : "bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] group-hover:bg-[#e2e8f0]"
                  }`}
                >
                  {open ? (
                    <Minus size={15} strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    <Plus size={15} strokeWidth={2.5} aria-hidden="true" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={`${id}-answer`}
              role="region"
              aria-labelledby={`${id}-button`}
              className={`accordion-grid ${open ? "is-open" : ""}`}
            >
              <div className="accordion-inner bg-white">
                <div className="p-4 sm:p-5 text-muted text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  <p className="m-0">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderHeadingTitle(title: string, highlight?: string) {
  if (
    title === "Explore our Academic" &&
    highlight === "Facilities & Departments"
  ) {
    return (
      <>
        Explore our <span className="text-gold">Academic</span>
        <br className="hidden sm:inline" />{" "}
        Facilities & <span className="text-gold">Departments</span>
      </>
    );
  }

  return (
    <>
      {title}
      {highlight && (
        <>
          {" "}
          <span className="text-gold">{highlight}</span>
        </>
      )}
    </>
  );
}

export function FAQSectionView({ data }: { data: FAQSectionData }) {
  return (
    <section id="faq" className="section-padding py-8 bg-surface scroll-mt-20 md:scroll-mt-24">
      <div className="container grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-6 lg:gap-8 xl:gap-10 items-start">
        <div className="reveal reveal-right flex flex-col">
          {data.heading.eyebrow && (
            <div className="flex items-center gap-3 text-navy uppercase text-xs font-bold tracking-[1.8px] mb-2 sm:mb-2.5">
              <span className="w-8 h-[2.5px] bg-gold rounded-full shrink-0" />
              <span>{data.heading.eyebrow}</span>
            </div>
          )}

          <h2 className="text-heading font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-[1.2] tracking-tight">
            {renderHeadingTitle(data.heading.title, data.heading.highlight)}
          </h2>

          {data.heading.description && (
            <p className="mt-2.5 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
              {data.heading.description}
            </p>
          )}

          <div className="relative mt-5 sm:mt-6 flex justify-center sm:justify-start">
            <div className="relative shrink-0 select-none pointer-events-none">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                width={365}
                height={423}
                priority
                className="w-[250px] sm:w-[280px] md:w-[310px] h-auto object-contain block"
              />
            </div>
          </div>
        </div>

        <div className="reveal reveal-left delay-150 w-full pt-2 lg:pt-0">
          <FAQAccordion items={data.items} />
        </div>
      </div>
    </section>
  );
}

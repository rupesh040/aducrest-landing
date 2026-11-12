"use client";

import { Clock3, GraduationCap, ArrowRight } from "lucide-react";
import { content } from "@/app/data";
import { SectionHeading, Photo } from "./Primitives";
import type { Course, PopularCoursesSection } from "@/app/data/types";

export function PopularCourses({ data }: { data: PopularCoursesSection }) {
  const allCourses = content.collections.courses;

  const handleApplyCourse = (course: Course) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aducrest:selectCourse", {
          detail: { courseId: course.id },
        }),
      );
      const applySection = document.getElementById("apply");
      if (applySection) {
        const headerOffset = 80;
        const top = applySection.offsetTop - headerOffset;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
        window.history.pushState(null, "", "#apply");
      }
    }
  };

  return (
    <section
      id="courses"
      className="section-padding py-10 md:py-14 bg-[#f1faff] scroll-mt-20 md:scroll-mt-24"
    >
      <div className="container">
        <div className="reveal text-center max-w-2xl mx-auto mb-8">
          <SectionHeading heading={data.heading} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCourses.map((course) => (
            <article
              key={course.id}
              className="lift-card flex flex-col h-full bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#e2eaf0]"
            >
              <div className="relative aspect-[1.8] overflow-hidden bg-slate-100">
                <Photo
                  asset={course.image}
                  className="w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
                  sizes="(max-width: 600px) 100vw, (max-width: 1023px) 45vw, 25vw"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-heading leading-snug mb-2 min-h-[44px] line-clamp-2">
                  {course.title}
                </h3>

                <div className="pt-2 pb-3 space-y-1.5 text-xs text-muted border-b border-[#eef3f7]">
                  <p className="flex items-center gap-2 m-0">
                    <Clock3 size={15} className="text-gold shrink-0" />
                    <span>Duration: {course.duration}</span>
                  </p>
                  <p className="flex items-center gap-2 m-0">
                    <GraduationCap size={15} className="text-gold shrink-0" />
                    <span className="truncate">Eligibility: {course.eligibility}</span>
                  </p>
                </div>

                <div className="mt-auto pt-3">
                  <button
                    type="button"
                    onClick={() => handleApplyCourse(course)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-[#e09b00] text-navy font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
                    aria-label={`Apply for ${course.title}`}
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/AboutSection";
import { PopularCourses } from "@/app/components/PopularCourses";
import { AdmissionCTA } from "@/app/components/AdmissionCTA";
import { ApplicationProcess } from "@/app/components/ApplicationProcess";
import { FacultyPreview } from "@/app/components/FacultyPreview";
import { Testimonials } from "@/app/components/Testimonials";
import { FAQSectionView } from "@/app/components/FAQAccordion";
import { ApplicationSection } from "@/app/components/ApplicationSection";
import type {
  HeroSection,
  AboutSection,
  PopularCoursesSection,
  AdmissionCTASection,
  ApplicationProcessSection,
  FacultyPreviewSection,
  TestimonialsSection,
  FAQSection as FAQSectionData,
  ApplicationSection as ApplicationSectionData,
} from "@/app/data/types";

export const metadata = pageMetadata("home");

export default function Page() {
  return (
    <>
      <Hero data={section<HeroSection>("hero", "EducationHero1")} />
      <About data={section<AboutSection>("about", "EducationAbout1")} />
      <PopularCourses
        data={section<PopularCoursesSection>(
          "popular-courses",
          "EducationPopularCourses1",
        )}
      />
      <AdmissionCTA
        data={section<AdmissionCTASection>(
          "admission-cta",
          "EducationAdmissionCTA1",
        )}
      />
      <FacultyPreview
        data={section<FacultyPreviewSection>(
          "faculty-preview",
          "EducationFaculty1",
        )}
      />
      <Testimonials
        data={section<TestimonialsSection>(
          "testimonials",
          "EducationTestimonials1",
        )}
      />
      <FAQSectionView
        data={section<FAQSectionData>("faq", "EducationFAQ1")}
      />
      <ApplicationProcess
        data={section<ApplicationProcessSection>(
          "application-process",
          "EducationApplicationProcess1",
        )}
      />
      <ApplicationSection
        data={section<ApplicationSectionData>(
          "application",
          "EducationApplicationForm1",
        )}
      />
    </>
  );
}

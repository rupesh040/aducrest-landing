import { Photo } from "./Primitives";
import type { Faculty } from "@/app/data/types";

export function FacultyCard({ faculty }: { faculty: Faculty }) {
  return (
    <article className="lift-card p-3 sm:p-4 text-center flex flex-col items-center bg-white rounded-xl shadow-card group">
      <div className="w-full block aspect-[1.1] rounded-lg overflow-hidden mb-3.5 relative">
        <Photo
          asset={faculty.image}
          className="w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
          sizes="(max-width: 600px) 90vw, (max-width: 1023px) 45vw, 25vw"
        />
      </div>
      <div className="w-full">
        <h3 className="text-base sm:text-[17px] font-bold text-heading leading-snug mb-1">
          {faculty.name}
        </h3>
        <span className="tiny-rule group-hover:w-[65px] transition-all duration-300" />
        <p className="text-xs sm:text-[13px] text-muted m-0 leading-normal">
          {faculty.role}
        </p>
        <span className="text-[11px] text-[#788da7] block mt-1">
          {faculty.department}
        </span>
      </div>
    </article>
  );
}

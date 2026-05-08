import {
    AcademicCapIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
  import { getClassName } from "../../utils/classFormatters";
  
  function ClassroomWorkspaceSummary({ classroom, studentCount, gradeCount }) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <UsersIcon className="h-6 w-6" />
            </div>
  
            <div>
              <p className="text-sm text-base-content/60">Öğrenci</p>
              <p className="text-2xl font-bold">{studentCount}</p>
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
              <ClipboardDocumentListIcon className="h-6 w-6" />
            </div>
  
            <div>
              <p className="text-sm text-base-content/60">Not Kaydı</p>
              <p className="text-2xl font-bold">{gradeCount}</p>
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent">
              <AcademicCapIcon className="h-6 w-6" />
            </div>
  
            <div>
              <p className="text-sm text-base-content/60">Sınıf</p>
              <p className="text-2xl font-bold">{getClassName(classroom)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ClassroomWorkspaceSummary;
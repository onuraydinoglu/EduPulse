import {
    AcademicCapIcon,
    ClipboardDocumentListIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
  import StatCard from "../../../../components/ui/StatCard";
  import { getClassName } from "../../utils/classFormatters";
  
  function ClassroomWorkspaceSummary({ classroom, studentCount, gradeCount }) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Öğrenci"
          value={studentCount}
          description="Bu sınıfa kayıtlı öğrenci sayısı"
          icon={UsersIcon}
          color="primary"
        />
  
        <StatCard
          title="Not Kaydı"
          value={gradeCount}
          description="Bu sınıfa ait sınav notu kaydı"
          icon={ClipboardDocumentListIcon}
          color="warning"
        />
  
        <StatCard
          title="Sınıf"
          value={getClassName(classroom)}
          description="Aktif çalışma alanı"
          icon={AcademicCapIcon}
          color="info"
        />
      </div>
    );
  }
  
  export default ClassroomWorkspaceSummary;
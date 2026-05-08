import {
    AcademicCapIcon,
    UserIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
  import StatCard from "../../../../components/ui/StatCard";
  import {
    getClassName,
    getClassTeacherName,
  } from "../../utils/classFormatters";
  
  function ClassroomWorkspaceSummary({ classroom, teachers, studentCount }) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Sınıf"
          value={getClassName(classroom)}
          description="Aktif çalışma alanı"
          icon={AcademicCapIcon}
          color="info"
        />

        <StatCard
          title="Öğretmeni"
          value={getClassTeacherName(classroom, teachers) || "-"}
          description="Sınıf öğretmeni"
          icon={UserIcon}
          color="warning"
        />

        <StatCard
          title="Öğrenci"
          value={studentCount}
          description="Bu sınıfa kayıtlı öğrenci sayısı"
          icon={UsersIcon}
          color="primary"
        />
      </div>
    );
  }
  
  export default ClassroomWorkspaceSummary;

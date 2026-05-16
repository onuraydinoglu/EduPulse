import { useState } from "react";
import StudentTable from "../../../students/components/StudentTable";
import { getClassroomLabel } from "../../../students/utils/studentFormatters";

function ClassroomWorkspaceTabs({
  activeTab,
  students,
  grades,
  classroom,
  classrooms = [],
  onEditStudent,
  onDeleteStudent,
}) {
  const [studentSearch, setStudentSearch] = useState("");
  const [studentClassroomFilter, setStudentClassroomFilter] = useState("all");

  const classroomId = classroom?.id || classroom?.Id;

  const profileBackPath = classroomId
    ? `/dashboard/classes/${classroomId}`
    : "/dashboard/classes";

  const classroomOptions = classrooms.map((item) => ({
    value: item.id || item.Id,
    label: getClassroomLabel(item),
  }));

  return (
    <div className="space-y-4">
      {activeTab === "students" && (
        <StudentTable
          students={students}
          search={studentSearch}
          setSearch={setStudentSearch}
          classroomFilter={studentClassroomFilter}
          setClassroomFilter={setStudentClassroomFilter}
          classroomOptions={classroomOptions}
          showStatusFilter={false}
          backPath={profileBackPath}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
        />
      )}

      {activeTab === "grades" && (
        <ClassroomGradesTable grades={grades} students={students} />
      )}
    </div>
  );
}

export default ClassroomWorkspaceTabs;
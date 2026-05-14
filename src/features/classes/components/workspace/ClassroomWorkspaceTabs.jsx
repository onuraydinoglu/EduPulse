import { useState } from "react";
import StudentTable from "../../../students/components/StudentTable";

function ClassroomWorkspaceTabs({
  activeTab,
  students,
  grades,
  classroom,
  onEditStudent,
  onDeleteStudent,
}) {
  const [studentSearch, setStudentSearch] = useState("");

  const [studentClassroomFilter, setStudentClassroomFilter] = useState("all");

  const classroomId = classroom?.id || classroom?.Id;

  const profileBackPath = classroomId
    ? `/dashboard/classes/${classroomId}`
    : "/dashboard/classes";

  const classroomOptions = classroom
    ? [
      {
        value: classroomId,

        label:
          classroom.name ||
          classroom.className ||
          classroom.ClassName ||
          `${classroom.grade || classroom.Grade || ""}-${classroom.section || classroom.Section || ""
          }`,
      },
    ]
    : [];

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
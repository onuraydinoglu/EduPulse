const getId = (item) => item?.id || item?.Id;
const getFirstName = (item) => item?.firstName || item?.FirstName || "";
const getLastName = (item) => item?.lastName || item?.LastName || "";
const getStudentNumber = (item) =>
  item?.studentNumber || item?.StudentNumber || "-";

const getAverage = (grade) =>
  grade?.average ??
  grade?.Average ??
  grade?.generalAverage ??
  grade?.GeneralAverage ??
  "-";

const getLessonName = (grade) =>
  grade?.lessonName ||
  grade?.LessonName ||
  grade?.lesson?.name ||
  grade?.Lesson?.Name ||
  "-";

function ClassroomWorkspaceTabs({
  activeTab,
  setActiveTab,
  students,
  grades,
}) {
  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="border-b border-base-300/60 p-4">
        <div className="tabs tabs-boxed w-fit bg-base-200/70">
          <button
            type="button"
            className={`tab ${activeTab === "students" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Öğrenciler
          </button>

          <button
            type="button"
            className={`tab ${activeTab === "grades" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("grades")}
          >
            Sınav Notları
          </button>
        </div>
      </div>

      {activeTab === "students" && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-xs uppercase text-base-content/50">
                <th>Öğrenci</th>
                <th>Okul No</th>
                <th>Durum</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={getId(student)} className="hover">
                  <td>
                    <div className="font-semibold">
                      {getFirstName(student)} {getLastName(student)}
                    </div>
                  </td>

                  <td>{getStudentNumber(student)}</td>

                  <td>
                    <span
                      className={`badge ${
                        student?.isActive ?? student?.IsActive
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {student?.isActive ?? student?.IsActive
                        ? "Aktif"
                        : "Pasif"}
                    </span>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="py-10 text-center text-base-content/50"
                  >
                    Bu sınıfa bağlı öğrenci bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "grades" && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-xs uppercase text-base-content/50">
                <th>Ders</th>
                <th>Öğrenci</th>
                <th>Ortalama</th>
              </tr>
            </thead>

            <tbody>
              {grades.map((grade) => {
                const studentId = grade?.studentId || grade?.StudentId;
                const student = students.find((item) => getId(item) === studentId);

                return (
                  <tr key={getId(grade)} className="hover">
                    <td className="font-semibold">{getLessonName(grade)}</td>

                    <td>
                      {student
                        ? `${getFirstName(student)} ${getLastName(student)}`
                        : grade?.studentFullName || grade?.StudentFullName || "-"}
                    </td>

                    <td>{getAverage(grade)}</td>
                  </tr>
                );
              })}

              {grades.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="py-10 text-center text-base-content/50"
                  >
                    Bu sınıfa ait not kaydı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClassroomWorkspaceTabs;
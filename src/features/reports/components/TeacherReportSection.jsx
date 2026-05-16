import { AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import { teacherReportStatusOptions } from "../constants/reportConstants";
import TeacherStudentReportTable from "./TeacherStudentReportTable";

function TeacherReportSection({
    teacherClass,
    students,
    studentSearch,
    setStudentSearch,
    studentStatus,
    setStudentStatus,
    onPrepareParentReport,
}) {
    return (
        <section className="radius-card overflow-hidden border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <AcademicCapIcon className="h-5 w-5 text-blue-600" />

                        <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                            {teacherClass.className} Sınıfı Öğrenci Raporu
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Sorumlu olduğunuz sınıftaki öğrenci performansları
                    </p>
                </div>

                <Button variant="outline" size="sm" onClick={onPrepareParentReport}>
                    {teacherClass.className} Veli Raporu Hazırla
                </Button>
            </div>

            <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                    <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        placeholder="Öğrenci, kulüp, okul no veya veli ara..."
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                </div>

                <select
                    value={studentStatus}
                    onChange={(e) => setStudentStatus(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-56"
                >
                    {teacherReportStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <TeacherStudentReportTable
                students={students}
                className={teacherClass.className}
            />
        </section>
    );
}

export default TeacherReportSection;
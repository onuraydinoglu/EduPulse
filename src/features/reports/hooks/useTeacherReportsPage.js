import { useMemo, useState } from "react";

import {
    classes,
    clubs,
    students as mockStudents,
    teachers,
} from "../../../data/mockData";
import { teacherClass } from "../constants/reportConstants";
import { getTeacherReportStats } from "../constants/reportStats";
import {
    buildTeacherStudentReports,
    filterTeacherStudents,
    getTeacherClassStats,
} from "../utils/reportFormatters";

export function useTeacherReportsPage() {
    const [studentSearch, setStudentSearch] = useState("");
    const [studentStatus, setStudentStatus] = useState("all");

    const students = useMemo(() => {
        return buildTeacherStudentReports({
            students: mockStudents,
            classes,
            teachers,
            clubs,
            teacherClass,
        });
    }, []);

    const teacherClassStats = useMemo(() => {
        return getTeacherClassStats(students);
    }, [students]);

    const stats = useMemo(() => {
        return getTeacherReportStats(teacherClass, teacherClassStats);
    }, [teacherClassStats]);

    const filteredStudents = useMemo(() => {
        return filterTeacherStudents({
            students,
            search: studentSearch,
            status: studentStatus,
        });
    }, [students, studentSearch, studentStatus]);

    const handleExportTeacherReport = () => {
        // Daha sonra PDF export bağlanacaksa buraya alınır.
    };

    const handlePrepareParentReport = () => {
        // Daha sonra veli raporu akışı bağlanacaksa buraya alınır.
    };

    return {
        teacherClass,
        studentSearch,
        setStudentSearch,
        studentStatus,
        setStudentStatus,
        filteredStudents,
        stats,
        handleExportTeacherReport,
        handlePrepareParentReport,
    };
}
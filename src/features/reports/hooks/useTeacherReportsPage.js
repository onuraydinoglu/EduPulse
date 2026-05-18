import { useEffect, useMemo, useState } from "react";

import { getTeacherReportStats } from "../constants/reportStats";
import { teacherReportService } from "../services/teacherReportService";
import {
    buildTeacherClass,
    buildTeacherStudentReports,
    filterTeacherStudents,
    getTeacherClassStats,
    getTeacherReportErrorMessage,
} from "../utils/teacherReportFormatters";

const emptyTeacherClass = {
    id: "",
    className: "-",
};

export function useTeacherReportsPage() {
    const [teacherClass, setTeacherClass] = useState(emptyTeacherClass);
    const [students, setStudents] = useState([]);
    const [studentSearch, setStudentSearch] = useState("");
    const [studentStatus, setStudentStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: "success",
            });
        }, 2500);
    };

    const loadTeacherReports = async () => {
        setIsLoading(true);

        try {
            const result = await teacherReportService.getTeacherReportData();

            const nextTeacherClass = buildTeacherClass({
                teachers: result.teachers,
                classes: result.classes,
                currentUser: result.currentUser,
            });

            const nextStudents = buildTeacherStudentReports({
                students: result.students,
                classes: result.classes,
                clubs: result.clubs,
                clubMembers: result.clubMembers,
                studentGrades: result.studentGrades,
                trialExams: result.trialExams,
                teacherClass: nextTeacherClass,
            });

            setTeacherClass(nextTeacherClass);
            setStudents(nextStudents);
        } catch (error) {
            console.error(error);

            showToast(
                getTeacherReportErrorMessage(
                    error,
                    "Öğretmen raporları yüklenirken hata oluştu."
                ),
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTeacherReports();
    }, []);

    const teacherClassStats = useMemo(() => {
        return getTeacherClassStats(students);
    }, [students]);

    const stats = useMemo(() => {
        return getTeacherReportStats(teacherClass, teacherClassStats);
    }, [teacherClass, teacherClassStats]);

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
        isLoading,
        toast,
        handleExportTeacherReport,
        handlePrepareParentReport,
    };
}
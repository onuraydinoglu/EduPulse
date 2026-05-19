import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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

const getValue = (item, camelKey, pascalKey, fallback = "") => {
  return item?.[camelKey] ?? item?.[pascalKey] ?? fallback;
};

const getClassName = (classItem) => {
  const directName =
    getValue(classItem, "className", "ClassName") ||
    getValue(classItem, "name", "Name");

  if (directName) return directName;

  const grade = getValue(classItem, "grade", "Grade");
  const section = getValue(classItem, "section", "Section");

  if (grade && section) return `${grade}-${section}`;

  return "-";
};

function buildClassReportFromClassId({ classId, classes = [], locationState }) {
  if (!classId) return null;

  const selectedClassReport = locationState?.selectedClassReport;

  if (selectedClassReport?.id === classId) {
    return {
      id: selectedClassReport.id,
      className: selectedClassReport.className || "-",
    };
  }

  const classItem = classes.find((item) => {
    const itemId = getValue(item, "id", "Id");
    return itemId === classId;
  });

  if (!classItem) return null;

  return {
    id: classId,
    className: getClassName(classItem),
  };
}

export function useTeacherReportsPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const classId = searchParams.get("classId");

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

      const selectedClass = buildClassReportFromClassId({
        classId,
        classes: result.classes,
        locationState: location.state,
      });

      const nextTeacherClass =
        selectedClass ||
        buildTeacherClass({
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
  }, [classId]);

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
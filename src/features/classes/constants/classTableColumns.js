import {
    AcademicCapIcon,
    BuildingLibraryIcon,
    UserGroupIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
  import {
    getClassName,
    getClassStudentCount,
    getClassTeacherName,
  } from "../utils/classFormatters";
  
  export const classPdfColumns = [
    {
      header: "#",
      accessor: "index",
    },
    {
      header: "Sınıf",
      accessor: getClassName,
    },
    {
      header: "Sınıf Öğretmeni",
      accessor: getClassTeacherName,
    },
    {
      header: "Öğrenci Sayısı",
      accessor: getClassStudentCount,
    },
  ];
  
  export const getClassStats = (classes = []) => {
    const totalStudentCount = classes.reduce((total, classItem) => {
      return total + Number(getClassStudentCount(classItem) || 0);
    }, 0);
  
    const gradeCount = new Set(
      classes
        .map((classItem) => classItem.grade || classItem.Grade)
        .filter(Boolean),
    ).size;
  
    const assignedTeacherCount = classes.filter((classItem) => {
      return classItem.teacherId || classItem.TeacherId;
    }).length;
  
    return [
      {
        title: "Toplam Sınıf",
        value: classes.length,
        description: "Sistemde kayıtlı sınıf",
        icon: BuildingLibraryIcon,
        color: "primary",
      },
      {
        title: "Öğrenci Sayısı",
        value: totalStudentCount,
        description: "Sınıflara bağlı toplam öğrenci",
        icon: UserGroupIcon,
        color: "success",
      },
      {
        title: "Sınıf Seviyesi",
        value: gradeCount,
        description: "Kullanılan seviye sayısı",
        icon: AcademicCapIcon,
        color: "warning",
      },
      {
        title: "Danışman Atanan",
        value: assignedTeacherCount,
        description: "Öğretmen atanmış sınıf",
        icon: UsersIcon,
        color: "info",
      },
    ];
  };
  
  export const classTableHeaders = [
    "Sınıf",
    "Sınıf Öğretmeni",
    "Öğrenci Sayısı",
    "İşlemler",
  ];
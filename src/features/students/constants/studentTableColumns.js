import {
    AcademicCapIcon,
    CheckCircleIcon,
    IdentificationIcon,
    UserGroupIcon,
    XCircleIcon,
  } from "@heroicons/react/24/outline";
  
  import {
    getStudentClassroomName,
    getStudentFullName,
    getStudentStatusLabel,
  } from "../utils/studentFormatters";
  
  export const studentPdfColumns = [
    {
      header: "#",
      accessor: "index",
    },
    {
      header: "Öğrenci",
      accessor: getStudentFullName,
    },
    {
      header: "Öğrenci No",
      accessor: (student) => student.studentNumber || student.StudentNumber || "-",
    },
    {
      header: "Sınıf",
      accessor: getStudentClassroomName,
    },
    {
      header: "E-Posta",
      accessor: (student) => student.email || student.Email || "-",
    },
    {
      header: "Telefon",
      accessor: (student) => student.phoneNumber || student.PhoneNumber || "-",
    },
    {
      header: "Durum",
      accessor: getStudentStatusLabel,
    },
  ];
  
  export const getStudentStats = (students = []) => {
    const activeCount = students.filter((student) => {
      return student.isActive !== false && student.IsActive !== false;
    }).length;
  
    const passiveCount = students.length - activeCount;
  
    const classroomCount = new Set(
      students
        .map((student) => {
          return (
            student.classroomId ||
            student.ClassroomId ||
            student.classroomName ||
            student.ClassroomName ||
            student.className ||
            student.ClassName
          );
        })
        .filter(Boolean),
    ).size;
  
    return [
      {
        title: "Toplam Öğrenci",
        value: students.length,
        description: "Sistemde kayıtlı öğrenci",
        icon: UserGroupIcon,
        color: "primary",
      },
      {
        title: "Aktif Öğrenci",
        value: activeCount,
        description: "Aktif durumda olan öğrenci",
        icon: CheckCircleIcon,
        color: "success",
      },
      {
        title: "Pasif Öğrenci",
        value: passiveCount,
        description: "Pasif durumda olan öğrenci",
        icon: XCircleIcon,
        color: "error",
      },
      {
        title: "Sınıf Sayısı",
        value: classroomCount,
        description: "Öğrenci bulunan sınıf",
        icon: AcademicCapIcon,
        color: "warning",
      },
    ];
  };
  
  export const studentTableHeaders = [
    "Öğrenci",
    "Öğrenci No",
    "Sınıf",
    "E-Posta",
    "Telefon",
    "Durum",
    "İşlemler",
  ];
  
  export const studentHeaderIcon = IdentificationIcon;
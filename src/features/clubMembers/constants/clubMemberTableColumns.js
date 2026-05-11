import {
    getClassroomName,
    getStudentFullName,
    getStudentNumber,
} from "../utils/clubMemberFormatters";

export const clubMemberPdfColumns = [
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
        accessor: getStudentNumber,
    },
    {
        header: "Sınıf",
        accessor: getClassroomName,
    },
];
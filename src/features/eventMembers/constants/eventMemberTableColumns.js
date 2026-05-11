import {
    getEventMemberClassroomName,
    getEventMemberPaidAmount,
    getEventMemberPaymentStatusText,
    getEventMemberStudentFullName,
    getEventMemberStudentNumber,
} from "../utils/eventMemberFormatters";

export const eventMemberPdfColumns = [
    {
        header: "#",
        accessor: "index",
    },
    {
        header: "Öğrenci",
        accessor: getEventMemberStudentFullName,
    },
    {
        header: "Öğrenci No",
        accessor: getEventMemberStudentNumber,
    },
    {
        header: "Sınıf",
        accessor: getEventMemberClassroomName,
    },
    {
        header: "Ödeme Durumu",
        accessor: getEventMemberPaymentStatusText,
    },
    {
        header: "Ödenen Tutar",
        accessor: (member) => `${getEventMemberPaidAmount(member)} ₺`,
    },
];
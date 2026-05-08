import {
    CheckCircleIcon,
    IdentificationIcon,
    KeyIcon,
    UserGroupIcon,
    XCircleIcon,
  } from "@heroicons/react/24/outline";
  
  import {
    getOfficerEmail,
    getOfficerFullName,
    getOfficerPhoneNumber,
    getOfficerStatusLabel,
  } from "../utils/officerFormatters";
  
  export const officerPdfColumns = [
    {
      header: "#",
      accessor: "index",
    },
    {
      header: "Memur",
      accessor: getOfficerFullName,
    },
    {
      header: "E-Posta",
      accessor: getOfficerEmail,
    },
    {
      header: "Telefon",
      accessor: getOfficerPhoneNumber,
    },
    {
      header: "Durum",
      accessor: getOfficerStatusLabel,
    },
  ];
  
  export const getOfficerStats = (officers = [], temporaryPasswords = {}) => {
    const activeCount = officers.filter((officer) => {
      return officer.isActive !== false && officer.IsActive !== false;
    }).length;
  
    const passiveCount = officers.length - activeCount;
  
    const temporaryPasswordCount = Object.keys(temporaryPasswords).length;
  
    return [
      {
        title: "Toplam Memur",
        value: officers.length,
        description: "Sistemde kayıtlı memur",
        icon: UserGroupIcon,
        color: "primary",
      },
      {
        title: "Aktif Memur",
        value: activeCount,
        description: "Aktif görevde olan memur",
        icon: CheckCircleIcon,
        color: "success",
      },
      {
        title: "Pasif Memur",
        value: passiveCount,
        description: "Pasif durumda olan memur",
        icon: XCircleIcon,
        color: "error",
      },
      {
        title: "Geçici Şifre",
        value: temporaryPasswordCount,
        description: "Bu oturumda üretilen şifre",
        icon: KeyIcon,
        color: "warning",
      },
    ];
  };
  
  export const officerTableHeaders = [
    "Memur",
    "E-Posta",
    "Telefon",
    "Geçici Şifre",
    "Durum",
    "İşlemler",
  ];
  
  export const officerHeaderIcon = IdentificationIcon;
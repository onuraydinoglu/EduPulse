import {
    BookOpenIcon,
    ClipboardDocumentListIcon,
  } from "@heroicons/react/24/outline";
  
  export const getLessonStats = (lessons = []) => {
    return [
      {
        title: "Toplam Ders",
        value: lessons.length,
        description: "Okulunuza kayıtlı toplam ders sayısı",
        icon: BookOpenIcon,
        color: "primary",
      },
      {
        title: "Listelenen Ders",
        value: lessons.length,
        description: "Filtre öncesi toplam kayıt sayısı",
        icon: ClipboardDocumentListIcon,
        color: "info",
      },
    ];
  };
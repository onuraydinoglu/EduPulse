export const schools = [
  {
    id: 1,
    name: "Atatürk Anadolu Lisesi",
    city: "Samsun",
    principal: "Ahmet Yılmaz",
    studentCount: 420,
    status: "Aktif",
  },
  {
    id: 2,
    name: "Cumhuriyet Fen Lisesi",
    city: "Ankara",
    principal: "Zeynep Kaya",
    studentCount: 360,
    status: "Aktif",
  },
  {
    id: 3,
    name: "19 Mayıs Lisesi",
    city: "İstanbul",
    principal: "Mehmet Demir",
    studentCount: 510,
    status: "Pasif",
  },
];

export const teachers = [
  {
    id: 1,
    fullName: "Ayşe Demir",
    branch: "Matematik",
    school: "Atatürk Anadolu Lisesi",
    classCount: 4,
    status: "Aktif",
  },
  {
    id: 2,
    fullName: "Murat Çelik",
    branch: "Türk Dili ve Edebiyatı",
    school: "Cumhuriyet Fen Lisesi",
    classCount: 3,
    status: "Aktif",
  },
  {
    id: 3,
    fullName: "Elif Şahin",
    branch: "Fizik",
    school: "19 Mayıs Lisesi",
    classCount: 5,
    status: "Pasif",
  },
];

export const students = [
  {
    id: 1,
    fullName: "Ali Yıldız",
    school: "Atatürk Anadolu Lisesi",
    className: "9-A",
    average: 84,
    club: "Robotik",
    status: "Aktif",
  },
  {
    id: 2,
    fullName: "Ece Arslan",
    school: "Cumhuriyet Fen Lisesi",
    className: "10-B",
    average: 91,
    club: "Müzik",
    status: "Aktif",
  },
  {
    id: 3,
    fullName: "Kerem Aksoy",
    school: "19 Mayıs Lisesi",
    className: "12-C",
    average: 76,
    club: "Tiyatro",
    status: "Aktif",
  },
];

export const exams = [
  {
    id: 1,
    name: "TYT Deneme Sınavı",
    className: "12. Sınıf",
    date: "15.04.2026",
    average: 72,
  },
  {
    id: 2,
    name: "Matematik Yazılısı",
    className: "10-A",
    date: "18.04.2026",
    average: 81,
  },
  {
    id: 3,
    name: "Fizik Tarama Testi",
    className: "11-B",
    date: "20.04.2026",
    average: 68,
  },
];

export const clubs = [
  {
    id: 1,
    name: "Robotik Kulübü",
    teacher: "Ayşe Demir",
    studentCount: 24,
    status: "Aktif",
  },
  {
    id: 2,
    name: "Tiyatro Kulübü",
    teacher: "Elif Şahin",
    studentCount: 18,
    status: "Aktif",
  },
  {
    id: 3,
    name: "Müzik Kulübü",
    teacher: "Murat Çelik",
    studentCount: 32,
    status: "Aktif",
  },
];

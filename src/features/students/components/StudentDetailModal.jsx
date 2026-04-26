import {
  AcademicCapIcon,
  IdentificationIcon,
  PhoneIcon,
  UserCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";


function StudentDetailModal({ student }) {
  if (!student) return null;

  const infoItems = [
    {
      label: "Okul Numarası",
      value: student.schoolNumber || "-",
      icon: IdentificationIcon,
    },
    {
      label: "Sınıf Öğretmeni",
      value: student.classTeacher || student.teacher || "-",
      icon: AcademicCapIcon,
    },
    {
      label: "Kulüp",
      value: student.club || "-",
      icon: UserGroupIcon,
    },
    {
      label: "Ortalama",
      value: student.average ? `${student.average}` : "-",
      icon: ChartBarIcon,
    },
    {
      label: "Durum",
      value: student.status || "-",
      icon: CheckCircleIcon,
    },
    {
      label: "Öğrenci Telefonu",
      value: student.studentPhone || "-",
      icon: PhoneIcon,
    },
    {
      label: "Veli Ad Soyad",
      value: student.parentName || "-",
      icon: UserCircleIcon,
    },
    {
      label: "Veli Telefonu",
      value: student.parentPhone || "-",
      icon: PhoneIcon,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-sm">
            {student.firstName?.[0]}
            {student.lastName?.[0]}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-950">
              {student.firstName} {student.lastName}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {student.className || "-"} sınıfı öğrencisi
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {infoItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentDetailModal;
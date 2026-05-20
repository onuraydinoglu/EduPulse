import {
    BanknotesIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    ClockIcon,
    InformationCircleIcon,
    MapPinIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/outline";
  import {
    getEventDateText,
    getEventIsActive,
    getEventLocation,
    getEventName,
    getEventPaymentTypeText,
    getEventPriceText,
    getEventResponsibleTeacherName,
    getEventTimeText,
  } from "../utils/eventMemberFormatters";
  
  const getEventDescription = (event) => {
    return (
      event?.description ||
      event?.Description ||
      event?.details ||
      event?.Details ||
      ""
    );
  };
  
  function DetailItem({ icon: Icon, label, value }) {
    return (
      <div className="rounded-2xl border border-base-300/60 bg-base-100/80 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
  
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/45">
          {label}
        </p>
  
        <p className="mt-1 text-sm font-semibold text-base-content">
          {value || "-"}
        </p>
      </div>
    );
  }
  
  function StudentEventDetailCard({ event }) {
    const description = getEventDescription(event);
    const isActive = getEventIsActive(event);
  
    return (
      <div className="rounded-[2rem] border border-base-300/70 bg-base-100 p-5 shadow-sm lg:p-7">
        <div className="mb-6 flex flex-col gap-4 border-b border-base-300/70 pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <CalendarDaysIcon className="h-4 w-4" />
              Etkinlik Detayı
            </div>
  
            <h2 className="text-2xl font-bold text-base-content">
              {getEventName(event)}
            </h2>
  
            <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/55">
              {description ||
                "Bu alanda etkinlik ile ilgili temel bilgileri görüntüleyebilirsiniz."}
            </p>
          </div>
  
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              isActive
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-rose-500/10 text-rose-500"
            }`}
          >
            <CheckCircleIcon className="h-4 w-4" />
            {isActive ? "Aktif Etkinlik" : "Pasif Etkinlik"}
          </div>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailItem
            icon={MapPinIcon}
            label="Etkinlik Yeri"
            value={getEventLocation(event)}
          />
  
          <DetailItem
            icon={CalendarDaysIcon}
            label="Etkinlik Tarihi"
            value={getEventDateText(event)}
          />
  
          <DetailItem
            icon={ClockIcon}
            label="Etkinlik Saati"
            value={getEventTimeText(event)}
          />
  
          <DetailItem
            icon={BanknotesIcon}
            label="Ücret Durumu"
            value={
              getEventPaymentTypeText(event) === "Ücretli"
                ? `${getEventPaymentTypeText(event)} - ${getEventPriceText(event)}`
                : getEventPaymentTypeText(event)
            }
          />
  
          <DetailItem
            icon={UserGroupIcon}
            label="Sorumlu Öğretmenler"
            value={getEventResponsibleTeacherName(event)}
          />
  
          <DetailItem
            icon={InformationCircleIcon}
            label="Katılım Bilgisi"
            value="Etkinlik bilgilerinizi buradan takip edebilirsiniz."
          />
        </div>
  
        <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <InformationCircleIcon className="h-5 w-5" />
            </div>
  
            <div>
              <h3 className="text-sm font-bold text-base-content">
                Öğrenci Bilgilendirmesi
              </h3>
  
              <p className="mt-1 text-sm leading-6 text-base-content/60">
                Bu sayfada yalnızca etkinlik detaylarını görüntüleyebilirsiniz.
                Katılımcı yönetimi, öğrenci ekleme ve ödeme işlemleri okul
                yönetimi tarafından yapılır.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default StudentEventDetailCard;
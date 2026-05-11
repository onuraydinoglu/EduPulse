import {
    getEventDateText,
    getEventLocation,
    getEventName,
    getEventPaymentText,
    getEventResponsibleTeacherNames,
    getEventStatusText,
    getEventTimeText,
} from "../utils/eventFormatters";

export const eventPdfColumns = [
    {
        header: "Etkinlik Adı",
        accessor: (event) => getEventName(event),
    },
    {
        header: "Konum",
        accessor: (event) => getEventLocation(event),
    },
    {
        header: "Tarih",
        accessor: (event) => getEventDateText(event),
    },
    {
        header: "Saat",
        accessor: (event) => getEventTimeText(event),
    },
    {
        header: "Ücret",
        accessor: (event) => getEventPaymentText(event),
    },
    {
        header: "Sorumlu Öğretmenler",
        accessor: (event) => getEventResponsibleTeacherNames(event).join(", ") || "-",
    },
    {
        header: "Durum",
        accessor: (event) => getEventStatusText(event),
    },
];

export const getEventStats = (events = []) => {
    const total = events.length;

    const active = events.filter((event) => {
        return event.isActive !== false && event.IsActive !== false;
    }).length;

    const paid = events.filter((event) => {
        return event.isPaid === true || event.IsPaid === true;
    }).length;

    const free = total - paid;

    return [
        {
            title: "Toplam Etkinlik",
            value: total,
            description: "Sistemde kayıtlı etkinlik",
        },
        {
            title: "Aktif Etkinlik",
            value: active,
            description: "Kullanıma açık etkinlik",
        },
        {
            title: "Ücretli Etkinlik",
            value: paid,
            description: "Katılım ücreti bulunan etkinlik",
        },
        {
            title: "Ücretsiz Etkinlik",
            value: free,
            description: "Ücretsiz katılım etkinliği",
        },
    ];
};
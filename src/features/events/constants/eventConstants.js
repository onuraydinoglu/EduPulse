export const EVENT_MODAL_ID = "event_modal";
export const EVENT_DELETE_MODAL_ID = "event_delete_modal";

export const emptyEventForm = {
    name: "",
    location: "",
    eventDate: "",
    startTime: "",
    isPaid: "false",
    pricePerStudent: "",
    responsibleTeacherIds: [],
    isActive: "true",
};

export const eventStatusOptions = [
    {
        label: "Aktif",
        value: "true",
    },
    {
        label: "Pasif",
        value: "false",
    },
];

export const eventPaymentOptions = [
    {
        label: "Ücretsiz",
        value: "false",
    },
    {
        label: "Ücretli",
        value: "true",
    },
];
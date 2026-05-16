export const getPersonalNoteValue = (
    note,
    camelKey,
    pascalKey,
    fallback = "",
) => {
    return note?.[camelKey] ?? note?.[pascalKey] ?? fallback;
};

export const getPersonalNoteId = (note) => {
    return getPersonalNoteValue(note, "id", "Id");
};

export const getPersonalNoteTitle = (note) => {
    return getPersonalNoteValue(note, "title", "Title", "Başlıksız Not");
};

export const getPersonalNoteContent = (note) => {
    return getPersonalNoteValue(note, "content", "Content");
};

export const getPersonalNoteIsActive = (note) => {
    return note?.isActive ?? note?.IsActive ?? true;
};

export const getPersonalNoteCreatedDate = (note) => {
    return getPersonalNoteValue(note, "createdDate", "CreatedDate", null);
};

export const sortPersonalNotesByCreatedDateDesc = (data) => {
    if (!Array.isArray(data)) return [];

    return [...data].sort((a, b) => {
        const aDate = new Date(getPersonalNoteCreatedDate(a) || 0);
        const bDate = new Date(getPersonalNoteCreatedDate(b) || 0);

        return bDate - aDate;
    });
};
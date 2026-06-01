export const getLessonId = (lesson) => {
    return lesson?.id || lesson?.Id || "";
  };
  
  export const getLessonName = (lesson) => {
    return lesson?.name || lesson?.Name || "İsimsiz Ders";
  };
  
  export const filterLessons = (lessons = [], search = "") => {
    const normalizedSearch = search.toLowerCase().trim();
  
    return lessons.filter((lesson) => {
      const name = getLessonName(lesson).toLowerCase();
  
      return !normalizedSearch || name.includes(normalizedSearch);
    });
  };
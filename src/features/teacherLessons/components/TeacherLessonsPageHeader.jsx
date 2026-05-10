import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

import { teacherLessonHeaderIcon as TeacherLessonHeaderIcon } from "../constants/teacherLessonTableColumns";

function TeacherLessonsPageHeader({ onCreate, onExport }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">
                    Öğretmen Ders Atamaları
                </h1>

                <p className="mt-1 text-sm text-base-content/60">
                    Öğretmenlerin ders ve sınıf atamalarını yönetin.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                <CreateButton icon={TeacherLessonHeaderIcon} onClick={onCreate}>
                    Yeni Atama
                </CreateButton>
            </div>
        </div>
    );
}

export default TeacherLessonsPageHeader;
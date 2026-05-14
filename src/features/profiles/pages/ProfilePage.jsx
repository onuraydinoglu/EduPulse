import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { BookOpenIcon } from "@heroicons/react/24/outline";

import Toast from "../../../components/ui/Toast";

import TeacherLessonAssignModal from "../../teachers/components/TeacherLessonAssignModal";

import OfficerProfileDetails from "../components/OfficerProfileDetails";
import ProfileHeader from "../components/ProfileHeader";
import StudentProfileDetails from "../components/StudentProfileDetails";
import TeacherProfileDetails from "../components/TeacherProfileDetails";

import { useProfilePage } from "../hooks/useProfilePage";
import { useTeacherProfileLessonAssignment } from "../hooks/useTeacherProfileLessonAssignment";

import {
    getBackPathByProfileType,
    getProfileTypeLabel,
} from "../utils/profileFormatters";

const TEACHER_PROFILE_LESSON_ASSIGN_MODAL_ID =
    "teacher_profile_lesson_assign_modal";

function ProfilePage() {
    const { profileType, id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const backPath = location.state?.backPath || getBackPathByProfileType(profileType);

    const {
        profile,
        details,
        loading,
        toast,
        showToast,
        reloadProfile,
    } = useProfilePage(profileType, id);

    const {
        lessons,
        classrooms,
        assignFormData,
        setAssignFormData,
        assignErrors,
        handleOpenAssignLessonModal,
        handleCloseAssignLessonModal,
        handleAssignLessonSubmit,
    } = useTeacherProfileLessonAssignment({
        profileType,
        teacher: profile,
        reloadProfile,
        showToast,
    });

    const handleBack = () => {
        navigate(backPath);
    };

    const renderDetails = () => {
        if (profileType === "student") {
            return <StudentProfileDetails profile={profile} details={details} />;
        }

        if (profileType === "teacher") {
            return <TeacherProfileDetails profile={profile} details={details} />;
        }

        if (profileType === "officer") {
            return <OfficerProfileDetails profile={profile} details={details} />;
        }

        return null;
    };

    const renderHeaderAction = () => {
        if (profileType !== "teacher") return null;

        return (
            <button
                type="button"
                onClick={() =>
                    handleOpenAssignLessonModal(TEACHER_PROFILE_LESSON_ASSIGN_MODAL_ID)
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-content"
            >
                <BookOpenIcon className="h-4 w-4" />
                Ders Ata
            </button>
        );
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {toast.message && <Toast message={toast.message} type={toast.type} />}

                <div className="rounded-3xl border border-base-300 bg-base-100/80 p-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <span className="loading loading-spinner loading-md text-primary" />

                        <div>
                            <h2 className="text-lg font-semibold text-base-content">
                                Profil yükleniyor
                            </h2>

                            <p className="text-sm text-base-content/60">
                                Kullanıcı bilgileri ve ilişkili kayıtlar hazırlanıyor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {

        const profileTypeLabel = getProfileTypeLabel(profileType);

        return (
            <div className="space-y-6">
                {toast.message && <Toast message={toast.message} type={toast.type} />}

                <div className="rounded-3xl border border-base-300 bg-base-100/80 p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-base-content">
                        {profileTypeLabel} profili bulunamadı
                    </h2>

                    <p className="mt-2 text-sm text-base-content/60">
                        Kayıt silinmiş olabilir veya bu profili görüntüleme yetkiniz
                        olmayabilir.
                    </p>

                    <Link to={backPath} className="btn btn-primary btn-sm mt-6 rounded-xl">
                        Listeye dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {toast.message && <Toast message={toast.message} type={toast.type} />}

            <ProfileHeader
                profileType={profileType}
                profile={profile}
                action={renderHeaderAction()}
                onBack={handleBack}
            />

            {renderDetails()}

            {profileType === "teacher" && (
                <TeacherLessonAssignModal
                    modalId={TEACHER_PROFILE_LESSON_ASSIGN_MODAL_ID}
                    teacher={profile}
                    formData={assignFormData}
                    setFormData={setAssignFormData}
                    lessons={lessons}
                    classrooms={classrooms}
                    errors={assignErrors}
                    onClose={() =>
                        handleCloseAssignLessonModal(
                            TEACHER_PROFILE_LESSON_ASSIGN_MODAL_ID
                        )
                    }
                    onSubmit={() =>
                        handleAssignLessonSubmit(TEACHER_PROFILE_LESSON_ASSIGN_MODAL_ID)
                    }
                />
            )}
        </div>
    );
}

export default ProfilePage;
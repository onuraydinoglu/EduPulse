import { Link, useLocation, useParams } from "react-router-dom";

import Toast from "../../../components/ui/Toast";

import ProfileHeader from "../components/ProfileHeader";

import StudentProfileDetails from "../components/StudentProfileDetails";

import TeacherProfileDetails from "../components/TeacherProfileDetails";

import OfficerProfileDetails from "../components/OfficerProfileDetails";
import { useProfilePage } from "../hooks/useProfilePage";

import {
    getBackPathByProfileType,

    getProfileTypeLabel,
} from "../utils/profileFormatters";

function ProfilePage() {
    const { profileType, id } = useParams();

    const location = useLocation();

    const { profile, details, loading, toast } = useProfilePage(profileType, id);

    const fallbackBackPath = getBackPathByProfileType(profileType);

    const backPath = location.state?.backPath || fallbackBackPath;

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
                backPath={backPath}
            />

            {renderDetails()}
        </div>
    );
}

export default ProfilePage;
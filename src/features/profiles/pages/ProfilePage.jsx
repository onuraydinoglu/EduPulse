import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Toast from "../../../components/ui/Toast";
import ProfileHeader from "../components/ProfileHeader";
import StudentProfileDetails from "../components/StudentProfileDetails";
import TeacherProfileDetails from "../components/TeacherProfileDetails";
import OfficerProfileDetails from "../components/OfficerProfileDetails";
import { profileService } from "../services/profileService";
import {
    getBackPathByProfileType,
    getProfileTypeLabel,
} from "../utils/profileFormatters";

function ProfilePage() {
    const { profileType, id } = useParams();

    const [profile, setProfile] = useState(null);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast({ message: "", type: "success" });
        }, 2500);
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);

                const result = await profileService.getProfile(profileType, id);

                setProfile(result.profile);
                setDetails(result.details || {});
            } catch (error) {
                console.error(error);
                showToast("Profil bilgileri yüklenirken hata oluştu.", "error");
            } finally {
                setLoading(false);
            }
        };

        if (profileType && id) {
            getProfile();
        }
    }, [profileType, id]);

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
                <div className="h-40 animate-pulse rounded-3xl bg-base-200" />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="h-28 animate-pulse rounded-3xl bg-base-200" />
                    <div className="h-28 animate-pulse rounded-3xl bg-base-200" />
                    <div className="h-28 animate-pulse rounded-3xl bg-base-200" />
                    <div className="h-28 animate-pulse rounded-3xl bg-base-200" />
                </div>
                <div className="h-80 animate-pulse rounded-3xl bg-base-200" />
            </div>
        );
    }

    if (!profile) {
        const backPath = getBackPathByProfileType(profileType);
        const profileTypeLabel = getProfileTypeLabel(profileType);

        return (
            <div className="rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                {toast.message && <Toast message={toast.message} type={toast.type} />}

                <h2 className="text-xl font-bold text-base-content">
                    {profileTypeLabel} profili bulunamadı
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                    Kayıt silinmiş olabilir veya bu profili görüntüleme yetkiniz olmayabilir.
                </p>

                <Link to={backPath} className="btn btn-primary mt-6 rounded-xl">
                    Listeye dön
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {toast.message && <Toast message={toast.message} type={toast.type} />}

            <ProfileHeader profileType={profileType} profile={profile} />

            {renderDetails()}
        </div>
    );
}

export default ProfilePage;
import {
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import ProfileInfoCard from "./ProfileInfoCard";
import ProfileSection from "./ProfileSection";
import {
    getEmail,
    getFullName,
    getPhoneNumber,
    getValue,
} from "../utils/profileFormatters";

function OfficerProfileDetails({ profile }) {
    const roleName = getValue(profile, ["roleName", "RoleName"], "officer");

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ProfileInfoCard icon={UserCircleIcon} label="Ad Soyad" value={getFullName(profile)} />
                <ProfileInfoCard icon={ShieldCheckIcon} label="Rol" value={roleName} />
                <ProfileInfoCard icon={EnvelopeIcon} label="E-posta" value={getEmail(profile)} />
                <ProfileInfoCard icon={PhoneIcon} label="Telefon" value={getPhoneNumber(profile)} />
            </div>

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Memurun sistemde kayıtlı temel bilgileri"
                icon={IdentificationIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard icon={UserCircleIcon} label="Ad Soyad" value={getFullName(profile)} />
                    <ProfileInfoCard icon={ShieldCheckIcon} label="Rol" value={roleName} />
                    <ProfileInfoCard icon={EnvelopeIcon} label="E-posta" value={getEmail(profile)} />
                    <ProfileInfoCard icon={PhoneIcon} label="Telefon" value={getPhoneNumber(profile)} />
                </div>
            </ProfileSection>

            <ProfileSection
                title="Görev Bilgileri"
                description="Memur profili için ileride işlem geçmişi, evrak ve etkinlik sorumluluğu gibi alanlar burada genişletilebilir."
                icon={ShieldCheckIcon}
            >
                <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/30 p-8 text-center">
                    <p className="text-sm font-semibold text-base-content/55">
                        Şu an memur için temel profil bilgileri gösteriliyor.
                    </p>
                </div>
            </ProfileSection>
        </div>
    );
}

export default OfficerProfileDetails;
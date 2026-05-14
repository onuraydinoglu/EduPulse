import {
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import OfficerProfileStatsCards from "./OfficerProfileStatsCards";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileSection from "./ProfileSection";

import {
    getEmail,
    getFullName,
    getPhoneNumber,
    getValue,
} from "../utils/profileFormatters";

function OfficerProfileDetails({ profile }) {
    const roleName = getValue(profile, ["roleName", "RoleName"], "Memur");

    return (
        <div className="space-y-6">
            <OfficerProfileStatsCards profile={profile} />

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Memurun sistemde kayıtlı temel bilgileri"
                icon={UserCircleIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard
                        icon={UserCircleIcon}
                        label="Ad Soyad"
                        value={getFullName(profile)}
                    />

                    <ProfileInfoCard
                        icon={ShieldCheckIcon}
                        label="Yetki Rolü"
                        value={roleName}
                    />

                    <ProfileInfoCard
                        icon={EnvelopeIcon}
                        label="E-posta"
                        value={getEmail(profile)}
                    />

                    <ProfileInfoCard
                        icon={PhoneIcon}
                        label="Telefon"
                        value={getPhoneNumber(profile)}
                    />

                    <ProfileInfoCard
                        icon={IdentificationIcon}
                        label="Kullanıcı Tipi"
                        value="Okul Memuru"
                    />
                </div>
            </ProfileSection>
        </div>
    );
}

export default OfficerProfileDetails;
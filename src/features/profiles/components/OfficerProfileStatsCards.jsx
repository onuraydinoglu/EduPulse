import {
    EnvelopeIcon,
    PhoneIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import ProfileStatsCard from "./ProfileStatsCard";
import {
    getEmail,
    getFullName,
    getPhoneNumber,
    getValue,
} from "../utils/profileFormatters";

function OfficerProfileStatsCards({ profile }) {
    const fullName = getFullName(profile);
    const roleName = getValue(profile, ["roleName", "RoleName"], "Memur");
    const email = getEmail(profile);
    const phoneNumber = getPhoneNumber(profile);

    const stats = [
        {
            title: "Ad Soyad",
            value: fullName,
            icon: UserCircleIcon,
            variant: "blue",
            valueClassName: "text-xl",
        },
        {
            title: "Rol",
            value: roleName,
            icon: ShieldCheckIcon,
            variant: "emerald",
        },
        {
            title: "E-posta",
            value: email,
            icon: EnvelopeIcon,
            variant: "amber",
            valueClassName: "text-base",
        },
        {
            title: "Telefon",
            value: phoneNumber,
            icon: PhoneIcon,
            variant: "sky",
            valueClassName: "text-xl",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {stats.map((item) => (
                <ProfileStatsCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default OfficerProfileStatsCards;
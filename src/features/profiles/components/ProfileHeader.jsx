import { Link } from "react-router-dom";

import {
    ArrowLeftIcon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";

import StatusBadge from "../../../components/ui/StatusBadge";

import {
    getBackPathByProfileType,
    getEmail,
    getFullName,
    getPhoneNumber,
    getProfileTypeLabel,
    getStatus,
} from "../utils/profileFormatters";
import BackButton from "../../../components/ui/BackButton";

function ProfileHeader({ profileType, profile, backPath, action, onBack }) {
    const fullName = getFullName(profile);
    const email = getEmail(profile);
    const phoneNumber = getPhoneNumber(profile);
    const status = getStatus(profile);
    const profileTypeLabel = getProfileTypeLabel(profileType);
    const defaultBackPath = getBackPathByProfileType(profileType);
    const resolvedBackPath = backPath || defaultBackPath;

    return (
        <div className="rounded-3xl border border-base-300 bg-base-100/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <BackButton onClick={onBack} />

                        <h1 className="text-2xl font-bold text-base-content">
                            {fullName}
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-base-content/60">
                        {profileTypeLabel} profil bilgileri ve ilişkili kayıtlar
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {action}

                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
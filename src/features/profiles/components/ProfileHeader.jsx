import { Link } from "react-router-dom";

import {
    ArrowLeftIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserCircleIcon,
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

function ProfileHeader({ profileType, profile, backPath, action }) {
    const fullName = getFullName(profile);
    const email = getEmail(profile);
    const phoneNumber = getPhoneNumber(profile);
    const status = getStatus(profile);
    const profileTypeLabel = getProfileTypeLabel(profileType);
    const defaultBackPath = getBackPathByProfileType(profileType);
    const resolvedBackPath = backPath || defaultBackPath;

    return (
        <div className="rounded-3xl border border-base-300 bg-base-100/80 p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UserCircleIcon className="h-8 w-8" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-base-content">
                                {fullName}
                            </h1>

                            <StatusBadge status={status === "pasif" ? "izinli" : status} />
                        </div>

                        <p className="mt-1 text-sm font-medium text-primary">
                            {profileTypeLabel}
                        </p>

                        <p className="mt-1 text-sm text-base-content/60">
                            {profileTypeLabel} profil bilgileri ve ilişkili kayıtlar
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-base-content/70">
                            {email && (
                                <span className="inline-flex items-center gap-2">
                                    <EnvelopeIcon className="h-4 w-4" />
                                    {email}
                                </span>
                            )}

                            {phoneNumber && (
                                <span className="inline-flex items-center gap-2">
                                    <PhoneIcon className="h-4 w-4" />
                                    {phoneNumber}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                    {action}

                    <Link
                        to={resolvedBackPath}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content transition hover:border-primary/30 hover:text-primary"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Listeye Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
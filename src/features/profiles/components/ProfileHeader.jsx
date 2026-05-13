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

function ProfileHeader({ profileType, profile }) {
    const fullName = getFullName(profile);
    const email = getEmail(profile);
    const phoneNumber = getPhoneNumber(profile);
    const status = getStatus(profile);
    const profileTypeLabel = getProfileTypeLabel(profileType);
    const backPath = getBackPathByProfileType(profileType);

    return (
        <div className="rounded-3xl border border-base-300/60 bg-base-100/90 p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                        <UserCircleIcon className="h-9 w-9" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-extrabold tracking-tight text-base-content">
                                {fullName}
                            </h1>

                            <StatusBadge status={status} />

                            <span className="badge badge-primary badge-outline rounded-xl px-3 py-3">
                                {profileTypeLabel}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-base-content/60">
                            {profileTypeLabel} profil bilgileri ve ilişkili kayıtlar
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-base-content/70">
                            <span className="inline-flex items-center gap-2 rounded-xl bg-base-200 px-3 py-2">
                                <EnvelopeIcon className="h-4 w-4" />
                                {email}
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-xl bg-base-200 px-3 py-2">
                                <PhoneIcon className="h-4 w-4" />
                                {phoneNumber}
                            </span>
                        </div>
                    </div>
                </div>

                <Link to={backPath} className="btn btn-ghost rounded-xl">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Listeye Dön
                </Link>
            </div>
        </div>
    );
}

export default ProfileHeader;
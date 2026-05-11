import {
    AcademicCapIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";

import {
    getAdvisorName,
    getClubName,
} from "../utils/clubMemberFormatters";

function ClubMemberStatsCards({ club, members = [] }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Kulüp"
                value={getClubName(club)}
                description="Aktif çalışma alanı"
                icon={AcademicCapIcon}
                color="info"
            />

            <StatCard
                title="Öğretmeni"
                value={getAdvisorName(club) || "-"}
                description="Sorumlu öğretmen"
                icon={UserIcon}
                color="warning"
            />

            <StatCard
                title="Üye"
                value={members.length}
                description="Bu kulübe kayıtlı öğrenci sayısı"
                icon={UsersIcon}
                color="primary"
            />
        </div>
    );
}

export default ClubMemberStatsCards;
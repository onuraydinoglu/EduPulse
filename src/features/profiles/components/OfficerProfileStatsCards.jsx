import StatsCard from "../../../components/ui/StatCard";
import { OFFICER_PROFILE_STATS } from "../constants/profileStats.constants";
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

    const statValues = {
        fullName,
        roleName,
        email,
        phoneNumber,
    };

    const stats = OFFICER_PROFILE_STATS.map((item) => ({
        ...item,
        value: statValues[item.key],
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {stats.map((item) => (
                <StatsCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default OfficerProfileStatsCards;
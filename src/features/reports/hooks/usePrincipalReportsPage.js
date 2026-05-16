import { useMemo, useState } from "react";

import {
    principalClassReports,
    principalSchoolInfo,
} from "../constants/reportConstants";
import { getPrincipalReportStats } from "../constants/reportStats";
import { filterClassReportsByGrade } from "../utils/reportFormatters";

export function usePrincipalReportsPage() {
    const [gradeFilter, setGradeFilter] = useState("all");

    const filteredClassReports = useMemo(() => {
        return filterClassReportsByGrade(principalClassReports, gradeFilter);
    }, [gradeFilter]);

    const stats = useMemo(() => {
        return getPrincipalReportStats(principalSchoolInfo);
    }, []);

    const handleExportPrincipalReport = () => {
        // Daha sonra PDF export bağlanacaksa buraya alınır.
    };

    return {
        gradeFilter,
        setGradeFilter,
        filteredClassReports,
        stats,
        handleExportPrincipalReport,
    };
}
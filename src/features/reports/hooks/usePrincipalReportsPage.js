import { useEffect, useMemo, useState } from "react";

import { getPrincipalReportStats } from "../constants/reportStats";
import { principalReportService } from "../services/principalReportService";
import {
    buildPrincipalClassReports,
    buildPrincipalSchoolInfo,
    filterPrincipalClassReportsByGrade,
    getReportErrorMessage,
} from "../utils/principalReportFormatters";

export function usePrincipalReportsPage() {
    const [gradeFilter, setGradeFilter] = useState("all");
    const [classReports, setClassReports] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState({
        teacherCount: 0,
        studentCount: 0,
        clubCount: 0,
        eventCount: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: "success",
            });
        }, 2500);
    };

    const loadPrincipalReports = async () => {
        setIsLoading(true);

        try {
            const result = await principalReportService.getPrincipalReportData();

            const nextSchoolInfo = buildPrincipalSchoolInfo(result);
            const nextClassReports = buildPrincipalClassReports(result);

            setSchoolInfo(nextSchoolInfo);
            setClassReports(nextClassReports);
        } catch (error) {
            console.error(error);

            showToast(
                getReportErrorMessage(
                    error,
                    "Müdür raporları yüklenirken hata oluştu."
                ),
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPrincipalReports();
    }, []);

    const filteredClassReports = useMemo(() => {
        return filterPrincipalClassReportsByGrade(classReports, gradeFilter);
    }, [classReports, gradeFilter]);

    const stats = useMemo(() => {
        return getPrincipalReportStats(schoolInfo);
    }, [schoolInfo]);

    const handleExportPrincipalReport = () => {
        // PDF export daha sonra bağlanacaksa buraya alınır.
    };

    return {
        gradeFilter,
        setGradeFilter,
        filteredClassReports,
        stats,
        isLoading,
        toast,
        handleExportPrincipalReport,
    };
}
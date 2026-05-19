import FilterSelect from "../../../components/ui/FilterSelect";

import { gradeFilterOptions } from "../constants/reportFilters";

import PrincipalReportTable from "./PrincipalReportTable";

function PrincipalReportSection({
  reports,
  gradeFilter,
  setGradeFilter,
  onOpenClassAnalysis,
}) {
  return (
    <section className="radius-card overflow-hidden border border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-gray-950">
            Okul Sınıf Performansları
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Sınıfları 9, 10, 11 ve 12. sınıf seviyesine göre filtreleyin.
          </p>
        </div>

        <FilterSelect
          value={gradeFilter}
          onChange={setGradeFilter}
          options={gradeFilterOptions}
        />
      </div>

      <PrincipalReportTable
        reports={reports}
        onOpenClassAnalysis={onOpenClassAnalysis}
      />
    </section>
  );
}

export default PrincipalReportSection;
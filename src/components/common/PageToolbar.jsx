import SearchInput from "../ui/SearchInput";
import FilterSelect from "../ui/FilterSelect";

function PageToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  filterOptions,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="w-full md:max-w-sm"
      />

      {filterOptions && (
        <FilterSelect
          value={filterValue}
          onChange={onFilterChange}
          options={filterOptions}
          className="w-full md:w-48"
        />
      )}
    </div>
  );
}

export default PageToolbar;
import {
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function TeacherTableFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Öğretmen ara..."
          className="input input-bordered h-11 w-full rounded-xl pl-11 text-sm"
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3">
        <FunnelIcon className="h-5 w-5 text-base-content/40" />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select h-11 min-h-11 border-0 bg-transparent px-0 text-sm focus:outline-none"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="aktif">Aktif</option>
          <option value="izinde">İzinde</option>
        </select>
      </div>
    </div>
  );
}

export default TeacherTableFilters;
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function TeachersToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Öğretmen, telefon veya email ara..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="select select-bordered h-11 w-full rounded-xl bg-white text-sm md:w-44"
      >
        <option value="all">Tüm Durumlar</option>
        <option value="active">Aktif</option>
        <option value="passive">Pasif</option>
      </select>
    </div>
  );
}

export default TeachersToolbar;
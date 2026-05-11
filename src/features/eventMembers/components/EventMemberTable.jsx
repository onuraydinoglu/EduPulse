import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";

import EventMemberTableRow from "./EventMemberTableRow";

function EventMemberTable({
  members,
  search,
  setSearch,
  canManage = true,
  onDelete,
}) {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalItems,
    totalPages,
    paginatedItems,
    startItem,
    endItem,
  } = usePagination(members, 5);

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-base-content">
            Etkinlik Üyeleri
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            {members.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Öğrenci, numara veya sınıf ara..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Öğrenci</th>
              <th className="text-sm">Öğrenci No</th>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Ödeme Durumu</th>
              <th className="text-sm">Ödenen Tutar</th>

              {canManage && <th className="text-right text-sm">İşlemler</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((member) => (
              <EventMemberTableRow
                key={member.id || member.Id}
                member={member}
                canManage={canManage}
                onDelete={onDelete}
              />
            ))}

            {members.length === 0 && (
              <tr>
                <td
                  colSpan={canManage ? 6 : 5}
                  className="py-10 text-center text-sm text-base-content/60"
                >
                  Bu etkinlikte öğrenci bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-base-300/60 p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default EventMemberTable;
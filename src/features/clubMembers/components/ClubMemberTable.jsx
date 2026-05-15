import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import ClubMemberTableRow from "./ClubMemberTableRow";

function ClubMemberTable({
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
  } = usePagination(members, 10);

  const tableHeadTextClass =
    "text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45";

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-base-content">
            Kulüp Üyeleri
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
            <tr className="border-b border-base-300 [&_th]:px-6">
              <th>
                <span className={tableHeadTextClass}>Öğrenci</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Sınıf</span>
              </th>

              {canManage && (
                <th className="text-right">
                  <span className={tableHeadTextClass}>İşlemler</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((member) => (
              <ClubMemberTableRow
                key={member.id || member.Id}
                member={member}
                canManage={canManage}
                onDelete={onDelete}
              />
            ))}

            {members.length === 0 && (
              <tr>
                <td
                  colSpan={canManage ? 4 : 3}
                  className="px-6 py-10 text-center text-sm text-base-content/60"
                >
                  Bu kulüpte öğrenci bulunamadı.
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

export default ClubMemberTable;
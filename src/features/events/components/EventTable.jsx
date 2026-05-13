import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import {
    eventPaymentFilterOptions,
    eventStatusFilterOptions,
} from "../constants/eventFilters";
import EventTableRow from "./EventTableRow";

function EventTable({
    events,
    teachers = [],
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    canManage = true,
    onEdit,
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
    } = usePagination(events, 5);

    const tableHeadTextClass =
        "text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45";

    return (
        <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-base-content">
                        Etkinlik Listesi
                    </h2>

                    <p className="text-sm text-base-content/60">
                        {events.length} kayıt listeleniyor.
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Etkinlik, konum veya öğretmen ara..."
                    />

                    <FilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        hideLabel
                        className="w-full shrink-0 sm:w-48"
                        options={eventStatusFilterOptions}
                    />

                    <FilterSelect
                        value={paymentFilter}
                        onChange={setPaymentFilter}
                        hideLabel
                        className="w-full shrink-0 sm:w-48"
                        options={eventPaymentFilterOptions}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="bg-base-200/70">
                        <tr className="border-b border-base-300 [&_th]:px-6">
                            <th>
                                <span className={tableHeadTextClass}>Etkinlik</span>
                            </th>

                            <th>
                                <span className={tableHeadTextClass}>Tarih / Saat</span>
                            </th>

                            <th>
                                <span className={tableHeadTextClass}>
                                    Sorumlu Öğretmenler
                                </span>
                            </th>

                            <th>
                                <span className={tableHeadTextClass}>Ücret</span>
                            </th>

                            <th>
                                <span className={tableHeadTextClass}>Durum</span>
                            </th>

                            <th>
                                <span className={tableHeadTextClass}>Etkinlik İşlemi</span>
                            </th>

                            {canManage && (
                                <th className="text-right">
                                    <span className={tableHeadTextClass}>İşlemler</span>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedItems.map((event) => (
                            <EventTableRow
                                key={event.id || event.Id}
                                event={event}
                                teachers={teachers}
                                canManage={canManage}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}

                        {events.length === 0 && (
                            <tr>
                                <td
                                    colSpan={canManage ? 7 : 6}
                                    className="px-6 py-10 text-center text-sm text-base-content/60"
                                >
                                    Etkinlik kaydı bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    startItem={startItem}
                    endItem={endItem}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default EventTable;
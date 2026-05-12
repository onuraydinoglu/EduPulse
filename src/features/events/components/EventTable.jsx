import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import { eventPaymentFilterOptions, eventStatusFilterOptions } from "../constants/eventFilters";
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

    return (
        <div className="modern-card overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-200 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-base-content">Etkinlik Listesi</h2>
                    <p className="text-sm text-base-content/50">
                        {events.length} kayıt listeleniyor.
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                    <SearchInput
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Etkinlik, konum veya öğretmen ara..."
                    />

                    <FilterSelect
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        options={eventStatusFilterOptions}
                    />

                    <FilterSelect
                        value={paymentFilter}
                        onChange={(event) => setPaymentFilter(event.target.value)}
                        options={eventPaymentFilterOptions}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b border-base-200 bg-base-200/40 text-xs uppercase tracking-wide text-base-content/50">
                            <th className="px-4 py-4">Etkinlik</th>
                            <th className="px-4 py-4">Tarih / Saat</th>
                            <th className="px-4 py-4">Sorumlu Öğretmenler</th>
                            <th className="px-4 py-4">Ücret</th>
                            <th className="px-4 py-4">Durum</th>
                            <th className="px-4 py-4">Etkinlik İşlemi</th>
                            {canManage && <th className="px-4 py-4">İşlemler</th>}
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
                                    className="px-4 py-10 text-center text-sm text-base-content/50"
                                >
                                    Etkinlik kaydı bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
    );
}

export default EventTable;
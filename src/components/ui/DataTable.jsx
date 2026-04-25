function DataTable({ columns = [], data = [], actions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="text-sm">
                  {column.title}
                </th>
              ))}

              {actions && <th className="text-right text-sm">İşlemler</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/60">
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}

                {actions && (
                  <td className="text-right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default DataTable;
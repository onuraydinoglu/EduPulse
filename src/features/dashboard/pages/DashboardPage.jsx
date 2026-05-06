import PersonalNotesWidget from "../../personalNotes/components/PersonalNotesWidget";
import DashboardMessagesWidget from "../../messages/components/DashboardMessagesWidget";

function DashboardPage() {
  const schoolInfo = {
    name: "Müdürün Okulu",
    city: "Samsun",
    principal: "Okul Müdürü",
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-base-300 bg-base-100/90 p-6 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">Müdür Paneli</p>

        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-base-content">
              {schoolInfo.name}
            </h1>

            <p className="mt-1 text-sm text-base-content/60">
              {schoolInfo.city} konumundaki okulunuzun genel yönetim paneli
            </p>
          </div>

          <div className="rounded-2xl bg-base-200 px-4 py-3 text-sm text-base-content/70">
            Müdür:{" "}
            <span className="font-semibold text-base-content">
              {schoolInfo.principal}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DashboardMessagesWidget />
        <PersonalNotesWidget />
      </div>
    </div>
  );
}

export default DashboardPage;
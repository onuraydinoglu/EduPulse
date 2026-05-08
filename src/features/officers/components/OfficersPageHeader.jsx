import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function OfficersPageHeader({ onCreate, onExport }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-base-content">Memurlar</h1>

        <p className="mt-1 text-sm text-base-content/60">
          Memur kayıtlarını yönetin ve sistem erişimlerini düzenleyin.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <ExportButton onClick={onExport}>PDF İndir</ExportButton>

        <CreateButton icon={UserPlusIcon} onClick={onCreate}>
          Yeni Memur
        </CreateButton>
      </div>
    </div>
  );
}

export default OfficersPageHeader;
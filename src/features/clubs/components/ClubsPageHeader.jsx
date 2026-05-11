import { PlusIcon } from "@heroicons/react/24/outline";

import CreateButton from "../../../components/ui/CreateButton";

function ClubsPageHeader({ onCreate }) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Kulüpler</h1>

                <p className="mt-1 text-sm text-base-content/60">
                    Kulüpleri oluşturun, sorumlu öğretmen atamalarını yönetin ve kulüplere
                    öğrenci ekleyin.
                </p>
            </div>

            <CreateButton onClick={onCreate}>
                <PlusIcon className="h-5 w-5" />
                Yeni Kulüp
            </CreateButton>
        </div>
    );
}

export default ClubsPageHeader;
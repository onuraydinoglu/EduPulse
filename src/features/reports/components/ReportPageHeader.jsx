import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";

function ReportPageHeader({ eyebrow, title, description, buttonText, onExport }) {
    return (
        <section className="radius-card border border-gray-200 bg-white px-6 py-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <p className="text-sm font-medium text-blue-600">{eyebrow}</p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
                        {title}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>

                <Button onClick={onExport}>
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    {buttonText}
                </Button>
            </div>
        </section>
    );
}

export default ReportPageHeader;
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function BackButton({ onClick, className = "", title = "Geri" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            aria-label={title}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-base-300/50 bg-base-200/50 text-base-content/70 transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary ${className}`}
        >
            <ChevronLeftIcon className="h-5 w-5" />
        </button>
    );
}

export default BackButton;
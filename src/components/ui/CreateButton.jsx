import { PlusIcon } from "@heroicons/react/24/outline";

function CreateButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <PlusIcon className="h-5 w-5" />
      {children}
    </button>
  );
}

export default CreateButton;
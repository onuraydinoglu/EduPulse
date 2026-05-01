import { PlusIcon } from "@heroicons/react/24/outline";

function CreateButton({
  children,
  onClick,
  icon: Icon = PlusIcon, // default PlusIcon
}) {
  return (
    <button
      onClick={onClick}
      className="btn-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-200 cursor-pointer"
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  );
}

export default CreateButton;
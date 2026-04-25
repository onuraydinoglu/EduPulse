import Button from "./Button";

function ConfirmModal({
  id,
  title = "İşlemi Onayla",
  description = "Bu işlemi yapmak istediğinize emin misiniz?",
  confirmText = "Onayla",
  cancelText = "Vazgeç",
  onConfirm,
}) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box rounded-2xl">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="mt-3 text-sm text-base-content/60">
          {description}
        </p>

        <div className="modal-action">
          <form method="dialog">
            <Button variant="ghost">{cancelText}</Button>
          </form>

          <Button variant="error" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Kapat</button>
      </form>
    </dialog>
  );
}

export default ConfirmModal;
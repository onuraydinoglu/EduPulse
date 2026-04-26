function Modal({ id, title, children, description, footer }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-2xl rounded-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-1 text-sm text-base-content/50">
              {description}
              {/* Gerekli bilgileri doldurup kaydı oluşturabilirsiniz. */}
            </p>
          </div>

          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm">✕</button>
          </form>
        </div>

        {children}

        {footer && (
          <div className="modal-action">
            {footer}
          </div>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Kapat</button>
      </form>
    </dialog>
  );
}

export default Modal;
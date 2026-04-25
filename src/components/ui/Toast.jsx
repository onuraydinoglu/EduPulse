function Toast({ message, type = "success" }) {
  if (!message) return null;

  const typeClass = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${typeClass[type]} rounded-xl shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
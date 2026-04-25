function Card({ children, className = "", hover = true }) {
  return (
    <div className={`modern-card ${hover ? "hover:shadow-xl" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
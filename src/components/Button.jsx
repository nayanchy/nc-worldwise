import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  const baseClass = styles.btn;
  const typeClass = styles[type];
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;

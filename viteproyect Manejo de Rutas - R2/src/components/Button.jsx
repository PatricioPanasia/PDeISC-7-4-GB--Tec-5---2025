import "../styles/Button.css";

/**
 * Botón reutilizable
 * - type: "success" | "info" | "danger" | "default"
 * - htmlType: "button" | "submit" | "reset"
 * - full: true para ocupar 100% del ancho
 */
function Button({ text, onClick, type = "default", htmlType = "button", full = false, ...rest }) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`btn ${type} ${full ? "full" : ""}`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;

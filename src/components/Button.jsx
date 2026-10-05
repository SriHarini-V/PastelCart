// Reusable Button component. Keeps the existing .btn / .btn-primary etc.
// class names so it drops into the existing UI without changing styles.
function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    fullWidth ? "full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

export default Button;

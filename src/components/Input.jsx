// Reusable form field: label + input/textarea + inline validation error.
// Works for both Login and Checkout so validation styling stays consistent.
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  as = "input",
  rows = 3,
  ...rest
}) {
  const Field = as === "textarea" ? "textarea" : "input";

  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        id={name}
        name={name}
        type={as === "textarea" ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={as === "textarea" ? rows : undefined}
        className={error ? "input-error" : ""}
        {...rest}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default Input;

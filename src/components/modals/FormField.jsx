import React from 'react';

const controlClasses =
  'w-full px-3 py-2 rounded-lg border border-border-default bg-surface text-strong placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-colors';

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows,
  mono = false,
  children,
  ...rest
}) {
  const classes = mono ? `${controlClasses} font-mono` : controlClasses;

  return (
    <div>
      <label className="block mb-1 font-semibold text-secondary">{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classes}
          {...rest}
        />
      ) : type === 'select' ? (
        <select value={value} onChange={onChange} className={classes} {...rest}>
          {children}
        </select>
      ) : (
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classes}
          {...rest}
        />
      )}
    </div>
  );
}

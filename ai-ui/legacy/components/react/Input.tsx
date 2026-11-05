import { InputHTMLAttributes, useId } from 'react';
/** Web/React DOM only; floating label remains associated with the input. */
export function Input({ label, hint, error, id: givenId, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const generatedId = useId();
  const id = givenId || generatedId;
  const helperId = `${id}-hint`;
  return <div className={`ui-field ${error ? 'invalid' : ''}`}>
    <input id={id} className="ui-input" placeholder=" " aria-invalid={!!error}
      aria-describedby={hint || error ? helperId : undefined} {...rest} />
    <label htmlFor={id}>{label}</label>
    {(error || hint) && <small id={helperId}>{error || hint}</small>}
  </div>;
}

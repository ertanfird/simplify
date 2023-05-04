import React, { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';

const Checkbox = forwardRef((props, ref) => {
  return (
    <div className="checkbox__wrapper">
      {!!props.errors &&
        <div className='error error-checkbox'>
          <ErrorMessage
            errors={props.errors}
            name={props.name} />
        </div>
      }
      <input
        type="checkbox"
        className="checkbox"
        name="checkTerms"
        checked={props.checked}
        onBlur={props.onBlur}
        onChange={(e) => { props.setchecked(!props.checked) }}
        id={props.name}
        ref={ref}
      />
      <label
        htmlFor={props.name}
        className="checkbox__label"
      >
        {props.label}
        {props.children}
      </label>
    </div>
  )
})

export default Checkbox;
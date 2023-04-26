import React, { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';

const Input = forwardRef((props, ref) => {
  return (
    <div className='input-wrapper'>
      {!!props.errors &&
        <div className='error'>
          <ErrorMessage errors={props.errors} name={props.name} />
        </div>
      }
      <input className="input" {...props} ref={ref} />
    </div>
  )
})

export default Input;

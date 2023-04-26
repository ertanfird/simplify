import React, { Fragment, useContext } from 'react'
import Context from '../../context';


export default function Alert() {
  const { statusServer } = useContext(Context);
  return (
    <Fragment>
      {statusServer.type === 'ERROR' &&
        <div className='alert alert-error'>{statusServer.data}</div>
      }
      {statusServer.type === 'SUCCESS' &&
        <div className='alert alert-success'>Success!</div>
      }
      {statusServer.type === 'LOADING' &&
        <div className="lds-dual-ring"></div>
      }
    </Fragment>
  )
}

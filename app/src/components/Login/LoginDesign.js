import React, { Fragment } from 'react'
import {ReactComponent as TimeToFocus} from "../../assets/time-to-focus.svg";
import {ReactComponent as BackGreen} from "../../assets/back-man-green.svg";
import ManLogin from "../../assets/man-login.png";


const LoginDesign = () => {
  return (
    <Fragment>
        <div className="abs">    
                <div className='position-relative'>
                    <img alt='' src={ManLogin} className='man-login' />
                    <div className='back-green'>
                        <BackGreen  />
                    </div>
                </div>
            </div>
            <div className='time-to-focus abs-focus'>
                <TimeToFocus style={{width: "386px", height: "111px"}} />
            </div>
    </Fragment>
  )
}

export default LoginDesign
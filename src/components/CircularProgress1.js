import React, { useEffect, useState, useRef } from "react"
//import Link from 'next/link'

//import Router, { useRouter } from "next/router"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------

export default function CircularProgressComponent() {

    const dispatch = useDispatch()


    const { progress1, progress2, progress3 } = useSelector((state) => state.UsersReducer)

    return (
        <>

            <div className="flex centered flex-col pb-2" style={{ height: 180 }}>  
            <img className="mb-10 mt-6" style={{ height: 50 }} src="/assets/img/wallet.webp" alt="motor" />
               
                <div style={{ width: 50 }}>

           <div className="flex flex-col centered">
                <p className="text-[12px]">Progress</p>
                
                   <CircularProgressbar
                 
                        value={progress1 || 0}
                        maxValue={100}
                        text={`${progress1 || 0}%`}
                        styles={buildStyles({
                            rotation: 0,
                            strokeLinecap: 'butt', // butt
                            textSize: '32px',
                            pathTransitionDuration: 0.5,
                            pathColor: '#800000', // maroon
                            textColor: '#ff9900',
                            trailColor: '#ddd',
                            text: {
                                fontSize: '50px',
                              },
                           
                        })}
                    />
                </div>
            </div>
            </div>
          
        </>
    )
}




import React, { useEffect, useState } from "react"
import Head from 'next/head'

import { useRouter } from 'next/router';


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'


//--------------------------------------

export default function HeaderBoard() {

    const { asPath, pathname } = useRouter()
    const router = useRouter()
    const dispatch = useDispatch()
    const path = pathname.substring(1, 18) // any number except 5
    // const path = pathname.substring(1, 5)

  
    // console.log(path)

    return (
        <>
<section className="py-20 bg-white px-2">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-700">Products Pricing</h2>
            <div className="mt-8 grid lg:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE AYAM</h3>
                        <p className="text-sm text-gray-700 mb-4">Tender chicken skewers marinated in rich spices.</p>
                        <p className="text-lg font-bold text-red-700">$12.99</p>
                    </div>
                </div>

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KULIT</h3>
                        <p className="text-sm text-gray-700 mb-4">Sate kulit ayam yang lezat, bergizi dan berprotein tinggi.</p>
                        <p className="text-lg font-bold text-red-700">Rp. 15.000</p>
                    </div>
                </div>

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KAMBING</h3>
                        <p className="text-sm text-gray-700 mb-4">Succulent lamb skewers marinated in aromatic spices.</p>
                        <p className="text-lg font-bold text-red-700">$16.99</p>
                    </div>
                </div>

               
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Tofu Satay</h3>
                        <p className="text-sm text-gray-700 mb-4">Grilled tofu skewers with a spicy peanut sauce.</p>
                        <p className="text-lg font-bold text-red-700">$10.99</p>
                    </div>
                </div>

               
                
            </div>
        </div>
    </section>


            
        </>
    )
}




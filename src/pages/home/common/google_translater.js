import React from 'react'
import { useState, useEffect } from 'react';

export default function Google_translater() {
    const loadGoogleTranslate = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                includedLanguages: 'en,fr,de,es',
                autoDisplay: true
            },
            "google_element");
    }
    useEffect(() => {
        setTimeout(() => {
            loadGoogleTranslate()
        }, 2000);
    }, [])


    // const googleTranslateElementInit = () => {
    //     new window.google.translate.TranslateElement(
    //         {
    //             pageLanguage: "en",
    //             includedLanguages: 'en,fr,de,es',
    //             autoDisplay: true
    //         },
    //         "google_translate_element"
    //     );

    // };
    useEffect(() => {
        // setTimeout(() => {
        //     var addScript = document.createElement("script");
        //     addScript.setAttribute(
        //         "src",
        //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        //     );
        //     document.body.appendChild(addScript);
        //     window.googleTranslateElementInit = googleTranslateElementInit;
        // })
        // if (document.documentElement.getAttribute('lang') == 'fr') {
        //     document.body.classList.add('xyz');
        //     console.log("xyz");
        // }
    }, []);
    return (
        <>
            {/* <li className='lang' id="google_translate_element"> </li> */}
            <li className='lang' id='google_element'></li>
        </>
    )
}

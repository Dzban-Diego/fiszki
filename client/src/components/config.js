import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* react-color https://casesandberg.github.io/react-color/ */
import { ChromePicker } from 'react-color';

/* icons https://fontawesome.com/ */
import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Config = (p) => {
    const [color,setColor] = useState('')  //color of interface
    const [en,setEN] = useState(p.lang[1]) //set lang english
    const [pl,setPL] = useState(p.lang[0]) //set lang polish
    const [es,setES] = useState(p.lang[2]) //set lang Spanish
    const [theme,setTheme] = useState(false) // togle night mode

    const history = useHistory()

    /* Change color by the color picker */
    const handleChangeComplete = (colour) => {
        setColor(colour.hex)
        document.documentElement.style.setProperty('--color',color);
    }

    /* disable one language */
    const handleChangeLang = (lang) =>{
        switch (lang) {
            case 'pl': setPL(!pl); setEN(true) ; setES(true) ; pl ? chst('--disbttPL','grey') : chst('--disbttPL',color) ; chst('--disbttES',color); chst('--disbttEN',color); break;
            case 'en': setEN(!en); setES(true) ; setPL(true) ; en ? chst('--disbttEN','grey') : chst('--disbttEN',color); chst('--disbttPL',color); chst('--disbttES',color) ; break;
            case 'es': setES(!es); setEN(true) ; setPL(true) ; es ? chst('--disbttES','grey') : chst('--disbttES',color); chst('--disbttPL',color); chst('--disbttEN',color) ; break;
            default: console.log('ERROR 3')
        }
    }

    /* Change color of flag in language setting */
    const chst = (dest,color) => {
        document.documentElement.style.setProperty(dest,color); //dest is destination(which element change color) // color - to what color it changes
    }

    /* toggle night mode */
    const handleClick = () => {
        if(theme){
            chst('--bgcolor','#ffffff')
            chst('--color2','#000000')
            setTheme(!theme)
        }else{
            chst('--bgcolor','#000000');
            chst('--color2','#ffffff');
            setTheme(!theme)
        }
    }

    return (
        <div className='conf'>
            <div className="setlangs">
                <p>Możesz wyłączyć jeden język</p>
                <button className='setLang pl' onClick={() => {handleChangeLang('pl')}}><img alt='pl' className='chflag' src='/pl.svg' /></button>
                <button className='setLang en' onClick={() => {handleChangeLang('en')}}><img alt='en' className='chflag' src='/en.svg' /></button>
                <button className='setLang es' onClick={() => {handleChangeLang('es')}}><img alt='es' className='chflag' src='/es.svg' /></button>
                <button className='langsave' onClick={() => {p.calbackfunc(pl,en,es); history.push('/') }}>Zapisz</button>
            </div>
            <button onClick={handleClick} className='link theme'><FontAwesomeIcon icon={faAdjust} /></button>
            <ChromePicker 
                color={ color }
                onChangeComplete={ handleChangeComplete }
            />
        </div>
    );
};

export default Config;
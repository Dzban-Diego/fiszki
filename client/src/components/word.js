import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Word = (p) => {
    const PLflag = '/pl.svg'
    const ENflag = '/en.svg'
    const ESflag = '/es.svg'
    const [en] = useState(p.en.toUpperCase())
    const [pl] = useState(p.pl.toUpperCase())
    const [es] = useState(p.es.toUpperCase())
    const [flag,setFlag] = useState(p.lang[0] ? PLflag : ENflag)
    const [cat] = useState(p.cat.toUpperCase())
    const [word,setWORD] = useState(p.lang[0] ? pl : en)

    const handleclick = () => {
        switch (word){
            case pl: p.lang[1] ? setWORD(en) : setWORD(es); p.lang[1] ? setFlag(ENflag) : setFlag(ESflag); break;
            case en: p.lang[2] ? setWORD(es) : setWORD(pl); p.lang[2] ? setFlag(ESflag) : setFlag(PLflag); break;
            case es: p.lang[0] ? setWORD(pl) : setWORD(en); p.lang[0] ? setFlag(PLflag) : setFlag(ENflag); break;
            default: console.log('ERROR')
        }
    }

    return (
        <div className={p.classname}>
            <button onClick={handleclick} className="word">{word}</button>
            <img alt='flag' className='flag' src={flag} />
            {p.edit && <Link to={`/editword/?${en}:${pl}:${es}:${cat}:${p.id}`} className='link edit'><FontAwesomeIcon icon={faPen} /></Link>}
        </div>
    )
}

export default Word
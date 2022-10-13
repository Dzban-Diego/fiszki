import React, { useEffect, useState} from 'react';
// import useKeyPress from './useKeyPress'
import Word from './word';

import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var shuffle = require('shuffle-array');

const OneWord = (p) => {
    const [isData, setIsData] = useState(false)
    const [data,setData] = useState()
    const [allWords,setWords] = useState([])
    const category = p.category
    const [index,setIndex] = useState(0)

    const getData = (d) => { 
        var indx = index +1
        if(index +1 > d.length && d.length !== 0){
            setData(d[0])
        }else if(d.length === indx && d.length !== 0){
            d.length > 10 ? shuffle(allWords) : console.log('tuturutu');
            setData(d[index])
            setIndex(0)
        }else{
            setIndex(index+1)
            setData(d[index])
        }   
        setIsData(true) 
    }

    useEffect(() => {
        fetch('api/get',{
            method: 'POST',
            headers: {'Content-Type': 'application/JSON'},
            body: JSON.stringify({data: category})
            })
            .then(res => res.json())
            .then(res => {
                setIndex(0)
                shuffle(res)
                setWords(res)
                getData(res)
            })
    },[category]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleLeft = () => {
        setData(allWords[index-2])
        setIndex(index -1)
    }

    const handleRight = () => {
        getData(allWords)
    }

    return (
        <div className='OneWord' >
            <div className='topWord'>
                {!isData && <h3>Loading...</h3>}
                {isData && <Word classname='bigWordDiv' en={data.en} pl={data.pl} es={data.es} cat={data.category} id={data._id} key={data._id} edit={p.edit} lang={p.lang} /> }
            </div>
            <div className='bottomWord'>
                <button onClick={handleLeft} className='bttleft' disabled={index === 1 || index === 0}><FontAwesomeIcon className='left' icon={faCaretSquareLeft} /></button>
                <button onClick={handleRight} className='bttright'><FontAwesomeIcon className='right' icon={faCaretSquareRight} /></button>
            </div>
        </div>
    );
};

export default OneWord;
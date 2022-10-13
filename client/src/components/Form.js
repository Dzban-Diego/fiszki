import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import SelectCategory from './selectCategory';

const Form = (p) => {
    const queryString = window.location.search;
    const qs = queryString.substring(1)
    const up = qs.split(':')    //get 
    const [en,setEN] = useState(up[0] ? decodeURI(up[0]) : '')
    const [pl,setPL] = useState(up[1] ? decodeURI(up[1]) : '')
    const [es,setES] = useState(up[2] ? decodeURI(up[2]) : '')
    const [cat,setCAT] = useState(up[3] ? decodeURI(up[3]) : '')
    const [fill,setFill] = useState(false)
    const [isAded,setADD] = useState(false)
    const history = useHistory()
    const [customCat,chCustomCat] = useState(false)

    const handleTrash = () => {
        fetch(`/api/${up[4]}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/JSON'},
        })
            .then(res => {
                history.goBack()
                console.log('deleted')
            })
            .catch(err => console.log(err))
    }

    const handeleSubmit = (e) => {
        chCustomCat(true)
        setADD(true)
        setTimeout(()=>{
            e.preventDefault()
            const id = up[4]
            const data = {en, pl, es, cat, id}
    
            
            const patch = p.edit ? 'edit' : 'add'
            fetch(`/api/${patch}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/JSON'},
                body: JSON.stringify(data)
            })
                .then(res => {
                    setADD(false)
                    setCAT('')
                    setEN('')
                    setES('')
                    setPL('')
                    history.goBack()
                })
                .catch(err => console.log(err))
        },500)
    }

    const handleAutoTranslate = () => {
        if(en || pl || es){ setFill(true)}

        const translate = (data) => {
            fetch(`/api/translate`,{
                method: 'POST',
                headers: {'Content-Type': 'application/JSON'},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    switch(data.Destlang){
                        case 'pl': setPL(res.translatedText);break;
                        case 'en': setEN(res.translatedText);break;
                        case 'es': setES(res.translatedText);break;
                        default: console.log('ERR 090'); break;
                    }
                    setFill(false)
                })
                .catch(err => console.log(err))
        }

        if(en){
            if(!pl){
                translate({data: en, Fromlang: 'en', Destlang: 'pl'})
            }
            if(!es){
                translate({data: en, Fromlang: 'en', Destlang: 'es'})
            }else{
                console.log('ERR 091')
            }
        }else if(es){
            if(!en){
                translate({data: es, Fromlang: 'es', Destlang: 'en'})
            }
            if(!pl){
                translate({data: es, Fromlang: 'es', Destlang: 'pl'})
            }else{
                console.log('ERR 091')
            }
        }else if(pl){
            if(!en){
                translate({data: pl, Fromlang: 'pl', Destlang: 'en'})
            }
            if(!es){
                translate({data: pl, Fromlang: 'pl', Destlang: 'es'})
            }else{
                console.log('ERR 091')
            }
        }else{
            console.log('ERR 092')
        }
    }

    //https://stackoverflow.com/questions/47709037/how-to-create-a-controlled-form-in-react-that-allows-upper-case-letters-only
    const toInputUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
      };

    return(
        <div>
            <div className='form'>
                <form onSubmit={handeleSubmit}>
                    {!p.edit && <h1>Dodaj nowe słowo :)</h1>}
                    {p.edit && <h1>Edytuj słowo</h1>}
                    <label>Angielski: </label>
                    <input 
                        type='text' 
                        value={en}
                        onChange={(e)=> setEN(e.target.value)}
                        onInput={toInputUppercase}
                        required
                    />
                    
                    <label>Polski: </label>
                    <input 
                        type='text' 
                        value={pl}
                        onChange={(e)=> setPL(e.target.value)}
                        onInput={toInputUppercase}
                        required
                    />

                    <label>Hiszpański: </label>
                    <input 
                        type='text' 
                        value={es}
                        onChange={(e)=> setES(e.target.value)}
                        onInput={toInputUppercase}
                        required
                    />

                    <label>Kategoria: </label>
                    <SelectCategory category={cat} calback={setCAT} required={true} />
                    <button onClick={() => {chCustomCat(!customCat)}} type='button' className='link category' ><FontAwesomeIcon icon={faPen} /></button>
                    {customCat && <input 
                        type='text'
                        value={cat}
                        onChange={(e)=> setCAT(e.target.value)}
                        onInput={toInputUppercase}
                        required
                    />}

                    {p.edit && <div>
                        {!isAded && <button>Edytuj</button>}
                        {isAded && <button disabled>Edytowanie...</button>}
                        {!isAded && <button onClick={handleTrash} className='trash'><FontAwesomeIcon icon={faTrash} /></button>}
                    </div>}

                    {!p.edit && <div>
                        {!isAded && <button>Dodaj</button>}
                        {isAded && <button disabled>Dodawanie...</button>}
                    </div>}

                    <button className='translate' onClick={handleAutoTranslate} type='button' disable={en || pl || es}>{fill && `Uzupełnianie...`}{!fill && `Uzupełnij`}</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Form
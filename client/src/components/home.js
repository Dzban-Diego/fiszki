import React, { useEffect, useState } from 'react'
import Word from './word'

const Home = (p) => {
    const [isData, setIsData] = useState(false)
    const [data,setData] = useState('')
    const category = p.category

    useEffect(() => {
        if(p.category){
            fetch('/api/categories',{
                method: 'POST',
                headers: {'Content-Type': 'application/JSON'},
                body: JSON.stringify({data: category})
            })
                .then(res => res.json())
                .then(res => {
                    setData(res);
                    setIsData(true);
                })
                .catch(err => console.log(err))
        }else{
            fetch('/api/get')
                .then(res => res.json())
                .then(res => {
                    setData(res);
                    setIsData(true)
                })
                .catch(err => console.log(err))
        }
    },[category,p.category])
    
    return (
        <div className='home'>
            {!isData && <h3>Loading...</h3>}
            {isData && <div className='home2'>
                {data.map((data) => (
                    <Word classname={'wordDiv'} en={data.en} pl={data.pl} es={data.es} cat={data.category} id={data._id} key={data._id} edit={p.edit} lang={p.lang} />
                ))}
            </div>}
        </div>
    )
}

export default Home
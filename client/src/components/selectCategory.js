import React, { useEffect, useState } from 'react';

const SelectCategory = (p) => {
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState(p.category)
    const [disabled,setDisabled] = useState(true)

    const handleChange = (event) => {
        p.calback(event.target.value)
        setCategory(event.target.value)
    }

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(res => setCategories(res))
            .then(() => setDisabled(false))
            .catch(err => console.log(err))
    },[])

    const getCategories = () => {
        return (
            categories.map((word) => (
                <option key={Math.random()} value={(word.split('(')[0] === 'WSZYSTKIE') ? '' : word.split('(')[0]}>{word.toUpperCase()}</option>
            ))
        )
    }

    return (
        <div className='selectCategory'>
            <select value={category} onChange={handleChange} disabled={disabled} required={p.required}>
                    {getCategories()}
                </select>
        </div>
    );
};

export default SelectCategory;
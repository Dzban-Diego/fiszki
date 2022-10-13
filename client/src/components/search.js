import React from 'react';
import SelectCategory from './selectCategory';

const Search = (p) => {
    return (
        <div className='search'>
                <label>Kategoria: </label>
                <SelectCategory category={p.category} calback={p.calback}/>
        </div>
    );
};

export default Search;
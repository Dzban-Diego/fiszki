import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {

    return (
        <div className='Header'>
            <header className="headerCut">
                <button onClick={props.calbacksearch} className='link searchbtt' ><FontAwesomeIcon icon={faSearch}/></button>
                <button onClick={props.calbackfunc} className='link edit' ><FontAwesomeIcon icon={faPen} /></button>
                <Link to='/add' className='link add'><FontAwesomeIcon icon={faPlus} /></Link>
                <Link to='/conf' className='link conf'><FontAwesomeIcon icon={faCog} /></Link>
                <Link to='/book' className='link book'><FontAwesomeIcon icon={faBook} /></Link>
                <Link to='/' className='link linkhome'><FontAwesomeIcon icon={faHome} /></Link>
            </header>
        </div>
    )
}

export default Header
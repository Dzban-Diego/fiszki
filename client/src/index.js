import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './index.css';
import Home from './components/home'
import Header from './components/header'

import Form from './components/Form'
import Config from './components/config';
import OneWord from './components/oneWord';
import Search from './components/search';
import Footer from './components/footer';

function App() {
  const [edit,setEdit] = useState(false)
  const [search,setSearch] = useState(false)
  const [lang,setLang] = useState([true,true,true])
  const [category,setCategory] = useState('')

  const chLangs = (pl,en,es) => {
    setLang([pl,en,es])
  }

  const calback = () => {
    setEdit(!edit)
  }

  const chCategory = (category) => {
    setCategory(category)
  }

  const calbacksearch = () => {
    setSearch(!search)
  }

  return (
    <Router>
      <div className="Appp">
        <Header calbackfunc={calback} calbacksearch={calbacksearch} />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              {search && <Search edit={edit} lang={lang} calback={chCategory} category={category} />}
              <OneWord edit={edit} lang={lang} category={category} search={search} chCategory={chCategory}/>
            </Route>
            <Route exact path='/add'>
              <Form edit={false} />
            </Route>
            <Route exact path='/book'>
              {search && <Search edit={edit} lang={lang} calback={chCategory} category={category} />}
              <Home edit={edit} lang={lang} category={category} search={search} chCategory={chCategory}/>
            </Route>
            <Route exact path='/conf'>
              <Config calbackfunc={chLangs} lang={lang}/>
            </Route>
            <Route exact path='/editword'>
              <Form edit={true} />
            </Route>
            <Route exact path='*'>
              <h1>Error 404</h1>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

//================================

ReactDOM.render(
  <div className="App">
      <App />
  </div>,
  document.getElementById('root')
);
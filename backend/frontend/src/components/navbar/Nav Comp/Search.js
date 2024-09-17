import React from 'react'
import '../Navbar.css'

function Search(props) {
  //Search Function
  const searchfn=props.setSearchvalue
  function typedValue(value){
    searchfn(value);
  }

  return (
        <div className="search_bar" style={{'display':props.display}}>
            <i className="bi bi-search"></i>
            <input type="text" autoFocus placeholder='Artists, Songs or Podcasts' onChange={(e)=>typedValue(e.target.value)}/>
        </div>
  )
}

export default Search

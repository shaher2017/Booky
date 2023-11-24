import React, { useEffect, useState } from 'react';
import Books from './books';
import SearchIcon from '@mui/icons-material/Search';
import SearchBooks from './searchbooks';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const BooksRouter = () => {
    const [view, setView] = useState(<Books/>);
    const [query, setQuery] = useState("");
    const [target, setTarget] = useState("books"); 
  
    const handlechange = (e)=>{
        setTarget(e.target.value);
    }
    useEffect(()=>{
        if(query.trim() ===""){
            setView(<Books/>);
        }
        else{
            setView(<SearchBooks query={query} target={target}/>);
        }
    }
    ,[query,target])

  return (
    <div style={{display:"flex", alignItems:"center",flexDirection:"column", width:"100%",backgroundColor:"rgba(232 229 229)"}}> 
    <div style={{ width: '70%', marginTop:"1rem",marginBottom:"1rem", position:"relative" }}>
      <input
        className="d-inline border border-none"
        style={{
          padding:'25px',
          borderRadius:'19px',
          width:"100%",
          height:"2.5rem",
          fontWeight:"bold",
          fontSize:"1rem"

        }}
        type="text"
        placeholder={target ? "  Search Books..." : "  Search Seller..." }
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
          <SearchIcon style={{position:"absolute", right:15, top:15}}/>
          <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={target}
               label="Search"
              name='searcher'
            onChange={handlechange}
            style={{width:"6rem",
             fontWeight:"bold",position:"absolute", right:45, height:"96%", top:1,
            backgroundColor:"rgb(52, 67, 92)", color:"white", border:"none"}}
        >
             <MenuItem value="books">Book</MenuItem>
             <MenuItem value="sellerbooks">Seller Books</MenuItem>
             <MenuItem value="sellers">Sellers</MenuItem>
        </Select>
    </div>
          {view}
        </div>
  )
}

export default BooksRouter;
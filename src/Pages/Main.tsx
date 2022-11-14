import React from "react";
import Card from "../Components/Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../Components/logo.png"
import  "../Types/Pokemon_type";

const Main=()=>{

    interface Pokemons{
        
        name: string
        url: string 
    }

    interface Pokemon{
        id: string
        name: string
        sprites: {
            front_default: string
        };
        types: {
          type:
          {
            name:string
          }
        }[]
    }

    type PokemonsArr = Pokemons[];
    const [pokeData,setPokeData]=useState<Pokemon[]>([]);
    const [nextUrl,setNextUrl]=useState<string>();
    const [pokeDex,setPokeDex]=useState<Pokemon[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);


    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon";
        fetchData(url);
        //fetchAllPoke(url);
      }, []);
    
      const fetchData = async (url:string) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          if (json.next!== "") {
            setNextUrl(json.next);
          } else {
            setNextUrl("");
          }
          getPokemon(json.results);
        } catch (error) {
          console.log("error", error);
        }
      };
      const getPokemon=async(res: PokemonsArr)=>{
        if(res instanceof Array)
        {
            res.map(async(item:Pokemons)=>{
                
                const response = await fetch(item.url);
                const json:Pokemon = await response.json();
                const result=await axios.get(item.url);
              
                
                setPokeData(state=>{
                    state=[...state,json]
                    state.sort((a,b)=>a.id>b.id?1:-1)
                    return state;
                })
                
             }) 
              
          }

        }
        const fetchAllPoke= async(url:string)=>{
          try{
            // const response = await fetch(url);
            // var json = await response.json();
            var json = (await axios.get(url)).data
            const allPokemons = [...pokemonsList, ...json.results];
            setPokemonsList(allPokemons);
            while(json.next!== "" && json!==null){
              const newresponse = await fetch(json.next);
              json = await newresponse.json();
              const allPokemons = [...pokemonsList, ...json.results];
              setPokemonsList(allPokemons);
            }
            
            }
          
          catch(error) {
            console.log("error", error);
          }
          
        }

        const loadMore = async () => {
          await fetchData(nextUrl!);
        };

        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchInput(e.target.value);
          SearchBar();
        };  
        
        const SearchBar = () => { 
          const search_res = pokeData.filter((pokemon) => {
            return pokemon.name.match(searchInput);
          
      });
            
            if (search_res)
            {
              setPokeDex(search_res);
            }
      
          }
      

  return(
      <>
        
          <div className="container">

          <div className="header_comp_img">
                <img src={logo} alt="" />
                </div>
          <div className="header_comp">
          <div className="searchBar">
                  <form>
                  <input
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput}
                    
                   />
                  </form>
                  <button> Search</button>
                
                </div>
          </div>
         
                
              

              <div className="left-content">
              {searchInput === ""
                ? (pokeData &&
                  <Card pokemon={pokeData}   />
                )
                : (pokeDex &&
                  <Card pokemon={pokeDex}/>
                  )}

              </div>

          <div className="bottom">
          <div className="btn-group">
              {nextUrl && <button onClick={loadMore}>Load more...</button>}
          </div>
          </div>
          
              
          </div>
      
      </>
  )
}
export default Main;
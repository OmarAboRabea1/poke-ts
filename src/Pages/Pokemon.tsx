import {useParams} from "react-router-dom"; 
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import logo from "../Components/logo.png"
import { getDecorators } from "typescript";
import axios from "axios";



const Pokemon=()=>{
    let poke_types: string[]=[
      'normal',  
      'fire', 
      'water', 
      'electric', 
      'grass', 
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ];
    let type_num: string[]=[
      '#A8A77A',
      '#EE8130',
      '#6390F0',
      '#F7D02C',
      '#7AC74C',
      '#96D9D6',
      '#C22E28',
      '#A33EA1',
      '#E2BF65',
      '#A98FF3',
      '#F95587',
      '#A6B91A',
      '#B6A136',
      '#735797',
      '#6F35FC',
      '#705746',
      '#B7B7CE',
      '#D685AD',
    ];

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
        species:
        {
          name: string
          url: string
        }
        stats:
        {
          base_stat: number
        }[]
    }
    let type_color:string= "#A8A77A";
    const pokemon_id = useParams()["poke_id"];
    const [pokemon_det, setPokemonsDet] = useState<Pokemon>();
    const [desc, setdesc] = useState<string>();
    let describe: string= "";
    
    const fetchData = async (url:string) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setPokemonsDet(json);
          
          
        } catch (error) {
          console.log("error", error);
        }
      };
 
      useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        fetchData(url+pokemon_id!);
      }, []);


      useEffect(() => {
        // let  descUrl:string = "";
        // descUrl = (pokemon_det && pokemon_det.species.url)!;
        const descUrl = "https://pokeapi.co/api/v2/pokemon-species/"
        getDesc(descUrl+pokemon_id);
      }, []);


      const getDesc = async (descUrl:string) => {
        try{
          
          // var jsonax = (await axios.get(descUrl)).data
          const response = await fetch(descUrl);
          const json = await response.json();
          // describe = await (await axios.get(descUrl)).data.flavor_text_entries[0].flavor_text;
          setdesc(json.flavor_text_entries[1].flavor_text);
          describe = json.flavor_text_entries[1].flavor_text;
          
        }
        catch (error) {
          console.log("error", error);
        }
      }



      type numArr = number[];
      let place:numArr = []
      let more = false;
      var total = 0;
      pokemon_det && pokemon_det!.stats.forEach(element => {
        total += element.base_stat;
      });
      place[0]=  poke_types.indexOf((pokemon_det && pokemon_det.types[0]["type"]["name"])!);
      if(pokemon_det && pokemon_det.types.length> 1){
        place[1]=  poke_types.indexOf((pokemon_det && pokemon_det.types[1]["type"]["name"])!); 
        more= true;
      }

    return(
      
        <>
          <div className="container">
            <div className="header_comp_img">
              <img src={logo} alt="" />
            </div>
            <div className="discribtion_box">
              <div className="on_left">
              <>
              <h2>#0{pokemon_det && pokemon_det.id}</h2>
              <img src={pokemon_det && pokemon_det.sprites.front_default}/>
              <h1>{pokemon_det && pokemon_det.name}</h1>
              <div className="element_box">
              <>
                {document.documentElement.style.setProperty( '--colorVariable', type_num[place[0]])}
                </>
              <div className="poke_color">
                <p>{pokemon_det && pokemon_det.types[0]["type"]["name"]}</p>
                </div>
                <>
                {more===true && document.documentElement.style.setProperty( '--colorVariable2', type_num[place[1]])}
                </>
                <div className="poke_color2">
                <p>{more===true && pokemon_det && pokemon_det.types[1]["type"]["name"]}</p>
              </div>
              </div>
                
              
              </>
              </div>
             
              
                <div className="line">
                </div>
              <div className="discribtion_card">
                  <>
                  </>
                  <div className="pokemon_dis">
                    <>
                    <h4>Describtion</h4>

                    </>
                    <br></br>
                  <p>
                  {pokemon_det && desc && desc.replace(/[^a-zA-Zé ]/g, " ")}                  </p>
                  <br />
                  <br />
                  <h4>Stats</h4>
                    <br />
                    <br />
                  <div className="stats">
                    
                    <div className="column1">
                      <>
                      <p>HP: {pokemon_det && pokemon_det.stats[0].base_stat}</p>
                      </>
                      <>
                      <p>Attack: {pokemon_det && pokemon_det.stats[1].base_stat}</p>
                      </>
                      <>
                      <p>Defence: {pokemon_det && pokemon_det.stats[2].base_stat}</p>
                      </>
                    </div>
                    <div className="column2">
                    <>
                      <p>Special Atk: {pokemon_det && pokemon_det.stats[3].base_stat}</p>
                      </>
                      <>
                      <p>Special Def: {pokemon_det && pokemon_det.stats[4].base_stat}</p>
                      </>
                      <>
                      <p>Speed: {pokemon_det && pokemon_det.stats[5].base_stat}</p>
                      </>
                    </div>
                    <div className="column3">
                    <>
                      <p>Total: {pokemon_det && total}</p>
                      </>
                    </div>
                    


                  </div>
                  
                </div>
                </div>
                
            </div>
              
          </div>
        </>
      
    )
}
export default Pokemon;
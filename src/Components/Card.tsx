import React from "react";
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
type PokemonsArr = Pokemon[];
interface CardProps{
    pokemon: PokemonsArr
}

const Card=({pokemon}:CardProps):JSX.Element=>{
    return(
        <>
        {
                pokemon.map((item) => {
                    return (
                        <>  
                            <a href={item && "/Pokemon/" + item.id} className="card">
                            <div className="card" id={item.id} >
                                <h2>#{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                            </a>
                        </>
                    )

                })
        }

        </>
    )
}
export default Card;
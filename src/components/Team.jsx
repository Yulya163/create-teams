import React, { Component } from "react";
import { players } from "../exampleData";

export default function Team(props) {

    const { teamPlayers } = props;    

    return (
        <div className="team">
            <div className="team-name">
                {props.teamName}
            </div>            
            {
                teamPlayers.map(player => {                   
                    return (
                        <div key={player.id}>
                            <span 
                                className="team-player">
                                {player.name}
                            </span>
                            {
                                player.isHigh ?
                                <span className='is-high'>High</span> :
                                ''
                            }
                        </div>
                    )
                })
            }            
        </div>
    )
}
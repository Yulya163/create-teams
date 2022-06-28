import React from 'react';
import Player from './Player';


export function Players(props) {    

    //const { players = [] } = props;
    const { playersByUserId = [] } = props;
    const { changePlayerStatus } = props;

    const availablePlayers = playersByUserId.filter(player => player.isAvailable);    
    
    return (
        <>
            <div className="total-players">
                Total available players: <span>{availablePlayers.length}</span>
            </div>
            <div className="players">
                {
                    playersByUserId.length ? 
                    playersByUserId.map( playerByUserId => (
                            <Player 
                                key={playerByUserId.id} 
                                deletePlayer={props.deletePlayer}
                                changePlayerStatus={changePlayerStatus}                                
                                {...playerByUserId}
                            />
                        )
                    ) :
                    <h4>No players</h4>                
                }
            </div>     
        </>
    );   
}
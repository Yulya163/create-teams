import React from 'react';
import Team from './Team';

export default function Teams(props) {
    
    const { teams = [] } = props;

    return (
        <div className='teams'>
            {
                teams.length ? 
                teams.map( team => (
                        <Team 
                            key={team.teamId}  
                            {...team}
                        />
                    )
                ) :
                <h4>There are no teams yet</h4>                
            }
        </div>
    )

}
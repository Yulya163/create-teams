import React, { Component } from "react";
//import PlayerService from "../services/playersService";

export default class Player extends Component {    

    state = {
        isAvailable: this.props.isAvailable,
        isHigh: this.props.isHigh,
    }

  //playerService = new PlayerService();

    handleCheckboxChange = (evt) => {        
        this.setState({isAvailable: !this.state.isAvailable}); 
    }

    handleIsHighClick = (evt) => {        
        evt.target.classList.toggle('is-high');
        evt.target.classList.toggle('not-high');
        this.setState({isHigh: !this.state.isHigh});
    }

    render() {

        const { id, name, deletePlayer, changePlayerStatus } = this.props;
        const { isHigh } = this.state;
        
        return (
            <div className="player">
                <label>
                    <input                     
                        type="checkbox"
                        name="available"
                        value="available"
                        checked={this.state.isAvailable} 
                        onChange={async (evt) => {
                            await this.handleCheckboxChange(evt);
                            await changePlayerStatus(id, this.state);    
                                                   
                        }} 
                        id={id}
                    />   
                    {
                        this.state.isAvailable ? 
                        <>
                            <span className="name label-span">{name}</span>                            
                        </> :
                        <>
                            <span className="name label-span disabled">{name}</span>                           
                        </> 
                    }               
                </label>               
                {
                    this.state.isAvailable ? 
                    <div>
                        {
                            isHigh ? 
                            <span 
                                className='is-high'
                                onClick={async (evt) => {
                                    await this.handleIsHighClick(evt);
                                    await changePlayerStatus(id, this.state);   
                                }}
                            >High</span> : 
                            <span 
                                className='not-high'
                                onClick={async (evt) => {
                                    await this.handleIsHighClick(evt);
                                    await changePlayerStatus(id, this.state);   
                                }}
                            >High</span>
                        }
                        <button 
                            className="btn delete-btn"
                            onClick={() => deletePlayer(id)}
                            >X</button>
                        
                    </div> :
                    <div>
                        {
                            isHigh ? 
                            <span 
                                className='is-high disabled'
                                onClick={async (evt) => {
                                    await this.handleIsHighClick(evt);
                                    await changePlayerStatus(id, this.state);   
                                }}
                            >High</span> : 
                            <span 
                                className='not-high disabled'
                                onClick={async (evt) => {
                                    await this.handleIsHighClick(evt);
                                    await changePlayerStatus(id, this.state);   
                                }}
                            >High</span>
                        } 
                        <button 
                            className="btn delete-btn disabled"
                            onClick={() => deletePlayer(id)}
                            >X</button>
                    </div>
                }                
            </div>
        )
    }
}
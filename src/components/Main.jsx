import React, {Component} from 'react';
import InputLine from './InputLine';

import PlayerService from '../services/playersService';

import {Preloader} from './Preloader';
import {Players} from './Players';
import Hello from './Hello';

import Filter from './Filter';

import Teams from './Teams';

import getRandomInRange from '../utils';

export default class Main extends Component {    
    playerService = new PlayerService();

    state = {
        players: this.playerService.getLocalStoragePlayers() || [],
        playersByUserId: [],   
        loadingPlayers: true,  
        teams: [],             
        isCreateTeamsActivate: false,
    };

    deletePlayer = async (id) => { 
        await this.setState({playersByUserId: this.state.playersByUserId.filter(player => player.id !== id)});        
        await this.setState({players: this.state.players.filter(player => player.id !== id)});
        await this.playerService.setLocalStoragePlayers(this.state.players);         

        if (!this.state.players.length) {
            this.setState({teams: [], isCreateTeamsActivate: false});
        }
    }    

    deleteAllPlayers = async (userId) => { 
        await this.setState({playersByUserId: [], teams: [], isCreateTeamsActivate: false});
        await this.setState({players: this.state.players.filter(player => player.userId !== userId)});
        await this.playerService.setLocalStoragePlayers(this.state.players);        

        if (!this.state.players.length) {
            await this.setState({teams: [], isCreateTeamsActivate: false});
        }   
    }    

    addNewPlayer = async (value, property) => {        
        
        if (value) {  

            let newPlayer = {          
                userId: this.props.userId,      
                id: getRandomInRange(0, 10000),
                name: value,
                isHigh: property,
                isAvailable: true,
            };
            let count = 0;
            this.state.players.forEach(player => {
                count += 1;
                if (player.name.toLowerCase() === value.toLowerCase()) {                    
                    newPlayer.name = `${value} ${count}`;   
                }
            }); 

            await this.setState({players: [newPlayer, ...this.state.players]});            
            await this.setState({playersByUserId: [newPlayer, ...this.state.playersByUserId]});            
            await this.playerService.setLocalStoragePlayers(this.state.players);
        }
    }

    changePlayerStatus = async (playerId, status) => {

        const newPlayers = this.state.players.map(player => {
            if (player.id === playerId) {                          
                return {...player, isAvailable: status.isAvailable, isHigh: status.isHigh}
            }           
            return player;           
        });           
        const newPlayersByUserId = this.state.playersByUserId.map(player => {
            if (player.id === playerId) {                          
                return {...player, isAvailable: status.isAvailable, isHigh: status.isHigh}
            }           
            return player;           
        });           
        
        await this.setState({players: newPlayers});
        await this.setState({playersByUserId: newPlayersByUserId});
        await this.playerService.setLocalStoragePlayers(this.state.players);        
    }

    createTeamsActivate = () => { 
        this.setState({isCreateTeamsActivate: true});        
    }

    createTeamsArr = () => {

        const availablePlayers = this.state.players.filter(player => player.isAvailable);        
        
        const newTeams = [];

        if (availablePlayers && availablePlayers.length !== 0) {

            for (let i = 0; i < availablePlayers.length; i++) {
                
            }

            const someTeam = {
                teamId: getRandomInRange(0, 1000),
                teamName: `Team`,
                teamPlayers: availablePlayers,
            }
            newTeams.push(someTeam);
        }

        
        this.setState({teams: newTeams});
    }    

    getNumTeams = (numPlayers) => {

        const availablePlayers = this.state.players.filter(player => player.isAvailable);
        const numTeams = Math.floor(+availablePlayers.length / numPlayers); 

        console.log('numTeams =', numTeams);  
        return numTeams;     
    }
    getRemains = (numPlayers) => {

        const availablePlayers = this.state.players.filter(player => player.isAvailable);
        const remains = Math.floor(+availablePlayers.length % numPlayers);

        console.log('remains =', remains);  
        return remains;     
    }

    // divideIntoTeams = (numPlayers) => {

    //     const availablePlayers = this.state.players.filter(player => player.isAvailable);  
        
    //     const numTeams = Math.floor(+availablePlayers.length / numPlayers);
    //     const remains = Math.floor(+availablePlayers.length % numPlayers);
        
    //     console.log('numTeams =', numTeams);
    //     console.log('remains =', remains);        
    // }

    componentDidMount() {     
        
        const localStoragePlayers = this.playerService.getLocalStoragePlayers();
        
        if (localStoragePlayers) {
            const localStorageUserPlayers = localStoragePlayers.filter(player => player.userId === this.props.userId);
            this.setState({ playersByUserId: localStorageUserPlayers, loadingPlayers: false });
        } else {
            this.setState({ loadingPlayers: false });
        }
        
    }   
    // componentDidUpdate() {
    //     this.setState({ playersByUserId: localStorageUserPlayers });
    // }

    render() {
        const { loadingPlayers, players, playersByUserId, teams, isCreateTeamsActivate } = this.state;   
        const { login, logOut, userId } = this.props;     

        return (
            <main className='main'>
                <Hello login={login} logOut={logOut}/>
                <InputLine 
                    //players={players}
                    addNewPlayer={this.addNewPlayer}
                />               
                {
                    !loadingPlayers ? 
                    <Players 
                        players={players} 
                        playersByUserId={playersByUserId}
                        deletePlayer={this.deletePlayer}                                                
                        changePlayerStatus={this.changePlayerStatus}                   
                    /> : 
                    <Preloader />
                }  
                <button
                    className='delete-all-btn'
                    onClick={() => { 
                        alert('Do you want to remove all players?');
                        this.deleteAllPlayers(userId);
                    }}
                >Clear players list</button>

                <Filter 
                    players={players} 
                    getNumTeams={this.getNumTeams}
                    getRemains={this.getRemains}
                />
                
                {
                    isCreateTeamsActivate ? 
                    <button 
                        className='start-create update'
                        onClick={() => {
                            this.createTeamsActivate();
                            this.createTeamsArr(); 
                        }}
                    >Update teams</button> :
                    <button 
                        className='start-create'
                        onClick={() => {
                            this.createTeamsActivate();
                            this.createTeamsArr(); 
                        }}
                    >Create teams</button>
                }
                
                {
                    isCreateTeamsActivate ? 
                    <Teams 
                        teams={teams}
                    /> :  
                    null                 
                }              
            </main>
        )
    }
}
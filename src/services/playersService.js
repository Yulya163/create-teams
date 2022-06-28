export default class PlayerService {

    // getAllPlayers = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, received ${res.status}`);
    //     }
    //     return await res.json();
    // }   

    // getPlayer = async (id) => {        
    //     return await this.getAllPlayers(`/players/${id}`);        
    // }   
    
    setLocalStoragePlayers = (players) => {
        localStorage.setItem('players', JSON.stringify(players));
    }

    getLocalStoragePlayers = () => {
        return JSON.parse(localStorage.getItem('players'));
    }

    // removeLocalStoragePlayers = (item) => {
    //     localStorage.removeItem(item); 
    // }    
}
export default function Filter(props) {
    const { getRemains, getNumTeams } = props;    
    return (
        <div className="filter-btns">
            <button 
                className="filter-btn" 
                onClick={() => {
                    getNumTeams(3);
                    getRemains(3);
                }
            }>3 teams</button>
            <button 
                className="filter-btn" 
                onClick={() => {
                    getNumTeams(4);
                    getRemains(4);
                }
            }>4 teams</button>
            <button 
                className="filter-btn" 
                onClick={() => {
                    getNumTeams(5);
                    getRemains(5);
                }
            }>5 teams</button>
        </div>
    )
}
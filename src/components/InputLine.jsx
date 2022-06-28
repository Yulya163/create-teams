import React, {Component} from 'react';

export default class InputLine extends Component {   

    state = {
        isHigh: false,
        value: '',
    }

    changeHigh = (evt) => {
        this.setState({isHigh: !this.state.isHigh})
    }
        
    checkName = (evt) => {

        const MAX_NAME_LENGTH = 18;

        if (evt.target.value.length > MAX_NAME_LENGTH) {
            evt.target.setCustomValidity (`Too long, delete ${evt.target.value.length - MAX_NAME_LENGTH} letters`)
        } else {
            evt.target.setCustomValidity('');
        }    
        evt.target.reportValidity();  
    }

    resetForm = () => {
        this.setState({value: '', isHigh: false})     
    }

    onInputChange = (evt) => {
        this.setState({value: evt.target.value})        
    }

    render() {
        const { addNewPlayer } = this.props;
        return (       
            <form 
                className="input-line"
                onSubmit={(evt) => {
                    evt.preventDefault();
                    addNewPlayer(this.state.value, this.state.isHigh);                    
                    this.resetForm();
                }}>
                <input 
                    className="input-name" 
                    type="text" 
                    name="name"
                    placeholder="Enter new player name"
                    onInput={this.checkName}
                    onChange={this.onInputChange}
                    value={this.state.value}
                />
                <label>
                    <input                     
                        type="checkbox"
                        name="isHigh"
                        value=""
                        onChange={this.changeHigh}
                        checked={this.state.isHigh}
                    />
                    <span className="label-span"></span>
                </label>                       
                <button 
                    className="btn add-btn" 
                    type='submit'                    
                >+</button>
            </form>        
        )
    }
}
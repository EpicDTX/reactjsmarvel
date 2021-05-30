import React from 'react';
import {data} from "./data";
import logo from "./marvel-logo.png"

class Character extends React.Component {
  render(){
    const character = this.props.character;
    let position = character.position;
    if(position === null){
      position = "Select a Position"
    }

    if(character.name === null){
      return(
        <div className="character">
          <img className="character-image" src={logo} alt="marvel logo"></img>
          <p className="position">{position}</p>
          <hr className="hr" />
        </div>
      );
    }else{
      return(
        <div className="character">
          <img className="character-image" src={`${character.image}.${character.extension}`} alt={character.name}></img>
          <p className="position">{position}</p>
          <hr className="hr" />
          <p>{character.name}</p>
          <p>{character.description}</p>
          <p>Character is part of:</p>
          <div className="series">
            <ul className="seriesList">
              {character.series}
            </ul>
          </div>
        </div>
      );
    }
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      image: null,
      extension: null,
      description: null,
      series: null,
      position: this.props.position,
      fixedPosition: this.props.fixedPosition,
    };
    this.handleCharacterChange = this.handleCharacterChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCharacterChange(event){
    if(event.target.value !== null){
      const result = data.data.results.find(result => result.name === event.target.value);
      this.setState({
        name: result.name,
        image: result.thumbnail.path,
        extension: result.thumbnail.extension,
        description: result.description,
        series: result.series.items.slice(0,3).map((item, i) => <li key={i} value={item.name}>{item.name}</li>),
      });
    }
  };

  handlePositionChange(event){
    if(event.target.value !== null){
      this.setState({
        position: event.target.value,
      });
    }
  };

  /* handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
 */
  render() {
    let characters = data.data.results.map(({name, id}) => <option key={id} value={name}>{name}</option>);
    const positions = [{id: 1, position: "Attacker"}, {id: 2, position: "Defender"}, {id: 3, position: "Supporter"}];
    let positionList = positions.map((item) => <option key={item.id} value={item.position}>{item.position}</option>);

    if(this.state.fixedPosition === false) {
      return(
        //<form onSubmit={this.handleSubmit}>
        <div className="card">
          <Character character={this.state} />
          <div className="select-div">
            <select className="select" value={this.state.name} onChange={this.handleCharacterChange}>
              <option value="" disabled selected>Select a Character</option>
              {characters}
            </select>
            <select className="select" value={this.state.position} onChange={this.handlePositionChange}>
              <option value="" disabled selected>Select their Position</option>
              {positionList}
            </select>
          </div>
        </div>
        //<input type="submit" value="Submit" />
        //</form>
      );
    }else{
      return(
        <div className="card">
          <Character character={this.state} />
          <div className="select-div">
            <select className="select" value={this.state.name} onChange={this.handleCharacterChange}>
              <option value="" disabled selected>Select a Character</option>
              {characters}
            </select>
          </div>
        </div>
      );
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {position: ["Attacker", "Defender", "Supporter", null], fixedPosition: [true, false]}
  }
  render() {
    return(
      <div>
        <h1 className="title">Marvel Team</h1>
        <p></p>
        <div className="app">
          <Player position={this.state.position[0]} fixedPosition={this.state.fixedPosition[0]} />
          <Player position={this.state.position[0]} fixedPosition={this.state.fixedPosition[0]} />
          <Player position={this.state.position[1]} fixedPosition={this.state.fixedPosition[0]} />
          <Player position={this.state.position[2]} fixedPosition={this.state.fixedPosition[0]} />
          <Player position={this.state.position[3]} fixedPosition={this.state.fixedPosition[1]} />
          <Player position={this.state.position[3]} fixedPosition={this.state.fixedPosition[1]} />
        </div>
      </div>
    );
  }
}

export default App;



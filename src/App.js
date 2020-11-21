import React from 'react';
import {data} from "./data";

class Character extends React.Component {
  render(){
    const character = this.props.character;
    return(
      <div>
        <p>{character.name}</p>
        <img className="character-image" src={`${character.image}.${character.extension}`}></img>
      </div>
    );
  }
}

class CharacterList extends React.Component {
  render() {
    let characters = data.data.results.map(({name, id}) => <option key={id} value={id}>{name}</option>)
    return(
      <div>
        <select onChange={e => {this.props.handleChange(e.target.value)}}>
          {characters}
        </select>
      </div>
    );
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = {
      name: data.data.results[0].name,
      image: data.data.results[0].thumbnail.path,
      extension: data.data.results[0].thumbnail.extension,
      position: null,
    };
  }

  handleChange(selected){
    let character = data.data.results.find((element) => {return element.id === selected;});
    this.player.name = character.name;
    this.player.image = character.thumbnail;
  };

  render() {
    return(
      <div>
        <Character character={this.player} handleChange={() => this.handleChange} />
        <CharacterList />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return(
        <div className="App">
          <Player />
        </div>
    );   
  }
}

export default App;
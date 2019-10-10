import React from 'react'
import axios from 'axios'

class CharacterShow extends React.Component {
  
  constructor() {
    super()

    this.state = {
      character: ''
    }
  }

  componentDidMount() {
    const characterId = this.props.match.params.id
    // console.log('HEREEEEE', characterId)
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(res => this.setState({ character: res.data }))
      .catch(err => console.log(err))
      
  }
  render() {
    console.log(this.state)
    const { character } = this.state 
    
    return (
      <>
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} />
        <div>
          <h4>Species:</h4>
          <p>{character.species}</p>
        </div>
        <div>
          <h4>Status:</h4>
          <p>{character.status}</p>
        </div>
        <div>
          
          
        </div>
      </>
    )
  }
}

export default CharacterShow 
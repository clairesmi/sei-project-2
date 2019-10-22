import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      episodes: [
      ],
      characters: [],
      ep: '',
      random: '',
      images: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)


  }

  componentDidMount() {
    Promise.all([
      axios.get('https://rickandmortyapi.com/api/episode'),
      axios.get('https://rickandmortyapi.com/api/character')
    ])
      .then(res => {
        this.setState({ episodes: res[0].data.results , characters: res[1].data.results })
      })
      .catch(err => console.log(err))
  }

  handleChange(e) {
    // console.log(event.target.value)
    this.setState({ ep: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('sub')
    const a = this.state.episodes.filter(episode => episode.name === this.state.ep).pop().id
    console.log(a)
    this.props.history.push(`/episodes/${a}`)
  }

  handleClick() {
    this.setState({ 
      random: { ...this.state.episodes[Math.floor(Math.random() * this.state.episodes.length)] } 
    }, this.getCharacters)
  }

  getCharacters() {
    Promise.all(this.state.random.characters.map(character => axios.get(character)))
      .then(res => {
        const images = res.map(r => r.data.image)
        const characters = res.map(r => r.data)
        console.log(characters)
        this.setState({ images })
      })
      .catch(err => console.log(err))
  }

  render() {

    
    return (
      <section className="hero">

        <div className="left">
          <div className="characters">
            <Link to={'/characters'} className="characterTitle">View characters</Link>     
          </div>

     
          <div className="top-left">
            <h2>Select an episode:</h2>
            <form className="dropdown" onSubmit={this.handleSubmit}>
              <select onChange={this.handleChange} name="episode">
                {this.state.episodes.map(episode => {
                  return <option key={episode.id}> {episode.name}</option>
                })}
              </select>
              <button className="goButton">Go!</button> 
            </form>
          </div>
        </div>

        <div className="right">  
          <h2>Let us choose an eposide for you...</h2>   
          <button onClick={this.handleClick}>Click me!</button>
          <div>
            <p>{this.state.random.name}</p> 
            <p>{this.state.random.air_date}</p> 
            <div>
              {this.state.images && this.state.images.map(image => {
                return <img className="smallImage" key={image} src={image} />
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
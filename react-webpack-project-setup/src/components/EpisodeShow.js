import React from 'react'
import axios from 'axios'


class EpisodeShow extends React.Component{
  constructor(){
    super()

    this.state = {
      episode: ''
    }
  }

  componentDidMount() {
    const episodeId = this.props.match.params.id
    console.log('hi', episodeId)
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(res => this.setState({ episode: res.data }))
      .catch(err => console.log(err))
  }
  
  render() {
    console.log('HERE', this.state.episode.name)
    //const { episode } = this.state
    return (
      <h1>{this.state.episode.name}</h1>
    )
  }
}

export default EpisodeShow
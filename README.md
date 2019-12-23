![General Assembly Logo](/src/assets/ga-logo.png)
# Software Engineering Immersive – Project 2

This was my second project of the Software Engineering Immersive course – week 6 

# Rick & Morty FunPage 	

This is a website built using an API for the animated TV series Rick & Morty. It provides the user with information on each character featured in the show and also on each episode. The project was a pair coding project and my partner was Gerardo Siebels. 


## Built with

1.	React
2.	https://rickandmortyapi.com/
3.	GitHub
4.	Sass

## Deployment 

This website is deployed on Heroku at http://rick-morty-fun.herokuapp.com/

## Getting Started

Use the clone button to download the website source code. From the root directory type 'npm run serve' in the terminal. The project wil run on localhost:8000.


## Website Architecture

The app is composed of a Home/Index page, a character index page, a character show page and an episode show page with a navbar containing links.

### 1.	Home/Index Page 

This has 3 sections 

a.	A section with a select/dropdown menu that lists the specific episodes available on the API – the user can select and episode, click the ‘Go’ button and will then be taken to the show page of that particular episode. 

b.	A section with a button labelled ‘View Characters’ – when clicked, the user will be taken to a character index page

c.	‘Let us choose a random episode for you...’ There is a button labelled ‘Click Me!’ in the third section, when clicked the section will display a randomly chosen episode with episode name, air date, and characters featured in that episode. 

Below is an excerpt of code from the Home Page which was built as a classical React component.

```
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

```


![Home Page screenshot](/src/assets/home-page.png)


2.	Episode show page 

A classical React component using get requests to the API, this page displays information about the episode that the user has selected on the home page. 
Name and air date are displayed
Two get requests were needed to access both the episode information and the character information and this was achieved as per the below code snippet


3.	Character index page 

A classical React component using a map function to list and display every character featured on the API. The user is able to click on a character image of their choice to go to the character show page to view more detail on that character 

```
componentDidMount() {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(res => this.setState({ characters: res.data.results }))
      .catch(err => console.log(err))
  }


  render() {
    console.log('id check', this.state)
    //const { id } = this.state
    // if (!this.state.results) return null
    return (
      <section className="characterIndex" >
        <div className="">
          <h1>Characters</h1>
          <ul>
            {this.state.characters.map(character => (
              <Link key={character.name} to={`/characters/${character.id}`}>
                <li className="characterDisplay"> {character.name}<img src={character.image} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    )
  ```



![Character Index screenshot](/src/assets/character-index.png)



4.	Character show page 
A classical React component that displays each character by their unique ID key. The user can view more information about the character they have clicked on the index page. They are shown the character’s name and their status.



### Challenges and future improvements  

In order to display the images we wanted for the character show page, we had to access the character URLs and then make more axios get requests to map through the list of URLs to retrieve the character images. This was a new process for us and so took a while to work through 

```
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
  ```
  

We would like to add some more functionality such as a quiz or external links to episodes and episode synopses. We would also like to add the character index page to the nav bar so that the user can always access that page easily and directly. 

We would also like to look at adding some different transitions to the pages to make the app look and feel a bit more dynamic.


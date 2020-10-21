import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor () {
        super()
        this.state= {
            topText: "",
            bottomText: "",
            imageRandom: "https://a.wattpad.com/cover/124953613-352-k369471.jpg",
            allMmemesImg: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes[1].url)
            this.setState({
                allMmemesImg : memes
            })
        }
      )

    }

    handleChange = (event) => {
        const {name, value } = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randmNum = Math.floor(Math.random() * this.state.allMmemesImg.length)
        const randomMeme = this.state.allMmemesImg[randmNum].url
        this.setState({
            imageRandom : randomMeme
        })
    }

    render() {
        return(
            <div>
            <form className="meme-form" onSubmit={this.handleSubmit}>
                <input
                name ="topText"
                value = {this.state.topText}
                onChange={this.handleChange}
                placeholder = "Top Text"
                />    
                 <input
                name ="bottomText"
                value = {this.state.bottomText}
                onChange={this.handleChange}
                placeholder = "Bottom Text"
                />    
                <button>Gen</button>
              
            </form>
                <div className="meme">
                    <img src={this.state.imageRandom}
                    alt = ""
                    />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
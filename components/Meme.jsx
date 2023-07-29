import { useState,useEffect } from "react";
export default function Meme() 
{
    const [Meme, setMeme] = useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        })
    
    
    
    const [Allmeme,setAllmeme] = useState([]);
    
    useEffect(() => 
    {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json()) 
        .then(data => setAllmeme(data.data.memes))
       },[])
    
    function getRandomImg() {
        const number = Math.floor(Math.random() * Allmeme.length)
        const images = Allmeme[number].url
        setMeme(prevMeme => (
            {
                ...prevMeme,
                randomImage: images
            }
        ))
    }
    function handlevent(event) 
    {
      const {name,value} = event.target
      setMeme(prevValue => ({
            ...prevValue,
            [name]: value
        }
      ))
    }
    
    
    return (
        <main>
            <div className="form" >
            <input name = "topText" value={Meme.topText} onChange={handlevent} className ="Input" type = "text" placeholder="FirstLine"></input>
            <input name = "bottomText" value={Meme.bottomText} onChange={handlevent} className ="Input" type = "text" placeholder="SecondLine"></input>
            <button onClick = {getRandomImg} className="form-btn">Get a new Image</button>
            </div>
            <div className="meme">
            <img src = {Meme.randomImage} className="meme-image" alt = "meme-img" />
            <h2 className="meme--text top">{Meme.topText}</h2>
            <h2 className="meme--text bottom">{Meme.bottomText}</h2>
            </div>
        </main>
    )
}
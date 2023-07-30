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
    function downloadMeme() {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const context = canvas.getContext("2d");
      
        const img = new Image();
        img.crossOrigin = "anonymous"; // Allow cross-origin loading of the image
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
      
          // Add top text to the canvas
          context.font = "30px Arial";
          context.fillStyle = "black";
          context.textAlign = "center";
          context.fillText(Meme.topText, canvas.width / 2, 40);
      
          // Add bottom text to the canvas
          context.fillText(Meme.bottomText, canvas.width / 2, canvas.height - 20);
      
          // Convert the canvas content to a data URL
          const dataUrl = canvas.toDataURL("image/jpeg");
      
          // Create a temporary anchor element and trigger the download
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "meme.jpg";
          link.click();
        };
      
        img.src = Meme.randomImage;
      }
    
    return (
        <main>
            <div className="form" >
            <input name = "topText" value={Meme.topText} onChange={handlevent} className ="Input" type = "text" placeholder="FirstLine"></input>
            <input name = "bottomText" value={Meme.bottomText} onChange={handlevent} className ="Input" type = "text" placeholder="SecondLine"></input>
            <button onClick = {getRandomImg} className="form-btn">Get a new Image</button>
            </div>
            <button onClick={downloadMeme} className="btn">Download Meme</button>
            <div className="meme">
            <img src = {Meme.randomImage} className="meme-image" alt = "meme-img" />
            <h2 className="meme--text top">{Meme.topText}</h2>
            <h2 className="meme--text bottom">{Meme.bottomText}</h2>
            </div>
        </main>
    )
}
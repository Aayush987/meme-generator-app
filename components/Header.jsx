import image from "../Images/troll-face.png"

export default function Header() 
{
    return (
      <header style = {{display: "flex", flexDirection: "row",color: "white",justifyContent: "space-evenly", background: "linear-gradient(90deg, #672280 0%, #A626D3 100%)",boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
    }}>
        <img style = {{paddingTop: "5px",width: "50px", height: "50px"}} src = {image} alt = "icon" />
        <h1>Meme Generator</h1>
    </header>
    )
}
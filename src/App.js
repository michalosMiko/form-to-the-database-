import { projectFirestore } from "./firebase/config"
import { useState, useEffect} from "react"


 
 const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  // useState pro formulář
  const [movieTitle, setMovieTitle] = useState("")
  const [movieAge, setMovieAge] = useState(null)
  const [movieTime, setMovieTime] = useState(null)

  useEffect( () => {
    // název Start collection v Firestore database pozor
    const unsubscribe = projectFirestore.collection("movies").onSnapshot( (snapshot) => {
      
      if (snapshot.empty){
        setError("Žádné filmy k vypsání")
        setData([])
      } else {
        let result = []
       snapshot.docs.forEach( (oneMovie) => {
        result.push( {id: oneMovie.id, ...oneMovie.data()} )
       })
      //  console.log(result); video 23
       setData(result)
       setError("")
      }
      // error v26
    }, err => setError(err.message) )
    
    return () => unsubscribe()

  }, [])

  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete()
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!movieTitle || movieTitle.trim() === "" || !movieAge || !movieTime) {
      setError("Vyplňte prosím všechna pole.")
      return
    }
    // podmínka kontroluje, zda jsou všechna pole vyplněna a nejsou prázdná nebo null


  //  const newMovie = {title, minage, time}
    const newMovie = {title: movieTitle, minage: movieAge, time: movieTime}

    try {
      await projectFirestore.collection("movies").add(newMovie)
      setMovieTitle("")
      setMovieAge("")
      setMovieTime("")
    } catch (err) {
      setError("Film nebyl přidán" + err.message)
    }

   
  }

   return <div className="all-movies">
{/*min="0"   max="0"  omezení hodnoty */}
  <form className="form" onSubmit={submitForm}>
    
    <input type="text"
    className="input"
      onChange={ (e) => setMovieTitle( e.target.value )}
       placeholder="Název filmu"
       value={movieTitle}/>
       
      
    <input type="number"
    className="input"
     onChange={ (e) => setMovieAge( e.target.value )} 
     placeholder="Minimální věk" min="0"
     value={movieAge}/>
     
    
    <input type="number" 
    className="input"
     onChange={ (e) => setMovieTime( e.target.value )}
      placeholder="Doba trvání" min="0"
      value={movieTime}/>
  
    <input type="submit" value="přidat"/>
  </form>

    {error && <p>{error}</p>}
    {data.map( (oneMovie) => {
      const {id, title, minage, time} = oneMovie

      return <div key={id} className="one-movie">
            <p>{title}, {time} minut, {minage}+</p>
            <button type="button" onClick={ () => deleteMovie(id) }>Smazat</button>

      </div>

    } )}
   </div>
 }
 
 export default App
import React, {Component} from "react";
//carParkObjectsArray matches export array from CarParkArray file
import {carParkObjectsArray} from "./CarParkArray";
//spotifyArray matches export array from SpotifyLibrary file
import {spotifyArray} from "./SpotifyLibrary";
//declare constants 
const spotifyLibraryArray = spotifyArray;
const parkingArray = carParkObjectsArray;
//function to filter car park array objects based on id, inside of flexible function
function flexibleIdSearch(id) {
  return function (carObject) {
    return carObject.parking_id === id;
  }
}
function flexibleSpotifyIdSearch(id){
  return function (spotifyObject){
    return spotifyObject.ID === id;
  }
}
function flexibleSpotifyArtistSearch(artistSearch){
  return function(spotifyObject){
    // making case insensitive search work
    let cArtist = spotifyObject.artist.toLowerCase();
    let sArtist = artistSearch.toLowerCase();
    return cArtist.includes(sArtist);
    // case sensitive search
    // return spotifyObject.artist.includes(artistSearch);
  }
}
// function to add up duration of spotify library using reduce function
function getLibraryDuration(acc, obj){
  return acc + obj.dur;
}

class App extends Component {
  // creating state objects upVote and downVote
  constructor(props) {
    super(props);
    // create property spotifyArray(glboalArray)
    this.state = {upVotes: 0, downVotes: 0, count: 0, searchTerm: " ", len: 0, globalArray: spotifyLibraryArray};
    // bind the button event handler
    this.handleUpVoteButtonClick = this.handleUpVoteButtonClick.bind(this);
    this.handleDownVoteButtonClick = this.handleDownVoteButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
    this.handleUpTo10ButtonClick = this.handleUpTo10ButtonClick.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  }
  // function to define what happens when upVote button is clicked
  handleUpVoteButtonClick(){
    // define starting point
    let currUpVote = this.state.upVotes;
    // define increment by 1 on click
    let nextUpVote = currUpVote + 1;
    // change state
    this.setState({upVotes : nextUpVote});
  };
  // function to define what happens when downVote button is clicked
  handleDownVoteButtonClick(){
    let currDownVote = this.state.downVotes;
    let nextDownVote = currDownVote + 1;
    this.setState({downVotes: nextDownVote});
  };
  // function to define what happens when reset button clicked
  handleResetButtonClick(){
    this.setState({upVotes: 0, downVotes: 0, count: 0});
  };
  // function for UpTo10 button
  handleUpTo10ButtonClick(){
    let currCount = this.state.count;
    let nextCount = currCount + 1;
    if(currCount<10){
      this.setState({count: nextCount});
    };
  }
    // method called when search form changes, JS creates the event
     // re-assign the state variable searchTerm to 'event' an JS keywword. JS creates the event for us
  onSearchFormChange(event){
    this.setState({searchTerm: event.target.value});
    let sTerm = event.target.value; //typed in value
    let numChars = sTerm.length;
    this.setState({len: numChars});
  }  
  
  render(){
  return (
    <div className="App">
      <h1>CS385 Revision</h1>

      {/* Car Park Array flexible filter and map function */}
      <h2>Car Parking Array Filter Function</h2>
      <table border = '1'>
        <tr>
              <th>Car Parking ID</th>
              <th>Car Reg</th>
              <th>Car Occupants</th>
        </tr>  
       <tbody>
        {parkingArray.filter(flexibleIdSearch(4)).map((c) => (
        <tr key = {c.parking_id}>
            <td>{c.parking_id}</td>
            <td>{c.car_reg}</td>
            <td>{c.num_occupants}</td> 
         </tr>
         ))}
         </tbody>
        </table>

      {/* Spotify library array flexible filter and map function */}
      <h2>Spotify Library Array Filter Function</h2>
      {spotifyLibraryArray.filter(flexibleSpotifyIdSearch(4)).map((s) => (
        <div key = {s.ID}>
          {s.ID}<br />
          {s.title}<br />
          {s.artist}
        </div>
        ))}

      {/* Spotify library array flexible filter and map function */}
      <h2>Spotify Library Array Filter Function Artist Search</h2>
      {spotifyLibraryArray.filter(flexibleSpotifyArtistSearch("eminem")).map((q) => (
        <div key = {q.ID}>
          {q.ID}<br />
          {q.title}<br />
          {q.artist}
        </div>
        ))}
        <h3>Duration of filtered artist songs</h3>
        {spotifyLibraryArray.filter(flexibleSpotifyArtistSearch("kesha")).reduce(getLibraryDuration,0)}

        {/* Reduce function to add up duration of Spotify Library */}
        <h2>Reduce function to add up duration of Spotify Library</h2>
        {spotifyLibraryArray.reduce(getLibraryDuration,0)}
        
      {/* Up and Down Vote Buttons  */}
      <h2>Up and Down Vote Buttons</h2>
      Current UpVotes: {this.state.upVotes}
      {/* button handler function is being passed from here parent, to child, using this.props */}
      <UpVote buttonHandler = {this.handleUpVoteButtonClick}/>
      Current DownVotes: {this.state.downVotes}
      <DownVote buttonHandler = {this.handleDownVoteButtonClick}/>
      <Reset buttonHandler = {this.handleResetButtonClick}/>
      Current Count: {this.state.count}
      <UpTo10 buttonHandler = {this.handleUpTo10ButtonClick}/>
      {/* Search Form */}
      <h2>Search Form</h2>
      The search term is: {this.state.searchTerm}
      and length is: [{this.state.len}]
      <SearchForm 
      // from constructor to here, then to child by this.props
        searchTerm={this.state.searchTerm}
        onChange={this.onSearchFormChange}
      />
      <SearchResults 
      // used to create filter function to print only searched results
      searchTerm= {this.state.searchTerm}
      // used in child to print entire array 
      spotifyArray = {this.state.globalArray}
      />


     </div>
  );
}
}

// UpVote Component
class UpVote extends Component {
  render() {
    // buttonHandler has been passed here from parent using this.props in child
    const buttonHandler = this.props.buttonHandler;
    return(
      <div className = "UpVoteComponent">
        This is the Up Vote Component
        <button onClick={buttonHandler}>Up Vote</button>
      </div>
    );
  }
}
//DownVote Component
class DownVote extends Component {
  render() {
    // buttonHandler has been passed here from parent using this.props in child
    const buttonHandler = this.props.buttonHandler;
    return(
      <div className = "DownVoteComponent">
        This is the Down Vote Component
        <button onClick={buttonHandler}>Down Vote</button>
      </div>
    );
  }
}
// Reset Component
class Reset extends Component {
  render() {
    // buttonHandler has been passed here from parent using this.props in child
    const buttonHandler = this.props.buttonHandler;
    return(
      <div className = "ResetComponent">
        This is the Reset Component
        <button onClick={buttonHandler}>Reset</button>
      </div>
    );
  }
}

class UpTo10 extends Component {
  render() {
    const buttonHandler = this.props.buttonHandler;
    return(
      <div className = "UpTo10Component">
        This button only counts up to 10
        <button onClick={buttonHandler}>Count</button>
        </div>
    )
  }
}

class SearchForm extends Component {
  render() {
    // from app parent to here using this.props
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    return(
      <div className = "SearchForm">
        Search form:<br/>
        {/* form tag */}
        <form>
          <b>Type your search here: </b>
          {/* input tag */}
          <input type="text"
          // value is the property of the text box which displays what is being typed into search box
          // onChange is the reserved event trigger and now connected to the function onSearchFormChange(event)
            value={searchTermFromProps}
            onChange={onChangeFromProps}
            />
        </form>
      </div>
    );
  }
}
// create search results component
class SearchResults extends Component {
  spotifySearchFilterFunction(searchTerm){
    return function(searchObject){
      let songTitle = searchObject.title;
      let songArtist = searchObject.artist;

      return(
        (searchTerm !== "") &&
        (songTitle.includes(searchTerm)||songArtist.includes(searchTerm))
      );
    };
  }
  render() {
    // pass in search term tto be used in a filter function
    const searchTermFromProps = this.props.searchTerm;
    // this is used to print entire array
    const spotifyArrayParameter = this.props.spotifyArray;
    // count how many results
    let numberResults = spotifyArrayParameter.filter(this.spotifySearchFilterFunction(searchTermFromProps)).length;
    return(
      <div className = "SearchResults">
        <h1>Search Results</h1>
        <b>Number of Results Found:</b> [{numberResults}];
        {spotifyArrayParameter.filter(this.spotifySearchFilterFunction(searchTermFromProps)).map((s) => (
          <div key = {s.ID}>
            {s.artist}
            {s.title}
            </div>
        ))}
      </div>
    );
  }
}


export default App;
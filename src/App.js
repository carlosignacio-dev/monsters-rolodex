import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');//1st State
  const [monsters, setMonsters] = useState([]);//2nd State
  const [filteredMonsters, setfilteredMonsters] = useState(monsters);//3nd State

  useEffect(() => {
    console.log("Effect fired");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);
  
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setfilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search Monsters"
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;



// componentDidMount() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then((users) => this.setState(() => {
//       return {monsters: users}
//     },
//     () => {
//       console.log(this.state);
//     }
//     ))
// }

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">  
//         <h1 className="app-title">Monsters Rolodex</h1>
//       <SearchBox onChangeHandler={onSearchChange} 
//       placeholder="Search Monsters"
//       className="monsters-search-box"/>

//       <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }


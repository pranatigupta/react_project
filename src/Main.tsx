import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserGrid from './components/UserGrid';
import { useEffect, useState } from 'react';
import DetailsPage from './components/DetailsPage';
import './App.css';
import Character from './interface/Character';


function Main() {
    const [users, setUsers] = useState<Character[]>([])
    useEffect(()=>{
        // Define the async function
        const fetchData = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const result = await response.json();
            setUsers(result.results)
        } catch (error) {
            console.log("error while fetching data: " , error);
        }
        }

    // Call the async function
    fetchData();
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserGrid users = {users} />} />
        <Route path="/user/:userId" element={<DetailsPage users = {users} />} />
      </Routes>
    </Router>
  );
}

export default Main;
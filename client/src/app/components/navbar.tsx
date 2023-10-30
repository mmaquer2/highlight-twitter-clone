import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Navbar.module.css';
import { generalSearch } from '../api/search.api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../globals.css'


function Navbar() {
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("searching...");
    console.log(searchInput);
    const data = await generalSearch(searchInput);
    console.log("data from search api call");
    console.log(data);

    //TODO: handle search funciton for finding users, and trending topics

  };

  async function goToUserSettings() {
    console.log("go to user settings button pressed!");
  }

  async function goToUserTimeline() {
    console.log("go to user timeline button pressed!");
  }

  async function gotoDashboard() {
    console.log("go to dashboard button pressed!");
  };

  async function handleLogout() {
    console.log("logout button pressed!");
  }

  function handleMore() {
    console.log("more button pressed!");
  }

  return (
    <div className={styles.navbar}>

      <div className={styles.logo}>
        <Image width={3} height={3} src="/path-to-your-logo.png" alt="Logo" />
      </div>

     
      <div className={styles.menu}>

        <button className={styles.button} type='submit' onClick={gotoDashboard}>Dashboard</button>
        <button className={styles.button} type='submit' onClick={goToUserTimeline}>User Timeline</button>

        <input onChange={(e)=>{setSearchInput(e.target.value)}} placeholder='search'></input>
        <button className={styles.button} type='submit' onClick={handleSearch}>Search</button>
    

      <button className={styles.button} type='submit' onClick={goToUserSettings}>User Settings</button>

      <button className={styles.button} type='submit' onClick={handleLogout}>Logout</button>
      </div>


    </div>
  );
}

export default Navbar;



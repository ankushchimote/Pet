// Home.js
import React from 'react';
import bk from './assets/bk.jpg'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
   <>
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bk})` }}>
      <div className="text-white text-4xl font-bold flex flex-col align-middle justify-center bg-cover h-screen bg-blue-400 opacity-80">
      <h1>Welcome to the Pet Finder </h1>
      <p>Click on the  the search to find your perfect pet!</p>
      <button className=' p-3 bg-black w-60 mx-auto my-3 cursor-pointer rounded-2xl hover:bg-red-600 hover:text-white text-rose-700 '><Link to="/search" >Go to Search</Link></button>
      </div>
    </div>
   </>
  );
};

export default Home;

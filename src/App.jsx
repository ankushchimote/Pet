import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import PetList from "./components/PetList";
import { ImSpinner } from "react-icons/im";
import Eror from "./components/Eror";
import { Link } from "react-router-dom";
import bk from './assets/bk.jpg'
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [breed, setBreed] = useState("");
  const [state, setState] = useState("");
  const [animal, setAnimal] = useState("");
  const [city, setCity] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://pets-v2.dev-apis.com/pets");
        const data = await response.json();
        setPets(data.pets);
        setFilteredPets(data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let filtered = pets;

    if (searchQuery) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (breed) {
      filtered = filtered.filter(
        (pet) => pet.breed.toLowerCase() === breed.toLowerCase()
      );
    }

    if (animal) {
      filtered = filtered.filter(
        (pet) => pet.animal.toLowerCase() === animal.toLowerCase()
      );
    }

    if (state) {
      filtered = filtered.filter(
        (pet) => pet.state.toLowerCase() === state.toLowerCase()
      );
    }

    if (city) {
      filtered = filtered.filter(
        (pet) => pet.city.toLowerCase() === city.toLowerCase()
      );
    }

    setFilteredPets(filtered);
    setError(filtered.length === 0 ? <Eror /> : "");
    setCurrentPage(1); // Reset to the first page on filter change
  }, [searchQuery, breed, state, city, animal, pets]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleAnimalChange = (event) => {
    setAnimal(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  if (loading) {
    return (
      <div>
        <ImSpinner className="mx-auto text-4xl mt-20"/>
      </div>
    );
  }

  return (
    <Router>
      <div className="text-center bg-cover bg-center h-full" style={{ backgroundImage: `url(${bk})`}}>
        <div className="bg-cover h-full bg-blue-400 opacity-80">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <>
                <div className="bg-black p-3">
                <button className="bg-orange-600 text-xl mt-4 mb-4 hover:bg-red-600 rounded-xl font-extrabold p-4"><Link to="/" >Home</Link></button>
                <div className="flex justify-around gap-14 mx-14">
                  <input
                    type="text"
                    placeholder="Search pets by name"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    className="p-2 rounded border-1 w-4/5 max-w-72"
                  />
                  <select value={breed} onChange={handleBreedChange} className="cursor-pointer p-2 rounded border-1 w-4/5 max-w-72">
                    <option value="">All Breeds</option>
                    <option value="Havanese">Havanese</option>
                    <option value="Goldendoodle">Goldendoodle</option>
                    <option value="Boxer">Boxer</option>
                    <option value="Wheaten Terrier">Wheaten Terrier</option>
                    <option value="Cockatoo">Cockatoo</option>
                    <option value="Horned Lizard">Horned Lizard</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                    <option value="American">American</option>
                    <option value="Labrador">Labrador</option>
                  </select>
                  <select value={state} onChange={handleStateChange} className="cursor-pointer p-2 rounded border-1 w-4/5 max-w-72">
                    <option value="">All States</option>
                    <option value="WA">WA</option>
                    <option value="MN">MN</option>
                    <option value="CO">CO</option>
                    <option value="IL">IL</option>
                    <option value="CT">CT</option>
                    <option value="NC">NC</option>
                    <option value="AZ">AZ</option>
                  </select>
                  <select value={animal} onChange={handleAnimalChange } className="cursor-pointer p-2 rounded border-1 w-4/5 max-w-72">
                    <option value="">All Animals</option>
                    <option value="dog">Dog</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="rabbit">Rabbit</option>
                  </select>
                  <select value={city} onChange={handleCityChange} className="cursor-pointer p-2 rounded border-1 w-4/5 max-w-72">
                    <option value="">All Cities</option>
                    <option value="Seattle">Seattle</option>
                    <option value="Minneapolis">Minneapolis</option>
                    <option value="Denver">Denver</option>
                    <option value="Carol Stream">Carol Stream</option>
                    <option value="Bridgeport">Bridgeport</option>
                    <option value="Charlotte">Charlotte</option>
                    <option value="Springfield">Springfield</option>
                    <option value="Tucson">Tucson</option>
                  </select>
                </div>
                </div>
                <PetList
                  pets={filteredPets}
                  error={error}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </>
            }
          />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

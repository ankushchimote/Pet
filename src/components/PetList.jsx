import React from 'react';
import { useState } from 'react';

const PetList = ({ pets, error, currentPage, totalPages, handlePageChange }) => {
  const petsPerPage = 5;
  const startIndex = (currentPage - 1) * petsPerPage;
  const currentPets = pets.slice(startIndex, startIndex + petsPerPage);

  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  const handleShowDescription = (petId) => {
    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [petId]: !prevState[petId],
    }));
  };


  return (
    <div>
      {error && <div className="flex justify-center mt-24">{error}</div>}
      <div className='flex flex-wrap gap-5 mt-8 justify-center'>

{currentPets.map(pet => (
        <div key={pet.id} className="p-3 rounded-lg max-w-48 text-left border-none bg-gray-900">
          {pet.images.length > 0 && <img src={pet.images[0]} alt={pet.name} className='w-full rounded-lg h-auto' />}
          <h2 className='py-2 text-lg font-serif'>{pet.name}</h2>
          {visibleDescriptions[pet.id] &&  (
            <div>
              <p><span className='font-bold'>Animal:</span> {pet.animal}</p>
              <p><span className='font-bold'>Breed:</span> {pet.breed}</p>
              <p><span className='font-bold'>City:</span> {pet.city}</p>
              <p><span className='font-bold'>State:</span> {pet.state}</p>
              <p><span className='font-bold'>Description:</span> {pet.description}</p>
            </div>
          )}
          <button 
            onClick={() => handleShowDescription(pet.id)}
            className={`mt-2 px-4 py-2 border rounded-md ${visibleDescriptions[pet.id] ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out`}
          >
            {visibleDescriptions[pet.id] ? 'Hide Description' : 'Show Description'}
          </button>
        </div>
      ))}
      </div>
      <br/>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-slate-900 text-blue-500' : 'bg-white text-white'} hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <br/>
    </div>
  );
};

export default PetList;






import UserProfileData from "../interface/UserProfileData";
import { useState } from "react";
import { useEffect } from "react";
import UserProfile from "./UserProfile";

const FilterUser: React.FC<{ users: UserProfileData[] }> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState(''); // Initialize with an empty string
    const [selectedStatus, setSelectedStatus] = useState(''); 
    const [selectedLocation, setSelectedLocation] = useState(''); 
    const [selectedSpecies, setSelectedSpecies] = useState(''); 

    const [genders, setGenders] = useState<string[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [location, setLocation] = useState<string[]>([]);
    const [species, setSpecies] = useState<string[]>([]);


    useEffect(() => {
        const gen = new Set<string>();
        const st = new Set<string>();
        const loc = new Set<string>();
        const sp = new Set<string>();
        users.forEach((user) => {
            gen.add(user.gender);
            st.add(user.status);
            if (user.location) loc.add(user.location.name);
            if(user.species) sp.add(user.species);
        })
        setGenders(Array.from(gen));
        setLocation(Array.from(loc));
        setSpecies(Array.from(sp));
        setStatus(Array.from(st));
    }, [users])
  

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedGender(event.target.value);
    };
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
      };
      const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
      };
      const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpecies(event.target.value);
      };
  
    const filteredUsers = users.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const genderMatch = selectedGender === '' || user.gender === selectedGender;
        const statusMatch = selectedStatus === '' || user.status === selectedStatus;
        const speciesMatch = selectedSpecies === '' || user.species === selectedSpecies;
        const locationMatch = selectedLocation === '' || user.location?.name === selectedLocation;
        return nameMatch && genderMatch && statusMatch && locationMatch && speciesMatch;
    }
    );
  
    return (
        <div>
            <div className="row">
                <div className='common-padding'>
                    <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                </div>

                <div className='common-padding'>
                    <label htmlFor="genderFilter">Gender: </label>
                    <select id="genderFilter" onChange={handleGenderChange}>
                    <option value="">All</option>
                        {
                        genders.map((gender) => {
                            return <option value={gender}>{gender}</option>
                        })}
                    </select>
                </div>
                
                <div className='common-padding'>
                    <label htmlFor="statusFilter">Status: </label>
                    <select id="statusFilter" onChange={handleStatusChange}>
                        <option value="">All</option>
                        {
                        status.map((status) => {
                            return <option value={status}>{status}</option>
                        })}
                    </select>
                </div>

                <div className='common-padding'>
                    <label htmlFor="locationFilter">Location: </label>
                    <select id="locationFilter" onChange={handleLocationChange}>
                        <option value="">All</option>
                        {
                        location.map((location) => {
                            return <option value={location}>{location}</option>
                        })}
                    </select>
                </div>

                <div className='common-padding'>
                    <label htmlFor="speciesFilter">Species: </label>
                    <select id="speciesFilter" onChange={handleSpeciesChange}>
                        <option value="">All</option>
                        {
                        species.map((species) => {
                            return <option value={species}>{species}</option>
                        })}
                    </select>
                </div>
            </div>

            <div>
            {filteredUsers.map((user) => {
                return <UserProfile
                        key={user.id}
                        name={user.name}
                        id={user.id}
                        image={user.image}
                        status={user.status}
                        gender={user.gender}
                        />
                })
            }
            </div>
        </div>
    );
  }
  
  export default FilterUser;
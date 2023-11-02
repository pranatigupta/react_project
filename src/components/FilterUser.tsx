import UserProfileData from "../interface/UserProfileData";
import { useState } from "react";
import { useEffect } from "react";
import UserProfile from "./UserProfile";

const FilterUser: React.FC<{ users: UserProfileData[] }> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState(''); // Initialize with an empty string
    const [selectedStatus, setSelectedStatus] = useState(''); 

    const [genders, setGenders] = useState<string[]>([]);

    useEffect(() => {
        const gen = new Set<string>();
        users.forEach((user) => {
            console.log(user.gender);
            gen.add(user.gender);
        })
        console.log(gen);
        setGenders(Array.from(gen));
    }, [])

    useEffect(() => {
        console.log(genders, "gwetuvybgtcoi");
    }, [genders])
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedGender(event.target.value);
    };
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
      };
  
    const filteredUsers = users.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const genderMatch = selectedGender === '' || user.gender === selectedGender;
        const statusMatch = selectedStatus === '' || user.status === selectedStatus;
        return nameMatch && genderMatch && statusMatch;
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
                    {/* <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option> */}
                    </select>
                </div>
                
                <div className='common-padding'>
                    <label htmlFor="statusFilter">Status: </label>
                    <select id="statusFilter" onChange={handleStatusChange}>
                        <option value="">All</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Unknown">Unknown</option>
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
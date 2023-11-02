import UserProfile from "./UserProfile";
import Character from "../interface/Character";
import FilterUser from "./FilterUser";

interface UserGridData {
    users: Character[];
}

const UserGrid: React.FC<UserGridData> = ({ users }) => {
    return (
        <div>
            <FilterUser users={users}/>
        </div>
    );
  }

  

export default UserGrid;
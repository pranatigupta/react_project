import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Character from "../interface/Character";

interface DetailsPageData {
    users: Character[];
}

const DetailsPage:React.FC<DetailsPageData> = ({users}) => {
    let navigate = useNavigate();
    let { userId } = useParams();

    // Find the user with the matching id
    const user = users.find((user) => user.id.toString() === userId);

    // If no user is found, you could navigate back or show a message
    if (!user) {
        return <div>User not found. <button onClick={() => navigate(-1)}>Go Back</button></div>;
    }
    return (
        <body className="Body">
            <div>
                <img src={user.image}></img>
                <h2>{user.name}</h2>
                <p>Status: {user.status}</p>
                <p>Gender: {user.gender}</p>
                <p>Species: {user.species}</p>

                <p>Origin and Location: <a className="Link" href={user.location.url}>{user.origin.name}</a></p>
                <h3>List of Episodes:</h3>
                {
                    user.episode.map((ep) => {
                        return <p>
                                <a className="Link" href={ep}>{ep}</a>
                            </p>
                    })
                }
            </div>
      </body>
    );
  }
  
  export default DetailsPage;
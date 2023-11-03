interface UserProfileData {
    name: string;
    id: number;
    image: string;
    status: string;
    gender: string;
    location?: {
      name: string;
      url: string;
    };
    species? : string;
  }

  export default UserProfileData;
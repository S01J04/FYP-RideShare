import { FaComments, FaMusic, FaSmokingBan, FaPaw } from 'react-icons/fa';
import { MdSmokingRooms, MdPets } from 'react-icons/md';

const preferencesData = [
  { 
    category: 'Chattiness', 
    icon: <FaComments />, 
    options: [
      { text: 'I enjoy chatting a lot', icon: <FaComments /> }, 
      { text: 'I talk sometimes', icon: <FaComments /> }, 
      { text: 'I prefer a quiet ride', icon: <FaComments /> }
    ] 
  },
  { 
    category: 'Music', 
    icon: <FaMusic />, 
    options: [
      { text: 'I love listening to pop music', icon: <FaMusic /> }, 
      { text: 'Rock music is my favorite', icon: <FaMusic /> }, 
      { text: 'I prefer classical tunes', icon: <FaMusic /> }
    ] 
  },
  { 
    category: 'Smoking', 
    icon: <FaSmokingBan />, 
    options: [
      { text: 'I do not smoke at all', icon: <FaSmokingBan /> }, 
      { text: 'I smoke occasionally', icon: <MdSmokingRooms /> }, 
      { text: 'I smoke frequently', icon: <MdSmokingRooms /> }
    ] 
  },
  { 
    category: 'Pets', 
    icon: <FaPaw />, 
    options: [
      { text: 'I love traveling with pets', icon: <MdPets /> }, 
      { text: 'I am okay with pets', icon: <MdPets /> }, 
      { text: 'I prefer no pets in the car', icon: <MdPets /> }
    ] 
  },
];

export default preferencesData;

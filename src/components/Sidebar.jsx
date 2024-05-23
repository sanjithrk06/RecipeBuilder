import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import {    
  banana,
  brinjal,
  carrot,
  chilly,
  cucumber,
  apple,
  ginger,
  mushroom,
  orange,
  pomegranate,
  tomato
} from '../assets/image'

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const ingredients = [
  { id: 1, name: 'Tomato', image: tomato },
  { id: 2, name: 'Banana', image: banana },
  { id: 3, name: 'Brinjal', image: brinjal },
  { id: 4, name: 'Carrot', image: carrot },
  { id: 5, name: 'Chilly', image: chilly },
  { id: 6, name: 'Cucumber', image: cucumber },
  { id: 7, name: 'Apple', image: apple },
  { id: 8, name: 'Ginger', image: ginger },
  { id: 9, name: 'Mushroom', image: mushroom },
  { id: 10, name: 'Orange', image: orange },
  { id: 11, name: 'Pomegranate', image: pomegranate },
];

const Ingredient = ({ ingredient }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.INGREDIENT,
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-gray-100 p-2 h-48 cursor-move rounded ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className=" w-full h-4/5">
        <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-cover rounded" />
      </div>
      <p className="text-center mt-1 h-1/5">{ingredient.name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white border border-gray-300 rounded-3xl m-2 p-4 overflow-hidden">
      <div className="mb-4">
        <h1 className="text-3xl text-center italic font-semibold p-5">Ingredients</h1>
        <div className="pt-2 relative mx-auto text-gray-600 w-full">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 ml-0">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="scroll-container">
        <div className="grid grid-cols-3 gap-2">
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

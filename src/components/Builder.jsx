import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { FaPlusCircle, FaRedo, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import { RxZoomIn, RxZoomOut  } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import bg from '../assets/bg.jpg';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const Builder = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeButton, setActiveButton] = useState('Build');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT,
    drop: (item) => {
      setDroppedItems((prevItems) => [...prevItems, item.ingredient]);
      console.log(`Dropped ${item.ingredient.name}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 1.2)); // Max zoom level 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.4)); // Min zoom level 20%
  };

  const handleReset = () => {
    setDroppedItems([])
    setHistory([])
  }

  const handleRedo = () => {
    if(history.length > 0){
      const addItem = history[0]

      setHistory(history.slice(1, history.length))
      setDroppedItems([...droppedItems, addItem])
    }
  }

  const handleUndo = () => {
    if(droppedItems.length > 0){
      const prevItem = droppedItems[droppedItems.length - 1]

      setHistory([ prevItem, ...history])
      setDroppedItems(droppedItems.slice(0, droppedItems.length - 1))
    }
  }

  return (
    <div className="w-2/4  bg-white border border-gray-300 rounded-3xl m-2 p-4 ">
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        
        <div className="flex justify-between gap-3 w-full h-[10%] px-2 py-4">
          <div className=" item-left flex flex-row gap-0">
          <button
            onClick={() => handleButtonClick('Build')}
            className={`bg-white border border-gray-700 text-black p-2 px-4 w-auto rounded-lg rounded-e-none flex items-center font-medium text-base ${
              activeButton === 'Build' ? 'bg-blue-50 border-blue-600 text-blue-600' : ''
            }`}
          >
            Build
          </button>
          <button
            onClick={() => handleButtonClick('Test')}
            className={`bg-white border border-l-0 border-gray-700 text-black p-2 px-4 w-auto rounded-lg rounded-s-none flex items-center font-medium text-base ${
              activeButton === 'Test' ? 'bg-blue-50 border-blue-600 text-blue-600' : ''
            }`}
          >
            Test
          </button>
            
          </div>
          <div className=" item-right flex flex-row gap-2">
            <button onClick={handleReset} className="bg-blue-600  text-white p-2 px-4 py-1 pb-1 w-auto rounded-lg flex items-center font-medium text-base">
              Deploy
            </button>
            <button onClick={handleUndo} className="bg-white text-black p-2 rounded-lg  text-lg">
              <HiDotsVertical />
            </button>
            
          </div>
        </div>

        <div
          ref={drop}
          className={`flex items-center bg-[url('../assets/bg.jpg')] bg-cover bg-center justify-center border-2 border-dashed rounded-2xl ${isOver ? 'border-blue-500' : 'border-gray-300'} w-full h-[90%] `}
        >
          <div className="p-4 pt-0 w-4/5 h-[90%] " style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
            {droppedItems.length < 1 && (
              <div className="flex flex-col items-center justify-center h-full">
                <FaPlusCircle className="text-gray-400 text-6xl mb-4" />
                <p className="text-gray-400 text-lg">Drop ingredients here</p>
              </div>
            )}
            {droppedItems.length > 0 && (
              <>
                <p className="text-center text-3xl font-bold m-2">Ingredients</p>
                <div className="mt-6 grid grid-cols-2 gap-5">
                  {droppedItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-center bg-gray-200 gap-5 rounded-3xl">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-2xl m-2" />
                      <p className="m-4 ml-0 pl-0">{item.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3 w-full h-[10%] px-3 py-4">
          <div className=" item-left flex flex-row gap-2">
          <button onClick={handleReset} className="bg-white border border-gray-700 text-black p-2 px-4 w-auto rounded-lg flex items-center">
            <span className="mr-2 font-semibold text-gray-700">Reset</span>
            <FaRedo className='text-gray-700'/>
          </button>
          <button onClick={handleUndo} className="bg-white border border-gray-700 text-black p-2 rounded-lg  text-lg">
            <IoArrowUndoOutline  className='text-gray-900'/>
          </button>
          <button onClick={handleRedo} className="bg-white border border-gray-700 text-black p-2 rounded-lg  text-lg">
            <IoArrowRedoOutline  className='text-gray-900'/>
          </button>
          </div>
          <div className="item-right">
          <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2">
            <button onClick={handleZoomOut} className="bg-transparent text-black leading-none rounded-lg  text-lg">
              <RxZoomOut  className='text-gray-700'/>
            </button>
            <div className="px-2 font-semibold text-gray-700">
              <span>{Math.round(zoomLevel * 100)}%</span>
            </div>
            <button onClick={handleZoomIn} className="bg-transparent text-black leading-none rounded-lg  text-lg">
              <RxZoomIn  className='text-gray-700'/>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
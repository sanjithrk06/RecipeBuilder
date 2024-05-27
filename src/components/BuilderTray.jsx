import { useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
import { FaPlusCircle, FaRedo } from 'react-icons/fa';
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import { RxZoomIn, RxZoomOut } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import PropTypes from 'prop-types';
import { useRecipe } from '../context/RecipeContext';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const BuilderTray = ({ type, setSaveClicked }) => {
  const [history, setHistory] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [droppedItemsPerTray, setDroppedItemsPerTray] = useState({});
  const { updateTrays } = useRecipe();

  useEffect(() => {
    setDroppedItemsPerTray({});
  }, [type]);

  useEffect(() => {
    setSaveClicked(false);
  }, [droppedItemsPerTray]);

  const handleSave = () => {
    updateTrays(Object.keys(droppedItemsPerTray).reduce((tray, trayIndex) => {
        tray[`Tray ${Number(trayIndex) + 1}`] = droppedItemsPerTray[trayIndex].map(item => ({
          ingredient: item.name,
          variety: "Pureed",  
          value: 80, 
          unit: "ml"
        }));
        return tray;
      }, {}));
    setSaveClicked(true);
    alert("Saved");
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 1.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.4));
  };

  const handleReset = () => {
    setDroppedItemsPerTray({});
    setHistory([]);
  };

//   const handleRedo = () => {
//     if (history.length > 0) {
//       const addItem = history[0];
//       setHistory(history.slice(1));
//       setDroppedItems([...droppedItems, addItem]);
//     }
//   };

//   const handleUndo = () => {
//     if (droppedItems.length > 0) {
//       const prevItem = droppedItems[droppedItems.length - 1];
//       setHistory([prevItem, ...history]);
//       setDroppedItems(droppedItems.slice(0, -1));
//     }
//   };

  const renderDropBox = (index) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.INGREDIENT,
      drop: (item) => {
        setDroppedItemsPerTray((prevState) => ({
          ...prevState,
          [index]: [...(prevState[index] || []), item.ingredient],
        }));
        console.log(`Dropped ${item.ingredient.name} in tray ${index}`);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    const trayItems = droppedItemsPerTray[index] || [];

    return (
      <div key={index} className="mb-0">
        <div
          ref={drop}
          id={`drop-box-${index}`}
          className={`flex flex-row flex-wrap border-2 border-dashed rounded-2xl ${isOver ? 'border-blue-500' : 'border-gray-300'} w-full h-full`}
        >
          <div className="p-2 w-[95%] h-[90%] pb-0" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
            {trayItems.length < 1 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaPlusCircle className="text-gray-400 text-4xl mb-4" />
                <p className="text-gray-400 text-lg">Drop items in tray {Number(index)+1} here</p>
              </div>
            ) : (
              <>
                <p className="text-center text-xl italic font-bold m-1">Tray {Number(index)+1}</p>
                <div className="mt-3 m-0 p-0 grid grid-cols-1 gap-3 h-40 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {trayItems.map((item, index) => (
                    <div key={index} className="flex flex-row justify-end items-center">
                      <div className="flex flex-row items-center justify-center bg-gray-200 gap-3 rounded-3xl w-full h-20 p-2 pt-0">
                        <img src={item.image} alt={item.name} className={`w-[40%] h-[95%] object-cover rounded-2xl m-2 mb-0`} />
                        <p className="text-center font-medium text-lg">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/4 bg-white border border-gray-300 rounded-3xl m-2 p-4">
      <div className="flex-1 flex flex-col items-center justify-between h-full">
        <div className="flex justify-end gap-3 w-full h-[10%] px-2 py-4">
          <div className="flex flex-row gap-2">
            <button onClick={handleSave} className={`bg-blue-600 text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base ${(setSaveClicked == true || droppedItemsPerTray.length<1) ? "opacity-50" : ""}`} disabled={droppedItemsPerTray.length === 0} >
              Save
            </button>
            <button className="bg-white text-black p-2 rounded-lg text-lg">
              <HiDotsVertical />
            </button>
          </div>
        </div>

        {type === 'ingredients' && (
          <div className='grid grid-cols-2 gap-5 w-full h-[90%] overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
            {[...Array(6)].map((_, index) => renderDropBox(index))}
          </div>
        )}

        <div className="flex justify-between gap-3 w-full h-[10%] px-3 py-4">
          <div className="item-left flex flex-row gap-2">
            <button onClick={handleReset} className="bg-white border border-gray-700 text-black p-2 px-4 w-auto rounded-lg flex items-center">
              <span className="mr-2 font-semibold text-gray-700">Reset</span>
              <FaRedo className="text-gray-700" />
            </button>
            {/* <button onClick={handleUndo} className="bg-white border border-gray-700 text-black p-2 rounded-lg text-lg">
              <IoArrowUndoOutline className="text-gray-900" />
            </button>
            <button onClick={handleRedo} className="bg-white border border-gray-700 text-black p-2 rounded-lg text-lg">
              <IoArrowRedoOutline className="text-gray-900" />
            </button> */}
          </div>
          <div className="item-right">
            <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2">
              <button onClick={handleZoomOut} className="bg-transparent text-black leading-none rounded-lg text-lg">
                <RxZoomOut className="text-gray-700" />
              </button>
              <div className="px-2 font-semibold text-gray-700">
                <span>{Math.round(zoomLevel * 100)}%</span>
              </div>
              <button onClick={handleZoomIn} className="bg-transparent text-black leading-none rounded-lg text-lg">
                <RxZoomIn className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BuilderTray.propTypes = {
  type: PropTypes.string.isRequired,
  setSaveClicked: PropTypes.bool.isRequired
};

export default BuilderTray;

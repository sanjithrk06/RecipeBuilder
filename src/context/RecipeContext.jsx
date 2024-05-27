import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

const defaultRecipe = {
  name: "Veg Mac & Cheese",
  author: "Mome",
  cuisine: "italian",
  category: "main_course",
  servings: 4,
  prep_time_min: 30,
  origin: "Italy",
  source: "Adit",
  liquids: { "oil": "None", "water": "Regular water" },
  spices: [],
  trays: {},
  instructions: [
    { "command": "INDUCTION_ON_SET_TEMP", "value": "600", "unit": "degree" },
    { "command": "WAIT_FOR_COOKING", "value": "20", "unit": "seconds" },
    { "command": "PUMP_WATER", "value": "1240", "unit": "ml" },
    { "command": "WAIT_FOR_COOKING", "value": "3", "unit": "minutes" },
    { "command": "LID_CLOSE", "value": "", "unit": "none" },
    { "command": "LID_CLOSE", "value": "", "unit": "none" },
    { "command": "WAIT_FOR_COOKING", "value": "2", "unit": "minutes" },
    { "command": "STIRRING_ANTICLOCKWISE", "value": "10", "unit": "seconds" },
    { "command": "INDUCTION_OFF", "value": "", "unit": "none" }
  ]
};

export const RecipeProvider = ({ children }) => {
  const [recipe, setRecipe] = useState(defaultRecipe);

  const updateSpices = (newSpices) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, spices: newSpices }));
  };

  const updateTrays = (newTrays) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, trays: newTrays }));
  };

  const updateInstructions = (newInstructions) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: newInstructions }));
  };

  return (
    <RecipeContext.Provider value={{ recipe, updateSpices, updateTrays, updateInstructions }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);

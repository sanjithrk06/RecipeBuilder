import PropTypes from 'prop-types';
import { useRecipe } from '../context/RecipeContext';


const FieldSettings = ({ type, onTypeChange, saveClicked }) => {
    const { recipe } = useRecipe();

    const handleDone = () => {
        const recipeData = JSON.stringify(recipe);
        const blob = new Blob([recipeData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recipe.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleNext = () => {
        if(type==='spices'){
            onTypeChange('ingredients')
        }else if(type==='ingredients'){
            onTypeChange('instructions')
        }
    }

    const handleBack = () => {
        if(type==='ingredients'){
            onTypeChange('spices')
        }else if(type==='instructions'){
            onTypeChange('ingredients')
        }
    }


  return (
    <div className="w-1/4 bg-white border border-gray-300 rounded-3xl m-2 p-6">
        <div className="mb-4 mt-4 p-2">
            <h2 className=" text-base font-medium pb-2">ADD A FIELD</h2>
            <p className="text-sm font-normal text-gray-600">Create new field in the event</p>
            <a href="#" className="text-sm text-blue-500 hover:underline">Learn More <i className="fa fa-external-link"></i></a>
        </div>
        <hr className="h-[1.2px] bg-gray-300 border-0 my-1" />
        <div className="mb-4 mt-4">
            <span className="text-sm">Apply on <strong>all events</strong></span>
            <br />
            <button className="mt-3 border-2 border-gray-200 text-gray-600 px-4 py-2 text-sm rounded-lg font-medium hover:bg-gray-200 hover:border-gray-300">
            ADD FILTER +
            </button>
        </div>
        <div className="mb-4 mt-6 px-4 py-3  bg-blue-100 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">
            Events not matching the filters will remain unchanged
            </p>
        </div>
        <hr className="h-[1.2px] bg-gray-300 border-0 my-1" />
        <div className="mb-4 mt-6">
            <h2 className=" text-lg font-medium pb-2">SETTINGS</h2>
            <div className="relative mt-3 w-full">
                <input type="text" id="name" name="name" className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label htmlFor="name" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> New Field Name *</label>
            </div>
            <div className="relative mt-7 mb-2 w-full">
                <input type="text" id="value" name="value" className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label htmlFor="value" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> New Field Value *</label>
            </div>
            <p className=" p-1 text-[13px] font-normal text-gray-600">Enter a value or formula. Use double quotes for string values. <a href="#" className="text-[13px] text-blue-500 hover:underline">Learn More <i className="fa fa-external-link"></i></a></p>
            <div className="flex justify-between m-2 mt-5">
                {
                    (type==='ingredients' || type==='instructions') && (
                    <>
                    <button onClick={handleBack} className="bg-blue-600  text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base">
                        Back
                    </button>
                    </>
                )}
                {
                    (type==='spices' || type==='ingredients') && (
                    <>
                        <button className="bg-transparent  text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base">
                            
                        </button>
                        <button onClick={handleNext} disabled={!saveClicked} className={`bg-blue-600  text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base ${saveClicked ? '' : 'opacity-50'}`}>
                            Next
                        </button>
                    </>
                )}
                {
                    type==='instructions' && (
                    <>
                    <button className="bg-transparent  text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base">
                        
                    </button>
                    <button onClick={handleDone} disabled={!saveClicked} className={`bg-blue-600  text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base ${saveClicked ? '' : 'opacity-50'}`}>
                        Done
                    </button>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

FieldSettings.propTypes = {
    type: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    saveClicked: PropTypes.bool.isRequired
};

export default FieldSettings;

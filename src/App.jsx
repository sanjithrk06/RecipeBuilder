import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import Builder from './components/Builder';
import FieldSettings from './components/FieldSettings';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        <Builder />
        <FieldSettings />
      </div>
    </DndProvider>
  );
};

export default App;

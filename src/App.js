import PetStore from './state/PetStore'
import PetList from "./components/PetList"

function App() {
  const store = new PetStore()

  return (
    <div className="App">
      <PetList store={store} />
    </div>
  );
}

export default App;

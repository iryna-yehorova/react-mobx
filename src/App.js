import PetStore from './state/PetStore'
import PetList from "./components/PetList"
import OwnerList from './components/OwnerList'

function App() {
  const store = new PetStore()

  return (
    <div className="App">
      <PetList store={store} />
      <OwnerList store={store} />
    </div>
  );
}

export default App;

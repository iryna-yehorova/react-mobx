import StoreContext from './helpers/StateContext'
import PetStore from './state/PetStore'
import PetList from "./components/PetList"
import OwnerList from './components/OwnerList'

function App() {
  const store = new PetStore()
  return (  
    <div className="App">
      <StoreContext.Provider value={store}>
        <PetList />
        <OwnerList />
      </StoreContext.Provider>
    </div>
  );
}

export default App;

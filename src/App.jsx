import Screen from "@/modules/screen";
import Tools from "@/modules/tools";
import { MainContextProvider } from "@/contexts/main";

function App() {
  return (
    <MainContextProvider>
      <div className="h-screen w-screen flex">
        <Screen />
        <Tools />
      </div>
    </MainContextProvider>
  );
}

export default App;

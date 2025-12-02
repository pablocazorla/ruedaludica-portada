import { MainContextProvider } from "@/context";
import Screen from "@/components/screen";
import Tools from "@/components/tools";

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

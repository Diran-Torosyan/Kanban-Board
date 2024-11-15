import Logo from "./components/Logo";
import Bar from "./components/Bar";
import LoginBox from "./components/LoginBox/LoginBox";
import KWHeader from "./components/KWHeader/KWHeader"

function App() {
  const Loginy = 600;
  return (
    <div>
      <Logo/>
      <Bar/>
      <KWHeader/>
      <LoginBox Loginy={Loginy} />
    </div>
  );
}

export default App;

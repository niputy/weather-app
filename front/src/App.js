import Charts from "./components/Charts";
import Container from "./components/Container";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Container>
        <Charts />
      </Container>

      <Footer />
    </div>
  );
}

export default App;

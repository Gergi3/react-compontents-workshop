import { Footer } from "./components/shared/Footer";
import { Header } from "./components/shared/Header";
import { Users } from "./components/user/Users";

function App() {
    return (
        <div>
            <Header />

            <main className="main">
                <Users />        

            </main>

            <Footer />
        </div>
    );
}

export default App;

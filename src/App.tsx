import { Flex } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context";
import { ChatNavigation } from "./components/ChatNavigation";
import { Chat } from "./components/ChatMessages";

function App() {
    return (
        <AuthContextProvider>
            <Navbar />
            <Flex
                w={`100%`}
                direction="row"
                p={0}
                m={0}
                h={`calc(100vh - 72px)`}
                overflow={`hidden`}
            >
                <ChatNavigation />
                <Chat />
            </Flex>
        </AuthContextProvider>
    );
}

export default App;

import { Flex } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import { ChatNavigation } from "./components/ChatNavigation";
import { useContext } from "react";
import { AuthContext, IContextValues } from "./context/authContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chat } from "./components/ChatMessages";

function App() {
    const { auth } = useContext(AuthContext) as IContextValues;
    const { data: channels } = useQuery({
        queryKey: ["channels"],
        queryFn: async () => api.getChannels(),
    });
    return (
        <Router>
            <Navbar />

            {auth && (
                <Flex
                    w={`100%`}
                    direction="row"
                    p={0}
                    m={0}
                    h={`calc(100vh - 72px)`}
                    overflow={`hidden`}
                >
                    <ChatNavigation auth={auth} channels={channels} />
                    <Routes>
                        <Route path="/" element={<div>Select Channel</div>} />
                        <Route
                            path="/channel/:channelId"
                            element={<Chat />}
                        ></Route>
                    </Routes>
                </Flex>
            )}
        </Router>
    );
}

export default App;

import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext, IContextValues } from "../context";

export default function Navbar() {
    const { handleSignIn, auth, handleSignOut } = useContext(
        AuthContext
    ) as IContextValues;
    return (
        <Flex justifyContent="center" p={4}>
            {auth ? (
                <Button onClick={handleSignOut}>Sing Out</Button>
            ) : (
                <Button onClick={handleSignIn} mr={4}>
                    Sing In
                </Button>
            )}
        </Flex>
    );
}

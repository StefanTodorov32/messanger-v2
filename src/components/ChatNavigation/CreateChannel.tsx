import { useContext } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { api } from "../../api/api";
import { AuthContext, IContextValues } from "../../context/authContext";

export const CreateChannel = ({
    isOpen,
    onClose,
    refetchChannels
}: {
    isOpen: boolean;
    onClose: () => void;
    refetchChannels: () => void;
}) => {
    const { auth } = useContext(AuthContext) as IContextValues;

    const handleSubmit = async (values: {
        name: string;
        description: string;
        photoUrl: string;
    }) => {
        if (!auth) return;
        await api.createChannel({ ...values, createdBy: auth.uid });
        refetchChannels()
    };

    const initialValues = {
        name: "",
        description: "",
        photoUrl: "",
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <ModalBody>
                            <FormControl id="name" mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Field
                                    type="text"
                                    name="name"
                                    as={Input}
                                    placeholder="Enter your name"
                                />
                            </FormControl>

                            <FormControl id="description" mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Field
                                    type="text"
                                    name="description"
                                    as={Input}
                                    placeholder="Enter your description"
                                />
                            </FormControl>

                            <FormControl id="photoUrl" mb={4}>
                                <FormLabel>Photo Url</FormLabel>
                                <Field
                                    type="text"
                                    name="photoUrl"
                                    as={Input}
                                    placeholder="Enter your photo url"
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button variant="ghost" type="submit">
                                Create
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};

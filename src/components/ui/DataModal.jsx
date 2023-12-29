import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {PlusIcon} from "@/components/ui/icons/PlusIcon";

export default function DataModal({isOpen, handleClose, data, addItem}) {

    function handleAdd(key) {
        addItem(key);
        handleClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} data={data} hideCloseButton={true}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Search Results</ModalHeader>
                        <ModalBody>
                            <Table removeWrapper aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn></TableColumn>
                                </TableHeader>
                                <TableBody items={data}>
                                    {(item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <Button className="text-red-400" isIconOnly variant="faded" aria-label="Take a photo" onClick={() => {handleAdd(item.key, item.id)}}>
                                                    <PlusIcon/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}

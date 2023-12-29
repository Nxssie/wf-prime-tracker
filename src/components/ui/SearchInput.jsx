import React, {forwardRef, useEffect, useId, useMemo, useRef, useState} from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Input, useDisclosure,
    useInput
} from "@nextui-org/react";
import {PlusIcon} from "@/components/ui/icons/PlusIcon";
import {fetchMarketOffers} from "@/components/data/fetchMarketOffers";
import getWarframeWeapons from "@/components/data/getWarframeWeapons";
import getTradableData from "@/components/data/getTradableData";
import DataModal from "@/components/ui/DataModal";


const SearchInput = ({className, addItem}) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        getTradableData(value).then((res) => {
            if (res.length > 0) {
                setIsOpen(true)
                setData(res);
            }
        });
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 w-full">
                <Input
                    label="Search"
                    name="search"
                    placeholder="Search some Item!"
                    value={value}
                    onValueChange={(value) => {
                        setValue(value);
                    }}
                />
                <Button type="submit" className="self-center w-1/12 bg-indigo-400">
                    Search
                </Button>
            </div>
            <DataModal isOpen={isOpen} handleClose={handleClose} data={data} addItem={addItem}/>
        </form>
    );
}

export default SearchInput;

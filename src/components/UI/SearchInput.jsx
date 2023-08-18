import React, {forwardRef} from "react";
import {Button, Input, useInput} from "@nextui-org/react";

import {SearchIcon} from "./icons/SearchIcon";
import {CloseFilledIcon} from "./icons/CloseFilledIcon";


const SearchInput = ({className}) => {
    return (
        <section className={className}>
            <Input
            type="email"
            label="Search"
            placeholder="Wisp Prime Blueprint"
            labelPlacement="outside"
        />
            <Button className="self-end bg-indigo-500">
                <SearchIcon/>
            </Button>
        </section>

    );
}

export default SearchInput;

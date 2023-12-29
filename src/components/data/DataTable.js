import React, {useEffect, useState} from "react";
import {
    Button,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, User,
} from "@nextui-org/react";
import SearchInput from "@/components/ui/SearchInput";
import fetchMarketOffers from "@/components/data/fetchMarketOffers";
import {Card, CardBody} from "@nextui-org/react";
import supabase from "@/lib/supabase-browser";
import fetchItems from "@/components/data/fetchItems";
import {DeleteIcon} from "@/components/ui/icons/DeleteIcon";

export default function DataTable() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [itemList, setItemList] = useState([]);
    const [total, setTotal] = useState({totalDucats: 0, totalPlatinum: 0});

    function getItems() {
        fetchItems().then((res) => {
            let totalDucats = 0;
            let totalPlatinum = 0;
            res.forEach((entry) => {
                totalDucats += entry.ducats;
                totalPlatinum += entry.platinum;
            })

            setTotal({totalDucats, totalPlatinum})
            setItemList(res);
        })
    }

    useEffect(() => {
        getItems();
    }, []);

    async function addItem(item) {
        let pl = await fetchMarketOffers(item);
        console.log(pl);

        const {data, error} = await supabase
            .from('user_items')
            .insert([
                {name: pl.item[0].en["item_name"], key: pl.item[0]["url_name"], ducats: pl.item[0].ducats, platinum: pl.platinum},
            ])
            .select()

        getItems();
    }

    async function deleteItem(key) {

        const { error } = await supabase
            .from('user_items')
            .delete()
            .eq('id', key)

        getItems();
    }

    return (
        <section className="flex justify-center flex-col w-4/5">
            <Card className="mb-4 w-2/6 place-self-center">
                <CardBody className="grid grid-cols-2 place-content-center text-center">
                    <figure className="flex justify-center">
                        <User
                            name={total.totalDucats}
                            avatarProps={{
                                src: "/OrokinDucats.webp"
                            }}
                        />
                    </figure>
                    <figure className="flex flex-row justify-center">
                        <User
                            name={total.totalPlatinum}
                            avatarProps={{
                                src: "/PlatinumLarge.webp"
                            }}
                        />
                    </figure>
                </CardBody>
            </Card>
            <SearchInput className="flex flex-col w-2/6 mb-8 place-self-center gap-4" addItem={addItem}/>

            <Table
                aria-label="Example table with client side sorting"
                classNames={{
                    table: "w-full",
                    th: "text-center bg-violet-400 text-black text-medium focus:text-black"
                }}
            >
                <TableHeader>
                    <TableColumn key="name">
                        Name
                    </TableColumn>
                    <TableColumn key="ducats">
                        Ducats
                    </TableColumn>
                    <TableColumn key="platinum">
                        Platinum
                    </TableColumn>
                    <TableColumn key="actions">
                        Actions
                    </TableColumn>
                </TableHeader>
                <TableBody
                    items={itemList}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..."/>}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.ducats}</TableCell>
                            <TableCell>{item.platinum}</TableCell>
                            <TableCell>
                                <Button className="text-red-400" isIconOnly variant="faded" aria-label="Take a photo" onClick={() => {deleteItem(item.id)}}>
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>


    );
}

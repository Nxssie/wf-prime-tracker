import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner,
} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import fetchMarketOffers from "@/components/data/fetchMarketOffers";
import SearchInput from "@/components/UI/SearchInput";

export default function DataTable() {
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList({
        async load({signal}) {
            let res = await fetch('https://api.warframestat.us/items/search/Warframes?language=en&by=category&only=isPrime,name,components,category', {
                signal,
            });
            let json = await res.json();
            let set = json.filter((entry) => {
                return entry.isPrime;
            })
            let itemList = [];
            set.forEach((entry) => {
                if (entry['components'] !== undefined) {
                    entry['components'].forEach((component) => {
                        if (["Systems", "Chassis", "Blueprint", "Neuroptics"].includes(component.name)) {
                            itemList.push({...component, name: entry.name + " " + component.name});
                        }
                    })
                }
            })
            setIsLoading(false);

            let itemListOffers = await fetchMarketOffers(itemList.slice(0, 6));

            return {
                items: itemListOffers
            }
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    return (
        <section className="flex justify-center flex-col w-4/5">
            <SearchInput className="mb-8 w-2/6 place-self-center flex flex-row gap-4"/>
            <Table
                aria-label="Example table with client side sorting"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                classNames={{
                    table: "w-full",
                    th: "text-center bg-violet-400 text-black text-medium focus:text-black"
                }}
            >
                <TableHeader>
                    <TableColumn key="name" allowsSorting>
                        Name
                    </TableColumn>
                    <TableColumn key="ducats" allowsSorting>
                        Ducats
                    </TableColumn>
                    <TableColumn key="platinum" allowsSorting>
                        Platinum
                    </TableColumn>
                </TableHeader>
                <TableBody
                    items={list.items}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..."/>}
                >
                    {(item) => (
                        <TableRow key={name}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>


    );
}

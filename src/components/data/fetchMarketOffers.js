"use server"
async function getData(items) {
    let itemList = [];
    for (const item of items) {
        console.log(item.name);
        const res = await fetch(`https://api.warframe.market/v1/items/${item.name.toLowerCase().replaceAll(" ", "_")}/orders?include=item`, {
            headers: {
                platform: "pc",
                accept: "application/json"
            }
        });

        if (!res.ok) {
            console.error('Failed to fetch data')
        }

        res.json().then(data => {
            let platinum = data["payload"]["orders"].sort((a, b) => {
                if (a["user"]["status"] === "ingame" && a["order_type"] === "sell") {
                    return a.platinum - b.platinum;
                }
            })[0]["platinum"]
            itemList.push({...item, platinum: platinum});
        });
    }

    return itemList;

}

export default async function fetchMarketOffers(items) {
    return await getData(items);
}

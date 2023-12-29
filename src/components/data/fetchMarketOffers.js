"use server"

async function getData(key, id) {
    let url = `https://api.warframe.market/v1/items/${key}/orders?include=item`
    let res = await fetch(url, {
        headers: {
            platform: "pc",
            accept: "application/json"
        }
    });

    if (!res.ok) {
        console.error('Failed to fetch data')
    }

    const json = await res.json();

    let platinum = json["payload"]["orders"].sort((a, b) => {
        if (a["user"]["status"] === "ingame" && a["order_type"] === "sell") {
            return a.platinum - b.platinum;
        }
    })[0]["platinum"]

    let item = json["include"]["item"]["items_in_set"].filter((item) => {return item.id == json.include.item.id});

    return {platinum: platinum, item: item};
}

export default async function fetchMarketOffers(item, id) {
    return await getData(item, id);
}

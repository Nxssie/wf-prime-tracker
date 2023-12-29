"use server"

async function getData(item) {
    let url = "https://api.warframe.market/v1/items"
    let res = await fetch(url);

    if (!res.ok) {
        console.error('Failed *again* to fetch data')
    }

    const json = await res.json();
    let filteredItems = [];
    console.log("Back search value:", item)

    json["payload"]["items"].forEach((entry) => {
        if(entry["url_name"].includes(item.toLowerCase())) {
            filteredItems.push({id: entry.id, name: entry["item_name"], key: entry["url_name"]});
        }
    })

    return filteredItems;

}

export default async function getTradableData(item) {
    return await getData(item);
}

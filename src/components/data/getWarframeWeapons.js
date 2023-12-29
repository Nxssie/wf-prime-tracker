"use server"

async function getData(item) {
    let url = `https://api.warframestat.us/weapons/search/${item}?language=en&by=category&only=tradable,name,components,category`
    let res = await fetch(url);

    if (!res.ok) {
        console.error('Failed *again* to fetch data')
    }

    const json = await res.json();
    let weaponList = json.filter((weapon) => {
        return weapon["tradable"] === true;
    })

    let itemList = [];
    weaponList.forEach((weapon) => {
        if(weapon.components) {
            weapon.components.forEach((component) => {
                if (component.tradable) {
                    let keyName = component.name.toLowerCase().replaceAll(" ", "_");
                    itemList.push({...component, key: keyName});
                }
            })
        } else {
            let keyName = weapon.name.toLowerCase().replaceAll(" ", "_");
            itemList.push({...weapon, key: keyName})
        }
    })
    return itemList;
}

export default async function getWarframeWeapons(item) {
    return await getData(item);
}

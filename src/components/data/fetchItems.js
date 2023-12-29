"use client"

import supabase from "@/lib/supabase-browser";

async function getData() {
    let itemList = [];
    let { data: user_items, error } = await supabase
        .from('user_items')
        .select("*")

    return user_items
}

export default async function fetchItems() {
    return await getData();
}

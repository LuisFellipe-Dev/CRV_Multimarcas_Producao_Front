import type { Dispatch, SetStateAction } from "react";

export interface Item{
  id: string;
  Brand: string;
  Model: string;
  Size: string;
  Description: string;
}

export interface ItemFilters{
  Brand?: string
  Model?: string
  Size?: string
  Description?: string
}

export interface Search{
  formSearch: ItemFilters
  setFormSearch: Dispatch<SetStateAction<ItemFilters>>
  handleSearch: (e: React.FormEvent) => void
  mode: boolean
  loadItens: () => Promise<void>
  items: Array<Item>
}
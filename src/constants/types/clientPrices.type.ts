import { Material } from "../enums/material.enum";

export type  ClientPrice = {
    id?: number;
    price: number;
    material: Material;
 }
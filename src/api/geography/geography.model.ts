

export interface City {
  id: number;
  province: Province;
  provinceId: number;
  name: string;
  order: number;
}

export interface Province {
  id: number;
  name: string;
  order: number;
}
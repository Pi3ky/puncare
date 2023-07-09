export interface Services {
  _id: string,
  title: string,
  description: string,
  image: string,
  price: string,
  about: string,
  currency: string,
  details: string,
  time: string
}

export interface Products {
  _id: string,
  currency: string,
  image: string,
  price: number,
  quantity_sold: number,
  status: string,
  rate: number,
  title: string,
  weight: string,
  type_id: string,
  type_name: string
}

export interface Province {
  province_name: string,
  province_id: string,
  province_type: string
}

export interface District {
  district_id: string,
  district_name: string,
  district_type: string,
  lat: any,
  lng: any,
  province_id: string
}

export interface Ward {
  district_id: string,
  ward_name: string,
  ward_type: string,
  ward_id: string
}

export interface addressCreateModel {
    fullName: string,
    phone: string,
    address: string,
    ward: string,
    district: string,
    city: string,
    country: string,
    isDefault: boolean,
    latitude?: number,
    longitude?: number
}

export interface addressModel {
    _id: string,
    fullName: string,
    phone: string,
    address: string,
    ward: string,
    district: string,
    city: string,
    country: string,
    isDefault: boolean,
    latitude: number,
    longitude: number,
    user: string,
    create_at: string,
    update_at: string,
    __v: number,
    fullAddress: string
}

export type Product = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    raiting: number
    stock: number
    brand?: string
    category: string
    thumbnail: string
    images: string[]
}
export type ProductResponse = {
    products: Product[]
    total: number
    skip: number
    limit: number
}
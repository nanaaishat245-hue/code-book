import { createId, delay, mockDatabase } from "./mockDatabase";


const ensureAdmin = () => {
    
     const user = mockDatabase.getActiveUser() 

     if(!user || !user.Admin) {
         throw new Error("Admin access required")
     }
     return user
}

  const normaliseProduct  = (product) => {
    const {
        name,
        overview,                                                                                                       
        long_description,
        rating,
        poster,
        size,
        inStock,
        in_stock,
        bestSeller,
        best_seller,
        price
    } = product

    return{
        name: name?.trim() || "",
        overview: overview?.trim() || "",
        long_description: long_description?.trim() || "",
        rating: Number(rating),
        poster: poster?.trim() || "",
        size: Number(size),
        in_stock: typeof inStock === "boolean" ? inStock : Boolean(in_stock),
        best_Seller: typeof bestSeller === "boolean" ? bestSeller: Boolean(best_seller),
        price: Number(price)
    }
  };


  const applyFeaturedSync = (productId, isBestSeller) => {
        const featuredIds = mockDatabase.getFeaturedIds()
        const exists = featuredIds.includes(productId);

        if(isBestSeller && !exists) {
            mockDatabase.saveFeaturedIds([productId, ...featuredIds])
        }

        if(!isBestSeller && exists) {
            mockDatabase.saveFeaturedIds(featuredIds.filter((id) => id !== productId))
        }
  }

  const createEbook = async(ebookData) => {
       ensureAdmin()

    const productData = normaliseProduct(ebookData)

    if(!productData.name || !productData.overview) {
        throw new Error("Name and Overview are Required")
    }

    const newProduct = {
        ...productData, 
        id: createId
    };

    const products = mockDatabase.getProducts(); 
    mockDatabase.saveProducts([newProduct, ...products]) 
    applyFeaturedSync(newProduct.id, newProduct.best_Seller)

    return delay(newProduct)
  }

  const updateEbook = async (id, ebookData) => {
     ensureAdmin()

     const productId = Number(id)
     const products = mockDatabase.getProducts()
     const productIndex = products.findIndex((product) => product.id === productId)

     if(productIndex === -1) {
        throw new Error("product not found")
     }

     const updatedProduct = {
        ...products[productIndex],
        ...normaliseProduct(ebookData),
        id: productId
     }

     const updatedProducts = [...products] 
    updatedProducts[productIndex] = updatedProduct;
    mockDatabase.saveProducts(updatedProducts)
    applyFeaturedSync(updatedProduct.id, updatedProduct.best_Seller)

     return delay(updatedProduct)
  }

 const checkAdminStatus = async () => {
    const user = mockDatabase.getActiveUser()
    return delay(Boolean(user?.isAdmin))
 }

const adminService = {
    createEbook,
    updateEbook,
    checkAdminStatus
}

export default adminService
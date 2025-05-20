'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/component/productCard'
import { getAllProducts } from '@/services/product.services'

interface Product {
  id: string;
  name: string;
  category: string;
  [key: string]: any;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts() // Assume getAllProducts returns parsed JSON
        console.log('Fetched products:', data) // Debug log
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  console.log('Products:', products) // Debug log

  useEffect(() => {
    const filtered = products.filter((product: Product) => {
      const name = product.name || '' // Fallback if name is undefined
      const category = product.category || '' // Fallback if category is undefined
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || category.toLowerCase().includes(searchTerm.toLowerCase().trim())
      const matchesCategory = selectedCategory === 'all' || category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    console.log('Filtered products:', filtered) // Debug log
    setFilteredProducts(filtered)

    // Extract unique categories from products and update categories state
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    setCategories(uniqueCategories)
  }, [searchTerm, selectedCategory, products])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Search Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-[200px] px-4 py-2 border rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory('all')
                    setIsDropdownOpen(false)
                  }}
                >
                  All Categories
                </div>
                {categories.map((category) => (
                  <div
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}
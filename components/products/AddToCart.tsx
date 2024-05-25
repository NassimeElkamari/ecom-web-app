'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  const addToCartHandler = () => {
    increase(item)
  }
  return existItem ? (
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <>
     <button
        className="px-7 py-3 bg-white border border-gray-500  text-black rounded-full shadow-md hover:bg-gray-400"
        type="button"
        onClick={addToCartHandler}
      >
        Add to cart
      </button>
      <button
        className="px-7 py-3 bg-black border border-white text-white hover:text-black rounded-full shadow-md hover:bg-gray-200"
        type="button"
      >
        Buy Now
      </button>
    </>
  )
}

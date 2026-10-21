import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getOrderStatus, getOrders } from '../api'
import { errorMessage } from '../api/client'
import { ErrorBox, Spinner } from '../components/ui'
import { money } from '../utils'

const badge = {
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function Orders() {
  const { state } = useLocation()
  const [orders, setOrders] = useState([])
  const [statuses, setStatuses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getOrders()
      .then((d) => setOrders(Array.isArray(d) ? d : d.items ?? d.orders ?? []))
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  const refreshStatus = async (id) => {
    try {
      const s = await getOrderStatus(id)
      setStatuses((prev) => ({ ...prev, [id]: s.status ?? s }))
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Your orders</h1>
      {state?.placed && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Order placed successfully.
        </div>
      )}
      <ErrorBox message={error} />
      {orders.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No orders yet.</p>
      ) : (
        orders.map((o) => {
          const id = o.id ?? o.order_id
          const status = (statuses[id] ?? o.status ?? 'pending').toString()
          return (
            <div key={id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <p className="font-medium">Order #{id}</p>
                {o.created_at && (
                  <p className="text-xs text-slate-400">{new Date(o.created_at).toLocaleString()}</p>
                )}
              </div>
              {o.total !== undefined && <p className="font-semibold">{money(o.total)}</p>}
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[status.toLowerCase()] ?? 'bg-slate-100 text-slate-600'}`}>
                  {status}
                </span>
                <button className="btn-ghost" onClick={() => refreshStatus(id)}>
                  Refresh status
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

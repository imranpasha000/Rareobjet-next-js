import { adjustStockAction } from '@/actions/admin.actions';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  const products = await query<{ id: number; name: string; sku: string | null; stock_qty: number }[]>(
    'SELECT id, name, sku, stock_qty FROM products WHERE is_active = 1 ORDER BY stock_qty ASC LIMIT 100'
  );
  return (
    <>
      <h2>Inventory</h2>
      <form className="admin-form" action={adjustStockAction} style={{ marginBottom: 24 }}>
        <label>Product
          <select name="product_id">{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select>
        </label>
        <label>Change<input name="change_qty" type="number" required /></label>
        <label>Note<input name="note" /></label>
        <button type="submit">Adjust</button>
      </form>
      <table className="admin-table">
        <thead><tr><th>Product</th><th>SKU</th><th>Stock</th></tr></thead>
        <tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.sku}</td><td>{product.stock_qty}</td></tr>)}</tbody>
      </table>
    </>
  );
}

import Link from 'next/link';
import { query } from '@/lib/db';
import { money } from '@/lib/utils';
import { deactivateProductAction } from '@/actions/admin.actions';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const params: Record<string, unknown> = {};
  let where = '1=1';
  if (q) {
    where = '(p.name LIKE :q OR p.sku LIKE :q)';
    params.q = `%${q}%`;
  }
  const products = await query<{ id: number; name: string; sku: string | null; price: number; stock_qty: number; is_active: number; category_name: string | null }[]>(
    `SELECT p.id, p.name, p.sku, p.price, p.stock_qty, p.is_active, c.name AS category_name
     FROM products p LEFT JOIN categories c ON c.id = p.category_id
     WHERE ${where} ORDER BY p.id DESC LIMIT 100`,
    params
  );
  return (
    <>
      <h2>Products</h2>
      <form><input type="search" name="q" defaultValue={q || ''} placeholder="Search…" /></form>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th>Active</th><th></th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}<div style={{ color: '#62675f', fontSize: '.8rem' }}>{product.category_name || ''}</div></td>
              <td>{product.sku}</td>
              <td>{money(Number(product.price))}</td>
              <td>{product.stock_qty}</td>
              <td>{product.is_active ? 'yes' : 'no'}</td>
              <td>
                <Link href={`/admin/products/${product.id}`}>Edit</Link>
                <form action={deactivateProductAction}><input type="hidden" name="id" value={product.id} /><button type="submit">Hide</button></form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

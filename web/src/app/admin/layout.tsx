import Link from 'next/link';
import { logoutAction } from '@/actions/auth.actions';
import { requireAdmin } from '@/actions/auth.actions';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin-shell">
      <link rel="stylesheet" href="/admin/admin.css" />
      <aside className="admin-sidebar">
        <h1>JustAclick</h1>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/products/new">New product</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/inventory">Inventory</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/customers">Customers</Link>
        <Link href="/admin/reports">Reports</Link>
        <form action={logoutAction}><button type="submit">Log out</button></form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

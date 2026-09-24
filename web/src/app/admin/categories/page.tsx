import { saveCategoryAction } from '@/actions/admin.actions';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function CategoriesAdminPage() {
  const categories = await query<{ id: number; name: string; slug: string; is_active: number }[]>('SELECT * FROM categories ORDER BY name');
  return (
    <>
      <h2>Categories</h2>
      <form className="admin-form" action={saveCategoryAction}>
        <label>Name<input name="name" required /></label>
        <label>Slug<input name="slug" /></label>
        <label>Image path<input name="image" /></label>
        <button type="submit">Add</button>
      </form>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Slug</th><th>Active</th></tr></thead>
        <tbody>{categories.map((category) => <tr key={category.id}><td>{category.name}</td><td>{category.slug}</td><td>{category.is_active}</td></tr>)}</tbody>
      </table>
    </>
  );
}

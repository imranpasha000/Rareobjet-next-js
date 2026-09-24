import { saveProductAction } from '@/actions/admin.actions';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await query<{ id: number; name: string }[]>('SELECT id, name FROM categories ORDER BY name');
  return (
    <>
      <h2>New product</h2>
      <form className="admin-form" action={saveProductAction} encType="multipart/form-data">
        <label>Name<input name="name" required /></label>
        <label>Slug<input name="slug" /></label>
        <label>Category
          <select name="category_id">
            <option value="">None</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
        <label>Price<input name="price" type="number" step="0.01" required /></label>
        <label>Compare at<input name="compare_at_price" type="number" step="0.01" /></label>
        <label>Stock<input name="stock_qty" type="number" defaultValue={0} /></label>
        <label>SKU<input name="sku" /></label>
        <label>Badge<input name="badge" /></label>
        <label>Grade<input name="grade_label" /></label>
        <label>Description<textarea name="description" /></label>
        <label>Image<input name="image" type="file" accept="image/*" /></label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

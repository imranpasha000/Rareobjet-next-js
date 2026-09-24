import { notFound } from 'next/navigation';
import { orderStatusAction } from '@/actions/admin.actions';
import { loadOrder } from '@/services/order.service';
import { ALLOWED_TRANSITIONS, money } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await loadOrder(Number(id), null, true);
  if (!order) notFound();
  const next = ALLOWED_TRANSITIONS[String(order.status)] || [];
  const items = order.items as { name_snapshot: string; qty: number; line_total: number }[];
  return (
    <>
      <h2>{String(order.order_number)}</h2>
      <p>{String(order.customer_name)} · {String(order.status)} · stock deducted: {String(order.stock_deducted)}</p>
      <ul>{items.map((item) => <li key={item.name_snapshot}>{item.name_snapshot} × {item.qty} — {money(item.line_total)}</li>)}</ul>
      <p><strong>Total {money(Number(order.total))}</strong> (incl. shipping {money(Number(order.shipping))})</p>
      {next.map((status) => (
        <form key={status} action={orderStatusAction}>
          <input type="hidden" name="id" value={String(order.id)} />
          <input type="hidden" name="status" value={status} />
          <button type="submit">Mark {status}</button>
        </form>
      ))}
    </>
  );
}

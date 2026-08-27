import { useState } from "react";

export type FieldType = "text" | "textarea" | "number" | "image";

export type FieldDef<T> = {
  key: keyof T & string;
  label: string;
  type?: FieldType;
};

type WithFlags = { id: string; enabled?: boolean; order?: number };

export function AdminPanelShell({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold sm:text-2xl">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function CollectionEditor<T extends WithFlags>({
  title,
  description,
  items,
  fields,
  labelKey,
  onChange,
  createItem,
  reorderable = false,
}: {
  title: string;
  description?: string;
  items: T[];
  fields: FieldDef<T>[];
  labelKey: keyof T & string;
  onChange: (next: T[]) => void;
  createItem: () => T;
  reorderable?: boolean;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<T>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Delete this item?")) return;
    onChange(items.filter((item) => item.id !== id));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next.map((item, i) => ({ ...item, order: i + 1 })));
  };

  return (
    <AdminPanelShell
      title={title}
      description={description}
      action={
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const created = createItem();
            onChange([...items, { ...created, order: items.length + 1 }]);
            setEditingId(created.id);
          }}
        >
          + Add New
        </button>
      }
    >
      <div className="space-y-3">
        {items.map((item, index) => {
          const open = editingId === item.id;
          return (
            <article key={item.id} className="card-base p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold">
                    {String(item[labelKey] || "Untitled")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.enabled === false ? "Disabled" : "Enabled"}
                    {reorderable ? ` • Position ${index + 1}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {reorderable ? (
                    <>
                      <button
                        type="button"
                        aria-label="Move up"
                        className="btn btn-outline px-3 py-1.5"
                        onClick={() => move(index, -1)}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        className="btn btn-outline px-3 py-1.5"
                        onClick={() => move(index, 1)}
                      >
                        ↓
                      </button>
                    </>
                  ) : null}
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={item.enabled !== false}
                      onChange={(event) =>
                        update(item.id, { enabled: event.target.checked } as Partial<T>)
                      }
                    />
                    Visible
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline px-3 py-1.5"
                    onClick={() => setEditingId(open ? null : item.id)}
                  >
                    {open ? "Close" : "Edit"}
                  </button>
                  <button
                    type="button"
                    className="btn px-3 py-1.5 text-destructive btn-outline"
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {open ? (
                <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className={field.type === "textarea" ? "sm:col-span-2" : ""}
                    >
                      <label
                        htmlFor={`${item.id}-${field.key}`}
                        className="text-xs font-semibold text-muted-foreground"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`${item.id}-${field.key}`}
                          rows={3}
                          className="field mt-1"
                          value={String(item[field.key] ?? "")}
                          onChange={(event) =>
                            update(item.id, { [field.key]: event.target.value } as Partial<T>)
                          }
                        />
                      ) : (
                        <input
                          id={`${item.id}-${field.key}`}
                          type={field.type === "number" ? "number" : "text"}
                          className="field mt-1"
                          value={String(item[field.key] ?? "")}
                          onChange={(event) =>
                            update(item.id, {
                              [field.key]:
                                field.type === "number"
                                  ? Number(event.target.value)
                                  : event.target.value,
                            } as Partial<T>)
                          }
                        />
                      )}
                      {field.type === "image" && item[field.key] ? (
                        <img
                          src={String(item[field.key])}
                          alt=""
                          loading="lazy"
                          className="mt-2 h-24 w-full rounded-lg object-cover"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
        {items.length === 0 ? (
          <p className="card-base p-6 text-sm text-muted-foreground">
            No items yet. Use “Add New” to create one.
          </p>
        ) : null}
      </div>
    </AdminPanelShell>
  );
}

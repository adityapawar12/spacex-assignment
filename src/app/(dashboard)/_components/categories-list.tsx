import Link from "next/link";
import CategoryItem from "./category-item";
import { cookies } from "next/headers";
import { decrypt } from "~/app/lib/session";

export default async function CategoriesList({
  categories,
  from,
  to,
  limit,
}: {
  categories: Array<any>;
  from: number;
  to: number;
  limit: number;
}) {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  console.log("session >>> ", session);

  return (
    <div className="flex flex-col items-start justify-start">
      {categories && categories.length > 0 ? (
        <>
          {categories.map((category) => (
            <div key={category.id} className="py-1">
              <CategoryItem
                id={category.id}
                name={category.name}
                userId={Number(session?.userId) || 0}
              />
            </div>
          ))}

          <div className="flex w-full items-center justify-center gap-2 py-2">
            {from - 6 >= 0 && (
              <Link href={`/categories?from=${from - 6}&to=${to}`}>
                <button className="rounded bg-black px-4 py-1 text-white">
                  previous
                </button>
              </Link>
            )}

            {from + 6 < limit && (
              <Link href={`/categories?from=${from + 6}&to=${to}`}>
                <button className="rounded bg-black px-4 py-1 text-white">
                  Next
                </button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <>No Categories found</>
      )}
    </div>
  );
}




export default async function Products() {
  // const products = await getProducts();

  return (
    <>
      <style>
        {`
          .grid-products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
        `}
      </style>
      <ul className="grid-products p-4">
      </ul>
    </>
  );
}

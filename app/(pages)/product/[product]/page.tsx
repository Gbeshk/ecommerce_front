import ProductPageClient from "@/app/components/productPageClient/ProductPageClient";

interface PageProps {
  params: Promise<{
    product: string;
  }>; // Changed: params is now a Promise
}

export default async function page({ params }: PageProps) {
  const { product } = await params; // Changed: await the params Promise

  return <ProductPageClient productId={product} />;
}

import ProductPageClient from "@/app/components/productPageClient/ProductPageClient";

interface PageProps {
  params: {
    product: string;
  };
}

export default function page({ params }: PageProps) {
  return <ProductPageClient productId={params.product} />;
}

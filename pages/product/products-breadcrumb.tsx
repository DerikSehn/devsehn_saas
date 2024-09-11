import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


type LinkType = {
  href: string;
  name: string;
};

export default function ProductsBreadcrumb({ links = [
  { href: '/', name: 'Início' },
] }: { links: LinkType[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={link.href} className="hover:underline"
            >
              {link.name}
            </BreadcrumbLink>
            {index < links.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
import List, { ListProps } from "@/components/List";

interface GridListProps extends ListProps {
  scrollable?: boolean;
  className?: string;
}

export default function GridList({
  children,
  scrollable,
  className = ``,
  ...props
}: GridListProps) {
  return (
    <List {...props}>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${scrollable ? "overflow-x-auto pb-4" : ""} ${className}`}
      >
        {children}
      </div>
    </List>
  );
}

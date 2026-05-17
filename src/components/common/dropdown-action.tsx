import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export default function DropdownAction({
  menu,
}: {
  menu: {
    label: string | ReactNode;
    variant?: "destructive" | "default";
    action?: () => void;
    type?: "button" | "link";
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground flex size-8"
          size="icon"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {menu.map((item, index) => (
          <DropdownMenuItem
            asChild={item.type === "link"}
            onClick={item.action}
            key={`dropdown-action-${index}`}
            variant={item.variant}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

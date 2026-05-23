import { ColumnsIcon } from "lucide-react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ReactNode } from "react";
import PaginationDataTable from "./pagination-data-table";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { LIMIT_LISTS } from "@/constants/data-table-constant";

export default function DataTable({
  header,
  data,
  isLoading,
  totalPages,
  currentPage,
  onChangePage,
  currentLimit,
  onChangeLimit,
}: {
  header: string[];
  data: (string | ReactNode)[][];
  isLoading?: boolean;
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  currentLimit: number;
  onChangeLimit: (limit: number) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-0">
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {header.map((column) => (
                <TableHead key={`th-${column}`} className="px-6 py-3">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={`tr-${rowIndex}`}>
                {row.map((column, columnIndex) => (
                  <TableCell
                    className="px-6 py-4"
                    key={`tc-${rowIndex}-${columnIndex}`}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell
                  className="text-center py-10"
                  colSpan={header.length}
                >
                  <div className="flex flex-col items-center gap-2">
                    <ColumnsIcon className="w-10 h-10 text-muted-foreground" />
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell
                  className="text-center py-10"
                  colSpan={header.length}
                >
                  <div className="flex flex-col items-center gap-2">
                    <ColumnsIcon className="w-10 h-10 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading...</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>
            <Select
              value={currentLimit.toString()}
              onValueChange={(value) => onChangeLimit(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Limit</SelectLabel>
                  {LIMIT_LISTS.map((limit) => (
                    <SelectItem key={limit} value={limit.toString()}>
                      {limit}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-end">
            <PaginationDataTable
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={onChangePage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

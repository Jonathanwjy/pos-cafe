import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

export default function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  selectItem,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  selectItem: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select {...rest} value={value} onValueChange={onChange}>
              <SelectTrigger
                id={name}
                name={name}
                className={cn("w-full", {
                  "border-red-500": form.formState.errors[name]?.message,
                })}
              >
                <SelectValue placeholder={`Select ${label}`}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {selectItem.map((item) => (
                    <SelectItem
                      key={item.label}
                      value={item.value}
                      disabled={item.disabled}
                      className="capitalize"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    ></FormField>
  );
}

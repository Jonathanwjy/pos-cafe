import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Table } from "@/validations/table-validation";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_CREATE_ORDER,
} from "@/constants/order-constant";
import { createOrder } from "../action";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DialogCreateOrder({
  refetch,
  tables,
}: {
  refetch: () => void;
  tables: Table[] | undefined | null;
}) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  useEffect(() => {
    if (createOrderState?.status === "error") {
      toast.error("Create Order failed", {
        description: createOrderState.errors?._form?.[0] || "An error occurred",
      });
    }
    if (createOrderState?.status === "success") {
      toast.success("Create Order Success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createOrderState]);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    console.log("🎯 DATA DARI FORM:", data);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      createOrderAction(formData);
    });
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Add a new order from customer</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"customer_name"}
            label="Customer Name"
            placeholder="Insert Customer name"
            type="text"
          />
          <FormSelect
            form={form}
            name={"table_id"}
            label="Table Number"
            selectItem={(tables ?? []).map((table: Table) => ({
              value: `${table.id}`,
              label: `${table.name} - ${table.status} (${table.capacity})`,
              disabled: table.status !== "available",
            }))}
          />{" "}
          <FormSelect
            form={form}
            name={"status"}
            label="Status"
            selectItem={STATUS_CREATE_ORDER}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {isPendingCreateOrder ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

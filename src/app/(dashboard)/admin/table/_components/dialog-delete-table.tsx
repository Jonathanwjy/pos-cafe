import DialogDelete from "@/components/common/dialog-delete";
import { startTransition, useActionState, useEffect } from "react";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { Table } from "@/validations/table-validation";
import { deleteTable } from "../actions";

export default function DialogDeleteTable({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Table;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deletTableState, deletTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    startTransition(() => {
      deletTableAction(formData);
    });
  };

  useEffect(() => {
    if (deletTableState?.status === "error") {
      toast.error("Delete Table Failed", {
        description: deletTableState.errors?._form?.[0],
      });
    }

    if (deletTableState?.status === "success") {
      toast.success("Delete Table Success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deletTableState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      title="Table"
    />
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import { MenuForm, menuFormSchema } from "@/validations/menu-validation";
import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constants/menu-constant";
import { createMenu } from "../action";
import FormMenu from "./form-menu";

export default function DialogCreateMenu({ refetch }: { refetch: () => void }) {
  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: INITIAL_MENU,
  });

  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  useEffect(() => {
    if (createMenuState?.status === "error") {
      toast.error("Create Menu failed", {
        description: createMenuState.errors?._form?.[0] || "An error occurred",
      });
    }
    if (createMenuState?.status === "success") {
      toast.success("Create Menu Success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createMenuState]);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    console.log("🎯 DATA DARI FORM:", data);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? (preview?.file ?? "") : value);
    });
    startTransition(() => {
      createMenuAction(formData);
    });
  });

  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}

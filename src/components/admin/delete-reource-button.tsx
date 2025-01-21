"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { adminClient } from "@/utils/supabase/admin";
import { Loader, TrashIcon } from "lucide-react";
import { useState } from "react";

const DeleteResourceButton = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteResource = async () => {
    setIsDeleting(true);
    const { error } = await adminClient.from("resources").delete().eq("id", id);
    if (error) {
      setIsDeleting(false);
      return toast({
        title: error?.message || "Failed to delete resource!",
        variant: "destructive",
      });
    }

    toast({
      title: "Resource deleted successfully!",
    });
    setIsDeleting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently this resource
            and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteResource}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteResourceButton;

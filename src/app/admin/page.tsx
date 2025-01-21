import AddCategoryForm from "@/components/admin/add-category-form";
import AddResourceForm from "@/components/admin/add-resource-form";
import React from "react";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-8">
      <div className="w-full max-w-sm rounded-lg border p-6">
        <AddCategoryForm />
      </div>
      <div className="w-full max-w-xl rounded-lg border p-6">
        <AddResourceForm />
      </div>
    </div>
  );
};

export default AdminPage;

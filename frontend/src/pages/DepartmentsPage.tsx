import { useMemo, useState } from "react";

import PageContainer from "../components/layout/PageContainer";

import DepartmentToolbar from "../components/department/DepartmentToolbar";
import DepartmentSearch from "../components/department/DepartmentSearch";
import DepartmentTable from "../components/department/DepartmentTable";
import DepartmentModal from "../components/department/DepartmentModal";
import DeleteDepartmentDialog from "../components/department/DeleteDepartmentDialog";

import { useDepartments } from "../hooks/useDepartments";
import { useCreateDepartment } from "../hooks/useCreateDepartment";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import { useDeleteDepartment } from "../hooks/useDeleteDepartment";

import type { Department } from "../types/department.types";
import type { DepartmentFormData } from "../components/department/DepartmentForm";

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState<Department | null>(null);

  const [deleteDepartment, setDeleteDepartment] =
    useState<Department | null>(null);

  const { data, isLoading } = useDepartments();

  const createMutation = useCreateDepartment();

  const updateMutation = useUpdateDepartment();

  const deleteMutation = useDeleteDepartment();

  const departments =
    data?.data ?? data ?? [];

  const filteredDepartments = useMemo(() => {
    return departments.filter((department: Department) =>
      department.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [departments, search]);

  const defaultValues = useMemo(() => {
    if (!editingDepartment) return undefined;

    return {
      name: editingDepartment.name,
    };
  }, [editingDepartment]);

  const handleSubmit = async (
    formData: DepartmentFormData
  ) => {
    if (editingDepartment) {
      await updateMutation.mutateAsync({
        id: editingDepartment.id,
        payload: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }

    setEditingDepartment(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <PageContainer title="Departments">
        Loading...
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Departments">

      <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow">

        <DepartmentToolbar
          onAdd={() => {
            setEditingDepartment(null);
            setIsModalOpen(true);
          }}
        />

        <DepartmentSearch
          value={search}
          onChange={setSearch}
        />

        <div className="mt-6 flex-1 overflow-hidden">

          <DepartmentTable
            departments={filteredDepartments}
            onEdit={(department) => {
              setEditingDepartment(department);
              setIsModalOpen(true);
            }}
            onDelete={(department) =>
              setDeleteDepartment(department)
            }
          />

        </div>

      </div>

      <DepartmentModal
        open={isModalOpen}
        title={
          editingDepartment
            ? "Edit Department"
            : "Add Department"
        }
        defaultValues={defaultValues}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={() => {
          setEditingDepartment(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteDepartmentDialog
        open={!!deleteDepartment}
        departmentName={
          deleteDepartment?.name ?? ""
        }
        onCancel={() =>
          setDeleteDepartment(null)
        }
        onConfirm={async () => {
          if (!deleteDepartment) return;

          await deleteMutation.mutateAsync(
            deleteDepartment.id
          );

          setDeleteDepartment(null);
        }}
      />

    </PageContainer>
  );
}
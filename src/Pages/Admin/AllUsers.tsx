/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllUsersQuery,
  useUpdateUserInfoMutation,
} from "@/Redux/Features/User/user.api";
import { ArchiveX, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AllUsers() {
  const { data } = useAllUsersQuery(undefined);
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [formData, setFormData] = useState<any>({
    name: "",
    address: "",
    phone: "",
    status: "",
  });
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [open, setOpen] = useState(false);
  const users = data?.data.filter((item: any) => item.role === "USER");
  //console.log(users);
  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user?.name,
      address: user?.address,
      phone: user.phone,
      status: user.status,
    });
    setOpen(true);
  };
  const handleEdit = async () => {
    try {
      await updateUserInfo({
        id: selectedUser._id,
        payload: formData,
      }).unwrap();
      toast.success("User updated");
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Update Failed!");
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-cyan-600">
        All Users
      </h1>
      <Table>
        <TableCaption>A list of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Edit
                    onClick={() => handleOpenModal(user)}
                    className="text-green-600 font-bold"
                  />{" "}
                  <ArchiveX className="text-red-600 font-bold" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update User Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Info</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              placeholder="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AllAgents() {
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
  const agents = data?.data.filter((item: any) => item.role === "AGENT");

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
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleEdit = async () => {
    try {
      await updateUserInfo({
        id: selectedUser._id,
        payload: formData,
      }).unwrap();
      toast.success("Agent updated");
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Update Failed!");
    }
  };

  const handleApprove = async (user: any) => {
    try {
      setProcessingId(user._id);
      await updateUserInfo({
        id: user._id,
        payload: { status: "ACTIVE", isApproved: true },
      }).unwrap();
      toast.success("Agent approved");
    } catch (err: any) {
      console.log(err);
      toast.error("Approve failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleSuspend = async (user: any) => {
    try {
      setProcessingId(user._id);
      await updateUserInfo({
        id: user._id,
        payload: { status: "SUSPENDED", isApproved: false },
      }).unwrap();
      toast.success("Agent suspended");
    } catch (err: any) {
      console.log(err);
      toast.error("Suspend failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-cyan-600">
        All Agents
      </h1>
      <Table>
        <TableCaption>A list of all agents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Name</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium text-center align-middle">
                {user.name}
              </TableCell>
              <TableCell className="text-center align-middle">
                {user.role}
              </TableCell>
              <TableCell className="text-center align-middle">
                {user.address}
              </TableCell>
              <TableCell className="text-center align-middle">
                {user.phone}
              </TableCell>
              <TableCell className="text-center align-middle">
                {user.status}
              </TableCell>
              <TableCell className="text-center align-middle">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleApprove(user)}
                    disabled={processingId === user._id}
                    className="px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleSuspend(user)}
                    disabled={processingId === user._id}
                    className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
                  >
                    Suspend
                  </button>

                  <Edit
                    onClick={() => handleOpenModal(user)}
                    className="text-green-600 font-bold cursor-pointer"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Agent Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agent Info</DialogTitle>
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

          <DialogFooter className="flex flex-wrap gap-2">
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update</Button>

            {/* Approve / Suspend quick actions */}
            {selectedUser?.isApproved ? (
              <Button
                onClick={() => handleSuspend(selectedUser)}
                variant="destructive"
              >
                Suspend
              </Button>
            ) : (
              <Button
                onClick={() => handleApprove(selectedUser)}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

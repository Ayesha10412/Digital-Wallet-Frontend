/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllUsersQuery } from "@/Redux/Features/User/user.api";

export default function AllUsers() {
  const { data } = useAllUsersQuery(undefined);
  const users = data?.data.filter((item: any) => item.role === "USER");
  console.log(users);
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
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-right">{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

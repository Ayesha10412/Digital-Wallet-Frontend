/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateInfoMutation,
  useUserInfoQuery,
} from "@/Redux/Features/User/user.api";
import { navigateToProfile } from "@/Utils/navigateRoute";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
 
export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const [updateInfo, { isLoading }] = useUpdateInfoMutation();
  const { data: userData, refetch } = useUserInfoQuery(undefined);
  const User = userData?.data?.role;
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInfo(formData).unwrap();
      toast.success("Profile Updated Successfully!!");
      await refetch();
      navigateToProfile(navigate, User);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border border-purple-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-700">
            Update Your Profile
          </CardTitle>
          <CardDescription>
            Change your personal details below and save your updates.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name" className="mb-1">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="mb-1">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="address" className="mb-1">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center py-4 border-t border-purple-100">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

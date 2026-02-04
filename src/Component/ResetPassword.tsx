/* eslint-disable @typescript-eslint/no-explicit-any */
import useRole from "@/Hooks/useRole";
import { useResetPasswordMutation } from "@/Redux/Features/auth/auth.api";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPassword() {
  const { profilePath } = useRole();
  const [resetPassword] = useResetPasswordMutation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    try {
      const res = await resetPassword({ oldPassword, newPassword }).unwrap();
      //console.log(res);
      toast.success(res.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate(profilePath);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-12 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl text-emerald-700 font-bold text-center mb-12">
        Reset Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Old Password */}
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowOld(!showOld)}
          >
            {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={confirmPassword ? "text" : "password"}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

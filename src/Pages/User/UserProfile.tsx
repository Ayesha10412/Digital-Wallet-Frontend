import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserInfoQuery } from "@/Redux/Features/User/user.api";
import { Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function UserProfile() {
  const { data } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const user = data?.data;
  
  return (
    <div>
      <h1 className="text-center text-green-500 font-bold text-3xl mb-8">
        User Profile
      </h1>
      <div className="flex justify-center items-center p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 min-h-screen">
        <Card className="w-full max-w-md shadow-xl rounded-2xl border border-purple-200 bg-white/90 backdrop-blur-md transition-transform hover:scale-[1.02] duration-300">
          <CardHeader className="flex flex-col items-center gap-3">
            {/*  User Image / Placeholder */}
            <Avatar className="w-28 h-28 border-4 border-purple-300 shadow-md">
              <AvatarImage src={user?.picture || ""} alt={user?.name} />
              <AvatarFallback className="bg-purple-200 text-purple-700 text-xl">
                {user?.name ? user.name.charAt(0) : "?"}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-700">
                {user?.name || "Unknown User"}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {user?.role || "User Role"}
              </CardDescription>
            </div>

            <Badge
              variant={user?.status === "ACTIVE" ? "default" : "secondary"}
              className={`mt-1 ${
                user?.status === "ACTIVE"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400"
              }`}
            >
              {user?.status || "Inactive"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-3 text-gray-700 px-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500" />
              <span>{user?.email || "No email provided"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-500" />
              <span>{user?.phone || "No phone number"}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>{user?.address || "Address not set"}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span>Role: {user?.role || "Unknown"}</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>Approved: {user?.isApproved ? "✅ Yes" : "❌ No"}</span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center py-4 border-t border-purple-100">
            <button
              onClick={() => navigate("/profile/edit")}
              className="px-6 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition font-medium shadow-md"
            >
              Edit Profile
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

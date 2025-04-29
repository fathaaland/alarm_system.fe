import * as React from "react";
import { useUserStore } from "../../providers";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import { Avatar, AvatarFallback } from "./avatar";
import axios from "axios";
import { toast } from "sonner";

export const Navbar: React.FC = () => {
  const user = useUserStore((state) => state.userData);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateUserData, updateAccessToken, updateRefreshToken } =
    useUserStore();

  interface DtoOut {
    success: boolean;
  }

  const BEARER_TOKEN = useUserStore((state) => state.accessToken);
  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post<DtoOut>(
        "http://localhost:3000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      updateAccessToken(null);
      updateRefreshToken(null);
      updateUserData(null);

      navigate("/login");
      queryClient.clear();
      toast.success("Logout successful", {
        description: "You have been logged out successfully",
      });
    },
    onError: (error: any) => {
      toast.error("Logout failed", {
        description:
          error.response?.data?.message || "An error occurred during logout",
      });
    },
  });
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <Link to="/homepage" className="font-bold text-lg text-primary">
        SafeHouse
      </Link>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <Button
          onClick={() => logoutMutation()}
          disabled={isPending}
          variant="ghost"
          size="sm"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

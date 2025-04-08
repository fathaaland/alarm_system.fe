import * as React from "react";
import { useFetchData, useToast, useUserStore } from "../../providers";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { getData } = useFetchData();
  const navigate = useNavigate();
  const { updateUserData, updateAccessToken } = useUserStore();
  const toast = useToast();

  interface DtoOut {
    success: boolean;
  }

  function handleLogOut() {
    const {
      data: response,
      isLoading,
      error,
    } = getData<DtoOut>("logout", "/auth/logout");

    if (response?.success) {
      navigate("/login");
      toast?.open("Logged out successfully");
      updateAccessToken(null);
      updateUserData(null);
    }
  }

  // ### why logout needs refresh token in body

  return (
    <>
      <div>
        {/* App name */}
        <p>App name</p>
        {/* ### Avatar with menu */}
        {/* Log out button */}
        <button onClick={() => handleLogOut()}>
          <LogOut />
        </button>
      </div>
    </>
  );
};

// ### need to implement avatar and menu using UserProvider

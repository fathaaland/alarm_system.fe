import * as React from "react";
import { HouseholdWithOwner } from "../../assets";
import { Input } from "../input";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../../../providers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Pause, Play, Trash2, XCircle } from "lucide-react";

interface SettingsTabProps {
  household?: HouseholdWithOwner;
  goBack: () => void;
  isActive: boolean;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  household,
  goBack,
  isActive,
}) => {
  const [openActivateDialog, setOpenActivateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [inputName, setInputName] = React.useState(household?.name || "");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const householdId = household?._id;
  const BEARER_TOKEN = useUserStore((state) => state.accessToken);

  const hasDevices = React.useMemo(
    () => (household?.devices?.length ?? 0) > 0,
    [household?.devices]
  );

  /* delete household */
  interface DtoOutDeleteHousehold {
    success: boolean;
    message: string;
  }

  const {
    mutate: deleteHouseholdMutation,
    isPending: isPendingDeleteHousehold,
    error: errorDeleteHousehold,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete<DtoOutDeleteHousehold>(
        `http://localhost:3000/household/delete/${householdId}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["households"] });
      navigate("/homepage");
      queryClient.invalidateQueries({ queryKey: ["household", householdId] });
      toast.success("Delete successful", {
        description: "Your household has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast.error("Delete failed", {
        description:
          error.response?.data?.message ||
          `An error occurred during deletion of household ${householdId}`,
      });
    },
  });

  /* update household name */
  interface DtoOutUpdateHouseholdName {
    success: boolean;
  }
  interface DtoInUpdateHouseholdName {
    newName: string;
  }

  const {
    mutate: updateHouseholdNameMutation,
    isPending: isPendingUpdateHouseholdName,
  } = useMutation<DtoOutUpdateHouseholdName, Error, DtoInUpdateHouseholdName>({
    mutationFn: async (data: DtoInUpdateHouseholdName) => {
      const response = await axios.put<DtoOutUpdateHouseholdName>(
        `http://localhost:3000/household/update-name/${householdId}`,
        { name: data.newName },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["household", householdId] });
      toast.success("Update successful", {
        description: `Household name has been changed successfully.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Update failed", {
        description:
          (error as any).response?.data?.message ||
          `An error occurred while updating household name.`,
      });
    },
  });

  /* activate household */
  interface DtoOutActivateHousehold {
    success: boolean;
  }
  interface DtoInActivateHousehold {
    activateHouseholdId?: string;
  }

  const {
    mutate: activateHouseholdMutation,
    isPending: isPendingActivateHousehold,
  } = useMutation<DtoOutActivateHousehold, Error, DtoInActivateHousehold>({
    mutationFn: async (data: DtoInActivateHousehold) => {
      const response = await axios.put<DtoOutActivateHousehold>(
        "http://localhost:3000/device/set-state-active",
        { householdId: data.activateHouseholdId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["household", householdId],
      });
      toast.success("State change successful", {
        description: `Household has been successfully set to active.`,
      });
    },
    onError: (error: Error) => {
      toast.error("State change failed", {
        description:
          (error as any).response?.data?.message ||
          `An error occurred while changing the state of your household.`,
      });
    },
  });

  /* deactivate household */
  interface DtoOutDeactivateHousehold {
    success: boolean;
  }
  interface DtoInDeactivateHousehold {
    deactivateHouseholdId?: string;
  }

  const {
    mutate: deactivateHouseholdMutation,
    isPending: isPendingDeactivateHousehold,
  } = useMutation<DtoOutDeactivateHousehold, Error, DtoInDeactivateHousehold>({
    mutationFn: async (data: DtoInDeactivateHousehold) => {
      const response = await axios.put<DtoOutDeactivateHousehold>(
        "http://localhost:3000/device/set-state-deactive",
        { householdId: data.deactivateHouseholdId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["household", householdId],
      });
      toast.success("State change successful", {
        description: `Household has been successfully set to deactive.`,
      });
    },
    onError: (error: Error) => {
      toast.error("State change failed", {
        description:
          (error as any).response?.data?.message ||
          `An error occurred while changing the state of your household.`,
      });
    },
  });

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-medium">Settings</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goBack()}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-700">
            Household Status
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Change the state of your household
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {!hasDevices && "Your household does not include any devices"}
                {hasDevices && isActive && "Your household is currently active"}
                {hasDevices &&
                  !isActive &&
                  "Your household is currently inactive"}
              </p>
            </div>
            {hasDevices ? (
              <Button
                variant="outline"
                size="sm"
                className={
                  isActive
                    ? "text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                    : "text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                }
                onClick={() => setOpenActivateDialog(true)}
              >
                {isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <XCircle className="h-5 w-5 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>State cannot be set because there are no devices.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-100">
          <h3 className="text-md font-medium text-gray-700">
            Household Details
          </h3>
          <div className="space-y-2">
            <label htmlFor="household-name" className="text-gray-600 block">
              Change household name
            </label>
            <div className="flex space-x-2">
              <Input
                id="household-name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="max-w-md"
                placeholder="Enter household name"
              />
              <Button
                size="sm"
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() =>
                  updateHouseholdNameMutation({ newName: inputName })
                }
                disabled={isPendingUpdateHouseholdName}
              >
                {isPendingUpdateHouseholdName ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-100">
          <h3 className="text-md font-medium text-gray-700 text-red-600">
            Danger Zone
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Delete household</p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* acivate / deactivate household dialog */}
      <Dialog open={openActivateDialog} onOpenChange={setOpenActivateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Deactivate" : "Activate"} Household
            </DialogTitle>
            <DialogDescription>
              Do you want to {isActive ? "deactivate" : "activate"}{" "}
              {household?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
              disabled={isPendingDeleteHousehold}
              className="sm:order-first"
            >
              Cancel
            </Button>
            {isActive ? (
              <Button
                onClick={() =>
                  deactivateHouseholdMutation({
                    deactivateHouseholdId: householdId,
                  })
                }
                disabled={isPendingDeactivateHousehold}
                className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
              >
                {isPendingDeactivateHousehold
                  ? "Deactivating..."
                  : "Deactivate"}
              </Button>
            ) : (
              <Button
                // create green shceme instead of variant destructive
                variant="destructive"
                onClick={() =>
                  activateHouseholdMutation({
                    activateHouseholdId: householdId,
                  })
                }
                disabled={isPendingActivateHousehold}
              >
                {isPendingDeleteHousehold ? "Activating..." : "Activate"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete household dialog*/}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Household</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {household?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
              disabled={isPendingDeleteHousehold}
              className="sm:order-first"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteHouseholdMutation()}
              disabled={isPendingDeleteHousehold}
            >
              {isPendingDeleteHousehold ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

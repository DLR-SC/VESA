import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetLayout, setRealignMode } from "../../store/ui/uiSlice";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";

interface GridLayoutMenuProps {
  anchorEl: HTMLElement | null;
  openMenu: boolean;
  onClose: () => void;
}

const GridLayoutMenu = ({
  anchorEl,
  openMenu,
  onClose,
}: GridLayoutMenuProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const realignMode = useAppSelector((state) => state.ui.realignMode);

  const handleToggleEditLayout = () => {
    if (realignMode) {
      dispatch(setRealignMode(false));
    }
    if (!realignMode) {
      dispatch(setRealignMode(true));
    }
  };

  const handleResetLayout = () => {
    dispatch(resetLayout());
  };

  return (
    <Menu
      id="grid-settings-menu"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={onClose}
      MenuListProps={{ "aria-labelledby": "grid-settings-button" }}
    >
      <MenuItem onClick={handleToggleEditLayout} selected={realignMode}>
        <ListItemIcon>
          <EditIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          {realignMode ? "Exit Edit Mode" : "Edit Layout"}
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleResetLayout}>
        <ListItemIcon>
          <ReplayIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Reset Layout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default GridLayoutMenu;

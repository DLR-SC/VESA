import { Menu, MenuItem } from "@mui/material";

interface GridLayoutMenuProps {
  anchorEl: HTMLElement | null;
  openMenu: boolean;
  onClose: () => void;
}

const GridLayoutMenu = ({ anchorEl, openMenu, onClose }: GridLayoutMenuProps): JSX.Element => {
  return (
    <Menu
      id="grid-settings-menu"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={onClose}
      MenuListProps={{ "aria-labelledby": "grid-settings-button" }}
    >
      <MenuItem onClick={() => console.log("Reset layout clicked")}>
        Reset layout
      </MenuItem>
      <MenuItem onClick={() => console.log("Edit layout clicked")}>
        Edit layout
      </MenuItem>
    </Menu>
  );
};

export default GridLayoutMenu;

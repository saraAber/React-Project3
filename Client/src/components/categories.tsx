import { useContext } from "react";
import { context } from "./user-context";
import { Link, Outlet } from "react-router-dom";
import { categoryContext } from "./categories-context";
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";

const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    margin: "0 auto"
};

const Categories = () => {
    const { connected } = useContext(context);
    const { categories } = useContext(categoryContext);
    return <>
        {connected && 
         <Button
            variant="outlined"
            component={Link}
            to="add"
        >
           Add a new category
        </Button>}
        <Outlet />
        <List sx={style} aria-label="mailbox folders">
            {categories.map(cat => <>
                <ListItem key={cat.Id}>
                    <ListItemText primary={cat.Name} />
                </ListItem>
                <Divider component="li" />
            </>
            )}
        </List>
    </>
}
export default Categories;
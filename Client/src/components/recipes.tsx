import { useContext, useState } from "react";
import { context } from "./user-context";
import { recipeContext } from "./recipeis-context";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { categoryContext } from "./categories-context";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    Button,
    Box
} from '@mui/material';

const Recipes = () => {
    const { recipes, setRecipes } = useContext(recipeContext);
    const { categories } = useContext(categoryContext);
    const { user, connected } = useContext(context);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const deleteRecipy = (id: number) => {
        axios.post(`http://localhost:8080/api/recipe/delete/${id}`)
            .then(() => {
                const recipesWithoutDeleted = recipes.filter((r) => r.Id !== id);
                setRecipes(recipesWithoutDeleted);
            })
            .catch((error) => console.error(error));
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recipes.length) : 0;

    return (
        <>
            <Box sx={{ margin:"20px auto",display: "flex", width: "350px", justifyContent: "space-between" }}>
                {connected &&
                    <Button
                        variant="outlined"
                        component={Link}
                        to="filter"
                    >
                        Filter Recipes
                    </Button>
                }
                {connected &&
                    <Button
                        variant="outlined"
                        component={Link}
                        to="add"
                    >
                        Add a new recipe
                    </Button>
                }
            </Box>
            <Outlet />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                            ? recipes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : recipes
                        ).map((r) => (
                            <TableRow key={r.Id}>
                                <TableCell component="th" scope="row">
                                    Recipe name: {r.Name}
                                </TableCell>
                                <TableCell align="right">Duration: {r.Duration}</TableCell>
                                <TableCell align="right">Difficulty: {r.Difficulty}</TableCell>
                                <TableCell align="right">Category: {categories.find((cat) => cat.Id === r.Categoryid)?.Name}</TableCell>
                                <TableCell align="right">
                                    {connected && user.Id === r.UserId && (
                                        <>
                                            <button onClick={() => deleteRecipy(r.Id)}>delete</button>
                                            <Link to={`edit/${r.Id}`}>edit</Link>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={recipes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default Recipes;
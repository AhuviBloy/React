
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router";
import { Grid, Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import recipeStore, { RecipeType } from "../../store/recipeStore";

export default observer(() => {
  const [currentRecpie, setcurrentRecpie] = useState<RecipeType | null>(null);

  const navigate = useNavigate();
  const handleUpdate = (recipe: RecipeType) => {
    setcurrentRecpie(recipe);
    navigate(`${recipe.id}`)
  }
  
  return (
    <Grid container spacing={2} sx={{ height: "100vh"}}>
      <Grid item xs={4} sx={{ borderRight: "1px solid", padding: 2 ,backgroundColor:"#ffffffa3"}}>
        <Typography variant="h5" gutterBottom>
          All Recipes
        </Typography>
        <List>
          {recipeStore.getRecipes.map((recipe) => (
            <ListItem key={recipe.id} disablePadding>
              <ListItemButton onClick={() => handleUpdate(recipe)}>
                {recipe.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    <Grid item xs={8} sx={{ padding: 2, marginBottom: 10, width:800}}>
    {currentRecpie!=null &&<div style={{
            backgroundColor: "rgb(255 250 248 / 90%)",
            padding: "39px",
            borderRadius: "10px",
            boxShadow: "-2px -1px 9px 3px #b2acac7a",
            margin: "16px",
            textAlign: "center",
            width:"800px",
            minHeight:"70%"
      }}>
          <Box height="100%">
            <Outlet />
          </Box>
        </div>}
      </Grid>
    </Grid>
  );
})




import { useState } from "react";
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,Typography,} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import recipeStore, { RecipeType } from "../../store/recipeStore";
import { observer } from "mobx-react-lite";

const UpdateRecipe = observer(() => {
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const original = recipeStore.GetRecipeById(Number(id));
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: any) => {
    const newRecipe: Partial<RecipeType> = {
      title: data.title || original?.title,
      authorId: data.authorId || original?.authorId,
      description: data.description || original?.description,
      ingredients: data.ingredients?.length
        ? data.ingredients
        : original?.ingredients,
      instructions: data.instructions || original?.instructions,
    };
    recipeStore.updateRecipe(newRecipe);
    setClicked(false);
    navigate("/");
    reset({
      ingredients: []
    });
  };
  const handleModalOpen = () => {
    reset({ ingredients: [] });
    fields.forEach((_field, index) => remove(index));
  };
  return (
    <>
      <Button
        onClick={() => { handleModalOpen(); setClicked(true);}}
        variant="contained"
        sx={{color: "white",borderRadius: "8px",marginRight: "10px",padding: "6px 16px",}}
      >
        {`Update Recipe ${original?.title}`}
      </Button>

      <Dialog
        open={clicked}
        onClose={() => {
          setClicked(false);
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Update Recipe</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("title")}
              type="text"
              fullWidth
              label="Recipe Title"
              variant="outlined"
              margin="normal"
              size="small"
              defaultValue={original?.title}
            />
            <TextField
              {...register("description")}
              type="text"
              fullWidth
              label="Recipe Description"
              variant="outlined"
              margin="normal"
              size="small"
              defaultValue={original?.description}
            />

            <div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Ingredients:
              </Typography>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    {...register(`ingredients.${index}`)}
                    type="text"
                    fullWidth
                    label={`Ingredient #${index + 1}`}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    defaultValue={original?.ingredients[index] || ""}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outlined"
                    color="primary"
                    sx={{ height: "40px", marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append("")}
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Add Ingredient
              </Button>
            </div>

            <TextField
              {...register("instructions")}
              type="text"
              fullWidth
              label="Instructions"
              variant="outlined"
              margin="normal"
              size="small"
              multiline
              defaultValue={original?.instructions}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setClicked(false);
            }}
            variant="outlined"
            color="primary"
            sx={{ height: "40px" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            sx={{ height: "40px" }}
          >
            Update Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default UpdateRecipe;

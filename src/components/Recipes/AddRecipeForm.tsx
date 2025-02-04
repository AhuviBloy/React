import { object, string, array } from "yup";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import recipeStore, { RecipeType } from "../../store/recipeStore";
import { UserContext } from "../../context/UserContext";


const schema = object({
    title: string().required('Recipe title is required'),
    description: string().required('Recipe description is required'),
    ingredients: array()
        .of(string().required("Ingredient must be filled"))
        .min(1, "At least one ingredient is required"),
    instructions: string().required('Instructions are required'),
});

const AddRecipeForm = observer( () => {

    const navigate = useNavigate();

    const [click, setClick] = useState(true);
   
    
    const userCon = useContext(UserContext)!;
if (!userCon) throw new Error("ERROR Profile must be used within a UserContext.Provider");
 


    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ingredients: ["", "", ""],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
      });

    const onSubmit: SubmitHandler<Partial<RecipeType>> = (data) => {
        const newRecipe: Partial<RecipeType> = {
            authorId: userCon.user?.id || "",
            title: data.title || "",
            description: data.description || "",
            ingredients: data.ingredients || [],
            instructions: data.instructions || "",
        };

        console.log(newRecipe);
        recipeStore.addRecipe(newRecipe);
        setClick(false);
        navigate("/")
        reset({
            ingredients: []           
        });
    };
    
    const close=()=>{
        setClick(false);
        navigate("/")
    }
    return (
        <Dialog open={click} onClose={close}>
            <DialogTitle>Add Recipe</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Recipe Title"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        sx={{ height: '40px', maxWidth: '300px' }}
                    />

                    <TextField
                        fullWidth
                        label="Recipe Description"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        multiline
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{ height: '40px', maxWidth: '300px' }}
                    />

                    <div>
                        <h4>Ingredients:</h4>
                        {fields.map((field, index) => (
                            <div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    label={`Ingredient #${index + 1}`}
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    {...register(`ingredients.${index}`)}
                                    error={!!errors.ingredients}
                                    helperText={errors.ingredients?.message}
                                    sx={{ marginRight: '10px', height: '40px', maxWidth: '200px' }}
                                />
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        minWidth: '100px',
                                        height: '40px',
                                        marginLeft: '10px',
                                        marginTop: '11px',
                                        padding: '6px 10px',
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => append("")}
                            variant="contained"
                            color="primary"
                            sx={{
                                marginTop: '10px',
                                maxWidth: '200px',
                            }}
                        >
                            Add Ingredient
                        </Button>
                    </div>

                    <TextField
                        fullWidth
                        label="Instructions"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        multiline
                        {...register('instructions')}
                        error={!!errors.instructions}
                        helperText={errors.instructions?.message}
                        sx={{ height: '40px', maxWidth: '300px' }}
                    />

                    <DialogActions>
                        <Button
                            type="button"
                            onClick={close}
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ height: '40px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ height: '40px' }}
                        >
                            Add Recipe
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default AddRecipeForm;

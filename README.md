בשרת עשיתי שינויים:
1.התחברות היא בעזרת שם וסיסמא(בכללי אין שם פרטי ושם משפחה אלא רק שם)
2.
```js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res, next) => {
    const recipeId = req.header('recipe-id');
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

    const recipe = db.recipes.find(recipe => recipe.id == recipeId);
    if (!recipe) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    req.recipe = recipe;
    next();
};
```
3.
```js
router.put('/', authMiddleware, (req, res) => {
    const { title ,description, authorId,ingredients, instructions } = req.body;
    const id = (req.header('recipe-id'));


    const db = JSON.parse(fs.readFileSync(dbPath));

    const recipe = db.recipes.find(recipe => recipe.id=== id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

 recipe.title=title;
 recipe.authorId=authorId;
 recipe.description=description;
 recipe.ingredients=ingredients;
 recipe.instructions= instructions;

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({recipe});
});
```

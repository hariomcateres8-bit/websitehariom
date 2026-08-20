# TODO — Admin: Edit Package Menu Items (name + image only) & Keep Planners Separate

## Steps

1. [ ] `src/routes/admin.tsx` — Add edit state + `updateMenuItemInCategory` function for menu items inside package categories.
2. [ ] `src/routes/admin.tsx` — Add pencil (edit) button on each item chip + inline edit form (name + image only).
3. [ ] `src/routes/package-planner.tsx` — Remove `mergedDishCatalog` fallback so Package Planner only shows its own package menu items (keeps Menu Planner & Package Planner separate).
4. [ ] `src/routes/package-planner.tsx` — Remove now-unused `getMergedDishCatalog` import.
5. [ ] Type-check / build to verify no errors.

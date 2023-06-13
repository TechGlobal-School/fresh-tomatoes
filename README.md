# Fresh Tomatoes

## CRUD table

| URL               | HTTP Verb    | Action  | What it does             |
| ----------------- | ------------ | ------- | ------------------------ |
| /reviews or /     | GET          | index   | See all reviews          |
| /reviews/new      | GET          | new     | See new review form      |
| /reviews          | POST         | create  | Create a new review      |
| /reviews/:id      | GET          | show    | Show a single review     |
| /reviews/:id/edit | GET          | edit    | See the edit review form |
| /reviews/:id      | PUT or PATCH | update  | Show a single review     |
| /reviews/:id      | DELETE       | destroy | Delete a single review   |

...

### Day 1

- CRUD
- MONGODB (document)
- Mongoose ODM (schema, model)
- environment variables in Node apps

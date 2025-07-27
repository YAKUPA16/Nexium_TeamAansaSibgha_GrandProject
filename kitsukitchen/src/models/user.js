import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  steps: [String],
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recipes: [RecipeSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

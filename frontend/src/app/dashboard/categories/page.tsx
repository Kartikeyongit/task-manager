import { Tag } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CategoriesPage() {
  const categories = [
    { name: "Work", count: 12, color: "bg-blue-500" },
    { name: "Personal", count: 8, color: "bg-green-500" },
    { name: "Shopping", count: 5, color: "bg-purple-500" },
    { name: "Health", count: 3, color: "bg-red-500" },
    { name: "Learning", count: 7, color: "bg-yellow-500" },
    { name: "Finance", count: 4, color: "bg-indigo-500" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Tag className="h-8 w-8" />
            Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize your tasks with categories
          </p>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <Tag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} tasks
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Create New Category
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-yellow-500", "bg-indigo-500"].map(
                (color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full ${color}`}
                  />
                )
              )}
            </div>
          </div>
          <Button>Create Category</Button>
        </div>
      </Card>
    </div>
  );
}

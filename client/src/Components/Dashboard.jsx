import React, { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/button";
import { Input } from "./ui/Input.jsx";
import { Textarea} from "./ui/TextArea";

import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

export default function DiaryDashboard() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!title || !description) return;

    const newEntry = {
      id: editId || Date.now(),
      title,
      description,
      timestamp: new Date(),
    };

    if (editId) {
      setEntries((prev) =>
        prev.map((entry) => (entry.id === editId ? newEntry : entry))
      );
      setEditId(null);
    } else {
      setEntries([newEntry, ...entries]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEdit = (entry) => {
    setTitle(entry.title);
    setDescription(entry.description);
    setEditId(entry.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📓 My Personal Diary</h1>

      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
        />
        <Textarea
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleSubmit}>{editId ? "Update" : "Add"}</Button>
      </div>

      <div className="grid gap-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="rounded-2xl shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{entry.title}</h2>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                    {entry.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {format(new Date(entry.timestamp), "PPpp")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(entry)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export { DiaryDashboard };